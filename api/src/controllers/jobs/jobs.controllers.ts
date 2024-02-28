import { asyncErrors } from "../../errors";
import { responseServerHandler, validate } from "../../utils/validation";
import Job from "../../models/shared/jobs.schemas";
import Employer from "../../models/employer/employers.schemas";
import Application from "../../models/shared/applications.schemas";
import Seeker from "../../models/seeker/seekers.schemas";

export const createJob = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      // @ts-ignore
      const { employerId } = request.user;
      const jobData = request.body;

      const allowedProperties = [
        "title",
        "location",
        "type",
        "skills",
        "description",
        "level",
        "salary",
        "expiration_date",
        "position",
        "overview",
      ];

      validate(allowedProperties, jobData, (error, message) => {
        if (error) {
          return responseServerHandler({ message: message }, 403, response);
        }
      });

      const newJob = await Job.create({ ...jobData, company: employerId });

      if (!newJob) {
        responseServerHandler(
          { message: "Cannot create job, please try again" },
          403,
          response
        );
        return;
      }

      await Employer.findByIdAndUpdate(employerId, {
        $push: { jobs: newJob._id },
      });

      const matchedSeekers = await Seeker.find({
        "alerts.type": newJob.type,
        "alerts.level": { $in: newJob.level },
        "alerts.title": { $regex: new RegExp(String(newJob.title), "i") },
      }).exec();

      matchedSeekers.forEach((seeker) => {
        seeker.notifications.push({
          title: "New Matching Job",
          message: `A new job has been posted matching your alert criteria. ${newJob.title} at ${newJob.location}, ${newJob._id}`,
        });

        seeker.save();
      });

      responseServerHandler({ job: newJob._id }, 201, response);
    } catch (error) {
      responseServerHandler(
        { message: "Cannot create job, please try again" },
        400,
        response
      );
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

    if (!job) {
      return responseServerHandler({ message: "Job not found" }, 404, response);
    }

    const allowedProperties = [
      "type",
      "description",
      "level",
      "salary",
      "expiration_date",
      "position",
      "overview",
      "title",
    ];

    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    if (employerId.toString() !== job.company.toString()) {
      return responseServerHandler(
        { message: "Unauthorized, employer is not owner of the job" },
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot edit job, please try again" },
      400,
      response
    );
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
      return responseServerHandler(
        { message: "Unauthorized, employer is not the owner of the job" },
        403,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot delete job, please try again" },
      400,
      response
    );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot save job, please try again" },
      400,
      response
    );
  }
});

export const generateJobAlert = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const allowedProperties = ["level", "type", "title"];
    const newAlert = request.body;

    validate(allowedProperties, newAlert, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    await Seeker.findByIdAndUpdate(seekerId, {
      alerts: { ...newAlert },
    });

    responseServerHandler(
      { message: "Job alert successfully created" },
      201,
      response
    );
  } catch (error) {
    responseServerHandler(
      { message: "Cannot generate job alert, please try again" },
      400,
      response
    );
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

    const totalJobs = await Job.find({}).lean().countDocuments({});

    const popularJobs = await Job.find({
      $expr: { $gt: [{ $size: "$applications" }, 30] },
    }).select("title");

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

    responseServerHandler(
      { jobs: jobs, totalJobs: totalJobs, popularJobs: popularJobs },
      200,
      response
    );
  } catch (error) {
    console.log(error);

    responseServerHandler(
      { message: "Cannot get jobs, please try again" },
      400,
      response
    );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot get job, please try again" },
      400,
      response
    );
  }
});
