import { asyncErrors } from "../errors/asyncErrors";
import Seeker from "../models/seekers.schema";
import Application from "../models/applications.schema";
import Job from "../models/jobs.schema";
import { initializeChatbots } from "../server";
import { uploadFileToS3 } from "../utils/aws";
import { sendResponse } from "../utils/validation";
import { sendEmail } from "../utils/email";

// Apply to a Job
export const applyToJob = asyncErrors(async (request, response) => {
  try {
    // Extracting necessary data
    // @ts-ignore
    const { seekerId } = request.user;
    const { jobId } = request.params;
    const resumeFile = request.file;

    // Validate file upload
    if (!resumeFile) {
      return sendResponse(
        { message: "Invalid resume file. Please upload a valid PDF document." },
        403,
        response
      );
    }

    // Check if the seeker has already applied for this job
    const existingApplication = await Application.findOne({
      seeker: seekerId,
      job: jobId,
    });

    if (existingApplication) {
      return sendResponse(
        {
          message:
            "You have already submitted an application for this position. Please check your application status.",
        },
        403,
        response
      );
    }

    // Upload the resume to S3
    const resumeKey = `resume_${seekerId}.pdf`;
    const uploads = await uploadFileToS3(resumeFile, resumeKey, "documents");
    await uploads.done();

    // Create a new application
    const application = await Application.create({
      job: jobId,
      seeker: seekerId,
      status: "Pending",
      cover_letter: request.body.coverLetter || "",
      resume: `documents/${resumeKey}`,
    });

    // Update job and seeker with the new application reference
    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: application._id },
    });

    await Seeker.findByIdAndUpdate(seekerId, {
      $push: { applications: application._id },
    });

    // Send success response
    sendResponse(
      {
        message: "Your application has been successfully submitted! Good luck!",
      },
      201,
      response
    );
  } catch (error) {
    // Send error response
    sendResponse(
      { message: "Application submission failed. Please try again later." },
      400,
      response
    );
  }
});

// Generate Cover Letter
export const generateCoverLetter = asyncErrors(async (request, response) => {
  try {
    // Extracting necessary data
    // @ts-ignore
    const { seekerId } = request.user;
    const { jobId } = request.params;

    // Fetch job and seeker details
    const job = await Job.findById(jobId).populate("company").select("name");
    const seeker = await Seeker.findById(seekerId);

    // Initialize chatbot for generating cover letter
    const openai = initializeChatbots();

    // Generate cover letter using GPT-3.5
    const responseChat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a cover letter for the job ${job.title} at ${job.company.name}, where the applicant is ${seeker.first_name}`,
        },
      ],
    });

    // Send generated cover letter
    sendResponse(
      { cover_letter: responseChat.choices[0].message.content },
      201,
      response
    );
  } catch (error) {
    // Send error response
    sendResponse(
      {
        message:
          "Failed to generate cover letter. Please try again later or contact support.",
      },
      400,
      response
    );
  }
});

// Update Application Status
export const updateApplicationStatus = asyncErrors(
  async (request, response) => {
    try {
      const { applicationId } = request.params;
      const { status } = request.body;

      // Validate status input
      if (!status) {
        return sendResponse(
          {
            message:
              "Invalid status provided. Please select a valid application status.",
          },
          500,
          response
        );
      }

      // Check if the application exists
      const existingApplication = await Application.findById(applicationId)
        .populate("seeker", "email")
        .populate({
          path: "job",
          select: "company",
          populate: {
            path: "company",
            select: "name",
          },
        });

      if (!existingApplication) {
        return sendResponse(
          {
            message:
              "The specified application does not exist. Please check the application ID and try again.",
          },
          404,
          response
        );
      }

      // Update the application's status
      const updatedApplication = await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true, runValidators: true }
      );

      // Generate email content
      const emailContent = generateApplicationEmailContent(
        status,
        existingApplication.job.company.name
      );

      // Send email with the updated status
      await sendEmail(
        existingApplication.seeker.email,
        "Application Status Update",
        emailContent
      );

      // Send success response with updated application
      sendResponse({ application: updatedApplication }, 201, response);
    } catch (error) {
      // Send error response
      sendResponse(
        {
          message:
            "Failed to update the application status. Please try again later.",
        },
        400,
        response
      );
    }
  }
);

// Get Applications for a Job
export const getApplicationsForJob = asyncErrors(async (request, response) => {
  try {
    const { page = 1, limit = 10, type } = request.query;
    const { jobId } = request.params;

    // Fetch the job details
    const job = await Job.findById(jobId);
    const conditions: any = { job: jobId };

    // Filter applications by status if provided
    if (type) {
      conditions.status = type;
    }

    // Fetch applications based on conditions
    const applications = await Application.find(conditions)
      .populate({
        path: "job",
        select: "_id title type",
      })
      .populate({
        path: "seeker",
        select:
          "first_name last_name _id email linkedin github portfolio image",
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();

    // Calculate application statistics
    const totalApplications = await Application.countDocuments({ job: jobId });
    const totalPending = await Application.countDocuments({
      job: jobId,
      status: "Pending",
    });
    const totalInterview = await Application.countDocuments({
      job: jobId,
      status: "Interview",
    });
    const totalRejected = await Application.countDocuments({
      job: jobId,
      status: "Rejected",
    });
    const totalAccepted = await Application.countDocuments({
      job: jobId,
      status: "Accepted",
    });

    // Send response with applications and stats
    sendResponse(
      {
        job,
        applications,
        totalApplications,
        totalPendingStatus: totalPending,
        totalInterviewStatus: totalInterview,
        totalRejectedStatus: totalRejected,
        totalAcceptedStatus: totalAccepted,
      },
      200,
      response
    );
  } catch (error) {
    // Send error response
    sendResponse(
      {
        message:
          "Unable to retrieve applications at this time. Please try again later.",
      },
      400,
      response
    );
  }
});

// Helper function to generate email content
const generateApplicationEmailContent = (
  status: string,
  companyName: string
) => {
  let content = "";
  switch (status) {
    case "Rejected":
      content = `We regret to inform you that your application for the position at ${companyName} has been rejected. Thank you for considering us.`;
      break;
    case "Pending":
      content = `Your application for the position at ${companyName} is currently under review. We will get back to you shortly.`;
      break;
    case "Accepted":
      content = `Congratulations! Your application for the position at ${companyName} has been accepted. We look forward to having you on board.`;
      break;
    case "Interview":
      content = `We are pleased to inform you that you have been selected for an interview for the position at ${companyName}. Further details will be shared shortly.`;
      break;
    default:
      content = `Your application status has been updated to ${status}.`;
  }

  return `<html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; }
        .header { background-color: #f0f0f0; padding: 20px; text-align: center; }
        .header h2 { margin: 0; color: #333; }
        .content { padding: 20px; }
        .content p { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Application Update</h2>
        </div>
        <div class="content">
          <p>${content}</p>
        </div>
      </div>
    </body>
  </html>`;
};
