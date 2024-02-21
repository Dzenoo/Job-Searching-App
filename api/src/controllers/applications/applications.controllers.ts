import { asyncErrors } from "../../errors";
import { initializeChatbots } from "../../server";
import { initializeAws } from "../../utils/aws";
import { responseServerHandler } from "../../utils/validation";
import Seeker from "../../models/seeker/seekers.schemas";
import Application from "../../models/shared/applications.schemas";
import Job from "../../models/shared/jobs.schemas";

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

    const resumeKey = `user_${seekerId}.pdf`;
    const uploads = await initializeAws(resumeFile, resumeKey, "documents");
    await uploads.done();

    const application = await Application.create({
      job: jobId,
      seeker: seekerId,
      status: "Pending",
      cover_letter: request.body.coverLetter || "",
      resume: `documents/${resumeKey}`,
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot apply to job, please try again" },
      400,
      response
    );
  }
});

export const generateCoverLetter = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const { jobId } = request.params;

    const job = await Job.findById(jobId).populate("company").select("name");
    const seeker = await Seeker.findById(seekerId);
    const openai = initializeChatbots();

    const response_chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a cover letter for the job ${job.title} at ${job.company.name}, where applicant for job is user with name ${seeker.first_name}`,
        },
      ],
    });

    responseServerHandler(
      { cover_letter: response_chat.choices[0].message.content },
      201,
      response
    );
  } catch (error) {
    responseServerHandler(
      { message: "Cannot generate cover letter, please try again" },
      400,
      response
    );
  }
});

export const updateApplicationStatus = asyncErrors(
  async (request, response) => {
    try {
      const { applicationId } = request.params;
      const { status } = request.body;
      const existingApplication = await Application.findById(applicationId);

      if (!status) {
        return responseServerHandler(
          { message: "Please enter valid status" },
          500,
          response
        );
      }

      if (!existingApplication) {
        return responseServerHandler(
          { message: "Application not found" },
          404,
          response
        );
      }

      const application = await Application.findByIdAndUpdate(
        applicationId,
        {
          status: status,
        },
        { new: true, runValidators: true }
      );

      responseServerHandler({ application }, 201, response);
    } catch (error) {
      responseServerHandler(
        { message: "Cannot update application, please try again" },
        400,
        response
      );
    }
  }
);

export const getApplicationsForJob = asyncErrors(async (request, response) => {
  try {
    const { page = 1, limit = 10, type } = request.query;

    const conditions: any = { job: request.params.jobId };

    if (type) {
      conditions.status = type;
    }

    const applications = await Application.find(conditions)
      .populate({
        path: "seeker",
        select:
          "first_name last_name _id email email linkedin github portfolio image",
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    if (!applications) {
      return responseServerHandler(
        { message: "Cannot found applications" },
        404,
        response
      );
    }

    responseServerHandler({ applications: applications }, 201, response);
  } catch (error) {
    responseServerHandler(
      { message: "Cannot get applications, please try again" },
      400,
      response
    );
  }
});
