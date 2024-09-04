import { asyncErrors } from "../errors/asyncErrors";
import Employer from "../models/employer/employers.schema";
import Seeker from "../models/seeker/seekers.schema";
import Application from "../models/shared/applications.schema";
import Job from "../models/shared/jobs.schema";
import Notification from "../models/shared/notifications.schema";
import { io } from "../server";
import { sendResponse, validate } from "../utils/validation";

// Controller function to create a new job posting
export const createJob = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      // @ts-ignore
      const { employerId } = request.user; // Get employer ID from the authenticated user
      const jobData = request.body; // Get job data from the request body
      const employer = await Employer.findById(employerId); // Find the employer by ID

      // Define allowed properties for validation
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

      // Validate the incoming job data
      validate(allowedProperties, jobData, (error, message) => {
        if (error) {
          return sendResponse({ message: message }, 403, response);
        }
      });

      // Create the new job in the database
      const newJob = await Job.create({ ...jobData, company: employerId });

      if (!newJob) {
        sendResponse(
          {
            message:
              "We encountered an issue while creating the job posting. Please try again later.",
          },
          403,
          response
        );
        return;
      }

      // Add the new job to the employer's list of jobs
      await Employer.findByIdAndUpdate(employerId, {
        $push: { jobs: newJob._id },
      });

      // Find seekers whose alerts match the new job's criteria
      const matchedSeekers = await Seeker.find({
        "alerts.type": newJob.type,
        "alerts.level": { $in: newJob.level },
        "alerts.title": { $regex: new RegExp(String(newJob.title), "i") },
      }).exec();

      // Create a notification for matched seekers
      const createdNotifications = await Notification.create({
        user: "seeker",
        data: {
          employerImage: employer.image,
          jobLocation: newJob.location,
          idOfJob: newJob._id,
        },
        title: "New Matching Job",
        message: `A new job has been posted matching your alert criteria.`,
        type: "jobs",
      });

      // Push the notification to all matched seekers
      matchedSeekers.forEach((seeker) => {
        seeker.notifications.push(createdNotifications._id);
        seeker.save();
      });

      // Emit the notification via socket to all connected clients
      io.emit("notification", createdNotifications);

      // Send the response with the created job ID
      sendResponse({ job: newJob._id }, 201, response);
    } catch (error) {
      sendResponse(
        { message: "Cannot create job, please try again" },
        400,
        response
      );
    }
  }
);

// Controller function to edit an existing job posting
export const editJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get employer ID from the authenticated user
    const updateData = request.body; // Get updated job data from the request body
    const jobId = request.params.jobId; // Get job ID from the request parameters
    const job = await Job.findById(jobId); // Find the job by ID

    if (!job) {
      return sendResponse(
        {
          message:
            "The job posting you are trying to edit could not be found. Please check the job ID and try again.",
        },
        404,
        response
      );
    }

    // Define allowed properties for validation
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

    // Validate the incoming update data
    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Check if the employer is the owner of the job
    if (employerId.toString() !== job.company.toString()) {
      return sendResponse(
        {
          message:
            "You are not authorized to edit this job posting. Please ensure you are the job owner.",
        },
        403,
        response
      );
    }

    // Update the job in the database
    const editedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!editedJob) {
      return sendResponse(
        { message: "Job not found or could not be updated" },
        404,
        response
      );
    }

    // Send the response with the updated job details
    sendResponse({ job: editedJob }, 201, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot edit job, please try again" },
      400,
      response
    );
  }
});

// Controller function to delete a job posting
export const deleteJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get employer ID from the authenticated user
    const jobId = request.params.jobId; // Get job ID from the request parameters

    const job = await Job.findById(jobId); // Find the job by ID

    if (!job) {
      return sendResponse(
        {
          message:
            "The job posting you are trying to delete could not be found. Please check the job ID and try again.",
        },
        404,
        response
      );
    }

    // Check if the employer is the owner of the job
    if (employerId.toString() !== job.company.toString()) {
      return sendResponse(
        {
          message:
            "You are not authorized to delete this job posting. Please ensure you are the job owner.",
        },
        403,
        response
      );
    }

    // Find all applications related to the job
    const applications = await Application.find({ job: jobId });

    // Delete the job from the database
    await Job.findByIdAndDelete(jobId);

    // Delete all related applications
    await Application.deleteMany({ job: jobId });

    // Update seekers to remove references to the deleted job and applications
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

    // Remove the job from the employer's list of jobs
    await Employer.findByIdAndUpdate(employerId, {
      $pull: { jobs: jobId },
    });

    // Send the response confirming deletion
    sendResponse({ message: "Job Deleted Successfully" }, 200, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot delete job, please try again" },
      400,
      response
    );
  }
});

