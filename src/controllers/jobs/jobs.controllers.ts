import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Job from "../../models/shared/jobs.schemas";
import Employer from "../../models/employer/employers.schemas";
import Application from "../../models/shared/applications.schemas";
import Seeker from "../../models/seeker/seekers.schemas";

export const createJob = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      // @ts-ignore
      const { employerId } = request.user;

      if (!employerId) {
        responseServerHandler(
          { message: "Unauthorized - Company information missing" },
          403,
          response
        );
        return;
      }

      if (request.body.company || !request.body.skills) {
        responseServerHandler(
          { message: "Cannot create job, please try again" },
          403,
          response
        );
      }

      const newJob = await Job.create({ ...request.body, company: employerId });

      if (!newJob) {
        responseServerHandler(
          { message: "Cannot create job, please try again" },
          403,
          response
        );
      }

      const employer = await Employer.findByIdAndUpdate(employerId, {
        $push: { jobs: newJob._id },
      });

      if (!employer) {
        responseServerHandler(
          { message: "Cannot create job, please try again" },
          403,
          response
        );
      }

      responseServerHandler({ job: newJob._id }, 201, response);
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);

export const editJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const updateData = request.body;
    const jobId = request.params.jobId;

    const job = await Job.findById(jobId);

    if (employerId.toString() !== job.company.toString()) {
      responseServerHandler(
        { message: "Unauthorized, employer is not owner of the job" },
        403,
        response
      );
    }

    // Validate update data
    if (updateData.company || Object.keys(updateData).length === 0) {
      responseServerHandler(
        { message: "Data is not valid and job can't be edited" },
        403,
        response
      );
    }

    const editedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!editedJob) {
      return responseServerHandler(
        { message: "Job not found or could not be updated" },
        404,
        response
      );
    }

    responseServerHandler({ job: editedJob }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const deleteJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const jobId = request.params.jobId;

    const job = await Job.findById(jobId);

    if (!job) {
      return responseServerHandler({ message: "Job not found" }, 404, response);
    }

    if (employerId.toString() !== job.company.toString()) {
      responseServerHandler(
        { message: "Unauthorized, employer is not the owner of the job" },
        403,
        response
      );
      return;
    }

    const applications = await Application.find({ job: jobId });

    await Job.findByIdAndDelete(jobId);

    await Application.deleteMany({ job: jobId });

    await Seeker.updateMany(
      {
        $or: [
          { applications: { $in: applications.map((app) => app._id) } },
          { savedJobs: jobId },
        ],
      },
      {
        $pullAll: {
          applications: applications.map((app) => app._id),
          savedJobs: [jobId],
        },
      }
    );

    await Employer.findByIdAndUpdate(employerId, {
      $pull: { jobs: jobId },
    });

    responseServerHandler(
      { message: "Job Deleted Successfully" },
      200,
      response
    );
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

// export const getJobs = asyncErrors(async(request, response) => {
//   try {
//   } catch (error: any) {
//     responseServerHandler({ message: error.message }, 400, response);
//   }
// });
