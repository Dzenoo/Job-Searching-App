import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Job from "../../models/shared/jobs.schemas";
import Employer from "../../models/employer/employers.schemas";
import Application from "../../models/shared/applications.schemas";
import Seeker from "../../models/seeker/seekers.schemas";
import { initializeAws } from "../../utils/aws";

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

export const getJobs = asyncErrors(async (request, response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      type,
      seniority,
      salaryRange,
      position,
      srt,
    } = request.query;

    const conditions: any = {};

    if (search) {
      conditions.$or = [
        { title: { $regex: new RegExp(String(search), "i") } },
        { description: { $regex: new RegExp(String(search), "i") } },
        { location: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    if (type) {
      conditions.type = Array.isArray(type)
        ? { $in: type }
        : type.toString().split(",");
    }

    if (seniority) {
      conditions.level = Array.isArray(seniority)
        ? { $in: seniority }
        : seniority.toString().split(",");
    }

    if (salaryRange) {
      const salaryRanges = Array.isArray(salaryRange)
        ? salaryRange
        : salaryRange.toString().split(",");

      const salaryConditions = salaryRanges.map((range) => {
        const [minSalary, maxSalary] = range.toString().split("-");
        return {
          salary: { $gte: Number(minSalary), $lte: Number(maxSalary) },
        };
      });

      conditions.$or = salaryConditions;
    }

    if (position) {
      conditions.position = Array.isArray(position)
        ? { $in: position }
        : position.toString().split(",");
    }

    const sortOptions: any = { createdAt: srt === "desc" ? -1 : 1 };

    const jobs = await Job.find(conditions)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    responseServerHandler({ jobs: jobs }, 200, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const getJobById = asyncErrors(async (request, response) => {
  try {
    const job = await Job.findById(request.params.jobId).populate({
      path: "company",
      select: "name company_description followers reviews size image",
    });

    if (!job) {
      return responseServerHandler({ message: "Job not found" }, 404, response);
    }

    responseServerHandler({ job: job }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const applyToJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const jobId = request.params.jobId;
    const resumeFile = request.file;

    if (!resumeFile) {
      return responseServerHandler(
        { message: "Resume is not valid" },
        403,
        response
      );
    }

    const existingApplication = await Application.findOne({
      seeker: seekerId,
      job: jobId,
    });

    if (existingApplication) {
      return responseServerHandler(
        { message: "You already applied to this job" },
        403,
        response
      );
    }

    const resumeKey = `user_${seekerId}_${Date.now()}.pdf`;
    const uploads = await initializeAws(resumeFile, resumeKey);
    await uploads.done();

    const application = await Application.create({
      job: jobId,
      seeker: seekerId,
      status: "Pending",
      cover_letter: request.body.coverLetter || "",
      resume: resumeKey,
    });

    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: application._id },
    });

    await Seeker.findByIdAndUpdate(seekerId, {
      $push: { applications: application._id },
    });

    responseServerHandler(
      { job: "Successfully Applied Job", application },
      201,
      response
    );
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const generateJobAlert = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;

    if (!request.body.level || !request.body.type || !request.body.title) {
      return responseServerHandler(
        { message: "Cannot create job alert, please try again" },
        500,
        response
      );
    }

    await Seeker.findByIdAndUpdate(seekerId, {
      alerts: { ...request.body },
    });

    responseServerHandler(
      { message: "Job alert successfully created" },
      201,
      response
    );
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const saveJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const jobId = request.params.jobId;

    const job = await Job.findById(jobId);
    const seeker = await Seeker.findById(seekerId);

    if (!job) {
      return responseServerHandler({ message: "Job not found" }, 404, response);
    }

    if (seeker.savedJobs.includes(jobId)) {
      await Seeker.findByIdAndUpdate(seekerId, {
        $pull: { savedJobs: jobId },
      });
      responseServerHandler(
        { message: "Job successfully unsaved" },
        201,
        response
      );
    } else {
      await Seeker.findByIdAndUpdate(seekerId, {
        $push: { savedJobs: jobId },
      });
      responseServerHandler(
        { message: "Job successfully saved" },
        201,
        response
      );
    }
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});