// Controller function to save or unsave a job for a seeker
export const saveJob = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user; // Get seeker ID from the authenticated user
    const jobId = request.params.jobId; // Get job ID from the request parameters

    const job = await Job.findById(jobId); // Find the job by ID
    const seeker = await Seeker.findById(seekerId); // Find the seeker by ID

    if (!job) {
      return sendResponse(
        {
          message:
            "The job posting you are trying to save/unsave could not be found. Please check the job ID and try again.",
        },
        404,
        response
      );
    }

    // Check if the job is already saved by the seeker
    if (seeker.savedJobs.includes(jobId)) {
      // Unsave the job if it is already saved
      await Seeker.findByIdAndUpdate(seekerId, {
        $pull: { savedJobs: jobId },
      });
      sendResponse(
        {
          message:
            "The job has been successfully removed from your saved list.",
        },
        201,
        response
      );
    } else {
      // Save the job if it is not already saved
      await Seeker.findByIdAndUpdate(seekerId, {
        $push: { savedJobs: jobId },
      });
      sendResponse(
        { message: "The job has been successfully added to your saved list." },
        201,
        response
      );
    }
  } catch (error) {
    sendResponse(
      {
        message:
          "We encountered an issue while saving/unsaving the job. Please try again later.",
      },
      400,
      response
    );
  }
});

// Controller function to generate a job alert for a seeker
export const generateJobAlert = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user; // Get seeker ID from the authenticated user
    const allowedProperties = ["level", "type", "title"]; // Define allowed properties for validation
    const newAlert = request.body; // Get new alert data from the request body

    // Validate the incoming alert data
    validate(allowedProperties, newAlert, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Update the seeker with the new alert
    await Seeker.findByIdAndUpdate(seekerId, {
      alerts: { ...newAlert },
    });

    // Send the response confirming the creation of the job alert
    sendResponse(
      { message: "Your job alert has been successfully created." },
      201,
      response
    );
  } catch (error) {
    console.log(error);

    sendResponse(
      { message: "Cannot generate job alert, please try again" },
      400,
      response
    );
  }
});

// Controller function to get a list of jobs with filtering, sorting, and pagination
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
    } = request.query; // Get query parameters for pagination, filtering, and sorting

    const conditions: any = {};

    // Get popular jobs based on application count
    const popularJobs = await Job.find({
      $expr: { $gt: [{ $size: "$applications" }, 30] },
    }).select("title");

    // Add search conditions if search terms are provided
    if (search) {
      conditions.$or = [
        { title: { $regex: new RegExp(String(search), "i") } },
        { description: { $regex: new RegExp(String(search), "i") } },
        { location: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    // Filter by job type if provided
    if (type) {
      conditions.type = Array.isArray(type)
        ? { $in: type }
        : type.toString().split(",");
    }

    // Filter by seniority level if provided
    if (seniority) {
      conditions.level = Array.isArray(seniority)
        ? { $in: seniority }
        : seniority.toString().split(",");
    }

    // Filter by salary range if provided
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

    // Filter by position if provided
    if (position) {
      conditions.position = Array.isArray(position)
        ? { $in: position }
        : position.toString().split(",");
    }

    // Define sorting options based on the sorting parameter
    const sortOptions: any = { createdAt: srt === "desc" ? -1 : 1 };

    // Fetch the list of jobs with the defined conditions and sorting
    const jobs = await Job.find(conditions)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate({ path: "company", select: "image name _id" })
      .select(
        "_id title overview company applications location expiration_date level createdAt"
      )
      .exec();

    // Count the total number of jobs matching the conditions
    const totalJobs = await Job.countDocuments(conditions);

    // Send the response with the list of jobs, total count, and popular jobs
    sendResponse(
      { jobs: jobs, totalJobs: totalJobs, popularJobs: popularJobs },
      200,
      response
    );
  } catch (error) {
    console.log(error);

    sendResponse(
      { message: "Cannot get jobs, please try again" },
      400,
      response
    );
  }
});

// Controller function to get job details by ID and similar jobs
export const getJobById = asyncErrors(async (request, response) => {
  try {
    const job = await Job.findById(request.params.jobId)
      .populate({
        path: "company",
        select:
          "name company_description followers reviews size image industry",
      })
      .select(
        "_id title overview company position applications location expiration_date level createdAt salary skills description type"
      );

    if (!job) {
      return sendResponse({ message: "Job not found" }, 404, response);
    }

    // Find similar jobs by title
    const jobs = await Job.find({
      title: job.title,
    })
      .select(
        "_id title overview company position applications location expiration_date level createdAt"
      )
      .populate({
        path: "company",
        model: Employer,
        select:
          "name company_description followers reviews size image industry",
      })
      .exec();

    // Filter out the current job from the list of similar jobs
    const filteredJobsData = jobs.filter(
      (job) => job._id.toString() !== request.params.jobId
    );

    // Send the response with the job details and similar jobs
    sendResponse({ job: job, jobs: filteredJobsData }, 201, response);
  } catch (error) {
    sendResponse(
      { message: "Cannot get job, please try again" },
      400,
      response
    );
  }
});
