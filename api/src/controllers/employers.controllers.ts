import { sendResponse, validate } from "../utils/validation";
import { uuidv7 } from "uuidv7";
import { asyncErrors } from "../errors/asyncErrors";
import { uploadFileToS3 } from "../utils/aws";
import { sendEmail } from "../utils/email";
import Employer from "../models/employers.schema";
import Review from "../models/reviews.schema";
import Seeker from "../models/seekers.schema";
import Job from "../models/jobs.schema";
import Application from "../models/applications.schema";
import mongoose from "mongoose";

// Sign up a new employer
export const signupEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const employerData = request.body;

      // Define the allowed properties for validation
      const allowedProperties = [
        "password",
        "email",
        "name",
        "number",
        "address",
        "size",
        "industry",
      ];

      // Validate the incoming request data
      validate(allowedProperties, employerData, (error, message) => {
        if (error) {
          return sendResponse({ message: message }, 403, response);
        }
      });

      // Check if an employer with the same email or name already exists
      const existingEmployerEmail = await Employer.findOne({
        email: request.body.email,
      });
      const existingEmployerName = await Employer.findOne({
        name: request.body.name,
      });

      if (existingEmployerEmail || existingEmployerName) {
        return sendResponse(
          {
            message:
              "An account with this email or company name already exists. Please try logging in or using a different email/name.",
          },
          400,
          response
        );
      }

      const verificationToken = uuidv7(); // Generate a unique token
      const newEmployer = await Employer.create({
        ...request.body,
        verificationToken,
      });

      if (!newEmployer) {
        return sendResponse(
          {
            message:
              "We couldn't create your account at this moment. Please try again later.",
          },
          500,
          response
        );
      }

      // Save the new employer
      await newEmployer.save();

      await sendEmail(
        newEmployer.email,
        "Jobernify - Verify your email",
        `Please verify your email by clicking on this link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&type=employer`
      );

      // Send response with the new employer ID
      sendResponse({ employer: newEmployer._id }, 201, response);
    } catch (error) {
      sendResponse(
        { message: "Cannot register profile, please try again" },
        400,
        response
      );
    }
  }
);

// Employer login functionality
export const loginEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const employerData = request.body;

      // Define the allowed properties for validation
      const allowedProperties = ["email", "password"];

      // Validate the incoming request data
      validate(allowedProperties, employerData, (error, message) => {
        if (error) {
          return sendResponse({ message: message }, 403, response);
        }
      });

      // Find the employer by credentials
      // @ts-ignore
      const existingEmployer = await Employer.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingEmployer) {
        return sendResponse(
          {
            message:
              "The email or password you entered is incorrect. Please try again.",
          },
          500,
          response
        );
      }

      if (!existingEmployer.emailVerified) {
        return sendResponse(
          { message: "Please verify your email before logging in." },
          403,
          response
        );
      }

      // Generate an authentication token for the employer
      const employerToken = await existingEmployer.generateAuthToken();

      if (!employerToken) {
        return sendResponse(
          {
            message:
              "We encountered an issue during login. Please try again later.",
          },
          500,
          response
        );
      }

      // Set the token as a cookie in the response
      const expiration_date = new Date(Date.now() + 3600000);

      response.cookie("token", employerToken, {
        httpOnly: true,
        expires: expiration_date,
      });

      // Send response with employer ID and token
      sendResponse(
        {
          employer: existingEmployer._id,
          token: employerToken,
        },
        200,
        response
      );
    } catch (error) {
      sendResponse(
        { message: "Cannot login now, please try again" },
        400,
        response
      );
    }
  }
);

// Follow or unfollow an employer
export const followEmployer = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user; // Get the seeker ID from the request user object
    const employerId = request.params.employerId; // Get the employer ID from the request parameters

    // Fetch employer and seeker details in parallel
    const [employer, seeker] = await Promise.all([
      Employer.findById(employerId),
      Seeker.findById(seekerId),
    ]);

    if (!employer || !seeker) {
      return sendResponse(
        {
          message:
            "We couldn't find the employer or your profile. Please try again later.",
        },
        404,
        response
      );
    }

    // Check if the seeker is already following the employer
    const isFollowing = employer.followers.includes(seekerId);

    if (isFollowing) {
      // Unfollow the employer if already followed
      await Employer.findByIdAndUpdate(employerId, {
        $pull: { followers: seekerId },
      });
      await Seeker.findByIdAndUpdate(seekerId, {
        $pull: { following: employerId },
      });
      sendResponse(
        { message: "Employer successfully unfollowed" },
        201,
        response
      );
    } else {
      // Follow the employer if not already following
      await Employer.findByIdAndUpdate(employerId, {
        $push: {
          followers: seekerId,
        },
      });
      await Seeker.findByIdAndUpdate(seekerId, {
        $push: { following: employerId },
      });
      sendResponse(
        { message: "Employer successfully followed" },
        201,
        response
      );
    }
  } catch (error) {
    sendResponse(
      {
        message: "Cannot follow or unfollow employer profile, please try again",
      },
      400,
      response
    );
  }
});

// Get the employer's profile with optional filtering
export const getEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get the employer ID from the request user object
    const { page = 1, limit = 10, type, search, srt } = request.query; // Get query parameters for pagination and filtering
    const skip = (Number(page) - 1) * Number(limit);
    const sort = srt === "desc" ? -1 : 1;

    let populateQuery: any = {};
    switch (type) {
      case "jobs":
        populateQuery = {
          path: "jobs",
          options: {
            skip,
            limit: Number(limit),
            sort: { _id: sort },
          },
          select:
            "title position _id location level type applications expiration_date salary",
        };
        break;
      case "reviews":
        populateQuery = {
          path: "reviews",
          options: {
            skip,
            limit: Number(limit),
            sort: { _id: sort },
          },
        };
        break;
      default:
        break;
    }

    // Construct search query if a search term is provided
    let searchQuery = {};
    if (search) {
      const searchFields: string[] = [];
      switch (type) {
        case "jobs":
          searchFields.push("title", "position", "location");
          break;
        case "reviews":
          searchFields.push("type");
          break;

        default:
          break;
      }

      const searchConditions = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
      searchQuery = { $or: searchConditions };
    }

    // Fetch the employer's profile with the appropriate population based on type
    let employer;
    if (type && populateQuery.path) {
      employer = await Employer.findById(employerId)
        .populate({
          ...populateQuery,
          match: searchQuery,
        })
        .exec();
    } else {
      employer = await Employer.findById(employerId).exec();
    }

    if (!employer) {
      return sendResponse({ message: "Cannot Find Employer" }, 404, response);
    }

    // Count the total number of jobs, reviews based on type and search query
    const counts: any = {};
    if (type === "jobs" || !type) {
      counts.totalJobs = await Job.countDocuments({
        company: employerId,
        ...searchQuery,
      });
    }
    if (type === "reviews" || !type) {
      counts.totalReviews = await Review.countDocuments({
        company: employerId,
        ...searchQuery,
      });
    }

    // Send the response with employer details and counts
    sendResponse(
      {
        employer: employer,
        counts: counts,
      },
      201,
      response
    );
  } catch (error) {
    sendResponse(
      {
        message:
          "We couldn't find the employer's profile. Please check the ID and try again.",
      },
      400,
      response
    );
  }
});

// Edit the employer's profile
export const editEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get the employer ID from the request user object
    const updateData = { ...request.body, image: request.file }; // Get the request body and file for image upload

    if (request.file) {
      // If there's an image file, upload it to S3 and update the image key
      const result = uuidv7();
      const imageKey = `employer_${result}.png`;
      const uploads = await uploadFileToS3(request.file, imageKey, "employers");
      await uploads.done();

      updateData.image = `employers/${imageKey}`;
    }

    // Update the employer's profile with the new data
    const editedProfile = await Employer.findByIdAndUpdate(
      employerId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editedProfile) {
      return sendResponse(
        {
          message:
            "We couldn't find the profile or update it. Please check the details and try again.",
        },
        404,
        response
      );
    }

    // Send the response with the updated employer profile
    sendResponse(
      { employer: editedProfile, message: "Successfully edited!" },
      201,
      response
    );
  } catch (error) {
    sendResponse(
      {
        message:
          "We encountered an issue updating your profile. Please try again later.",
      },
      400,
      response
    );
  }
});

// Delete an employer's profile and associated data
export const deleteEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user; // Get the employer ID from the request user object
    const employer = await Employer.findById(employerId); // Find the employer by ID
    const jobIds = (employer.jobs || []).map(
      (job: typeof Job | any) => job._id
    );

    if (!employer) {
      return sendResponse(
        {
          message:
            "We couldn't find the employer's profile. Please check the ID and try again.",
        },
        404,
        response
      );
    }

    // Delete associated jobs, reviews
    await Job.deleteMany({ company: employerId });
    await Review.deleteMany({ company: employerId });

    // Update seekers to remove references to the deleted employer and jobs
    await Seeker.updateMany(
      {
        $or: [{ following: employerId }, { savedJobs: { $in: jobIds } }],
      },
      {
        $pull: {
          following: employerId,
          savedJobs: { $in: jobIds },
        },
      }
    );

    // Delete the employer profile
    await Employer.findByIdAndDelete(employerId);

    // Send response confirming deletion
    sendResponse(
      {
        message:
          "Your profile and all associated data have been successfully deleted.",
      },
      200,
      response
    );
  } catch (error) {
    sendResponse(
      { message: "Cannot delete profile, please try again" },
      400,
      response
    );
  }
});

// Get employer details by ID with pagination and filtering
export const getEmployerById = asyncErrors(async (request, response) => {
  try {
    const { employerId } = request.params; // Get the employer ID from request parameters
    const { page = 1, limit = 10, type = "jobs" } = request.query; // Get query parameters for pagination and filtering

    const skip = (Number(page) - 1) * Number(limit);
    let populateQuery: any;

    // Define the population query based on the type
    switch (type) {
      case "jobs":
        populateQuery = {
          path: "jobs",
          options: { skip, limit: Number(limit) },
          select:
            "title position _id location level applications expiration_date createdAt overview",
          populate: {
            path: "company",
            select: "_id image name",
          },
        };
        break;
      case "reviews":
        populateQuery = {
          path: "reviews",
          options: { skip, limit: Number(limit) },
        };
        break;
      default:
        populateQuery = {};
    }

    // Fetch the employer details with the appropriate population based on type
    const employer = await Employer.findById(employerId)
      .populate(populateQuery)
      .select(
        "name reviews email address size website followers number company_description industry image jobs"
      )
      .exec();

    if (!employer) {
      return sendResponse(
        {
          message:
            "We couldn't find the employer with the specified ID. Please try again later.",
        },
        404,
        response
      );
    }

    // Count the total number of jobs, reviews for the employer
    const totalJobs = await Job.countDocuments({ company: employerId });
    const totalReviews = await Review.countDocuments({ company: employerId });

    // Send response with employer details and counts
    sendResponse(
      {
        employer: employer,
        totalJobs: totalJobs,
        totalReviews: totalReviews,
      },
      201,
      response
    );
  } catch (error) {
    sendResponse({ message: "Cannot get employer" }, 400, response);
  }
});

// Get a list of employers with pagination, search, and sorting
export const getEmployers = asyncErrors(async (request, response) => {
  try {
    const { page = 1, limit = 10, search, srt } = request.query; // Get query parameters for pagination, search, and sorting

    const conditions: any = {};

    // Define search conditions if a search term is provided
    if (search) {
      conditions.$or = [
        { name: { $regex: new RegExp(String(search), "i") } },
        { address: { $regex: new RegExp(String(search), "i") } },
        { company_description: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    const sortOptions: any = {};

    // Define sorting options based on the sort parameter
    if (srt) {
      if (srt === "followers" || srt === "reviews") {
        sortOptions[srt] = -1;
      }
    }

    // Fetch the list of employers with the defined conditions and sorting
    const employers = await Employer.find(conditions)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("image name company_description reviews followers size address")
      .exec();

    const totalEmployers = await Employer.countDocuments(conditions); // Count the total number of employers

    if (!employers) {
      return sendResponse(
        {
          message:
            "We couldn't find any employers matching your criteria. Please try again later.",
        },
        404,
        response
      );
    }

    // Send response with the list of employers and the total count
    sendResponse(
      { employers: employers, totalEmployers: totalEmployers },
      201,
      response
    );
  } catch (error) {
    sendResponse(
      {
        message:
          "We encountered an issue retrieving the list of employers. Please try again later.",
      },
      400,
      response
    );
  }
});

export const getJobById = asyncErrors(async (request, response) => {
  try {
    const job = await Job.findById(request.params.jobId).select(
      "title overview position location expiration_date level salary skills description type"
    );

    if (!job) {
      sendResponse({ message: "Cannot find job right now" }, 400, response);
    }

    sendResponse({ job: job }, 201, response);
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});

// Get employer analytics data
export const getEmployerAnalytics = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;

    // Get the start of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Count the total number of jobs, reviews, applications, and followers for the employer
    const totalJobs = await Job.countDocuments({ company: employerId });
    const totalReviews = await Review.countDocuments({ company: employerId });
    const totalApplications = await Application.countDocuments({
      job: { $in: await Job.find({ company: employerId }).distinct("_id") },
    });
    const totalFollowers = (
      await Employer.findById(employerId).select("followers")
    ).followers.length;

    // Count the new jobs, reviews, applications, and followers for the current month
    const jobsThisMonth = await Job.countDocuments({
      company: employerId,
      createdAt: { $gte: startOfMonth },
    });

    const reviewsThisMonth = await Review.countDocuments({
      company: employerId,
      createdAt: { $gte: startOfMonth },
    });

    const applicationsThisMonth = await Application.countDocuments({
      job: { $in: await Job.find({ company: employerId }).distinct("_id") },
      createdAt: { $gte: startOfMonth },
    });

    const employerWithFollowers = await Employer.findById(employerId)
      .select("followers")
      .populate("followers", "createdAt");

    const followersThisMonth = employerWithFollowers.followers.filter(
      (follower: any) => {
        const followerCreatedAt = follower.createdAt;
        return (
          followerCreatedAt >= startOfMonth && followerCreatedAt < new Date()
        );
      }
    ).length;

    const jobsPerMonth = await getJobsPerMonth(employerId);
    const followersOverTime = await getFollowersOverTime(employerId);
    const jobTypes = await getJobTypes(employerId);

    response.status(200).json({
      totalJobs,
      totalReviews,
      totalApplications,
      totalFollowers,
      jobsPerMonth,
      followersOverTime,
      jobTypes,
      jobsThisMonth,
      reviewsThisMonth,
      applicationsThisMonth,
      followersThisMonth,
    });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
});

// Helper function to get the number of jobs posted per month for the last 6 months
const getJobsPerMonth = async (employerId: string) => {
  const objectIdEmployerId = new mongoose.Types.ObjectId(employerId);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const jobs = await Job.aggregate([
    {
      $match: {
        company: objectIdEmployerId,
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Create an array representing the last 6 months with job counts
  const jobsPerMonth = Array.from({ length: 6 }, (_, index) => {
    const month = ((sixMonthsAgo.getMonth() + index) % 12) + 1;
    const job = jobs.find((job) => job._id === month);
    return job ? job.count : 0;
  });

  return jobsPerMonth;
};

// Helper function to get the number of followers gained over the last 6 months
const getFollowersOverTime = async (employerId: string) => {
  const objectIdEmployerId = new mongoose.Types.ObjectId(employerId);
  const employer =
    await Employer.findById(objectIdEmployerId).populate("followers");
  const followers = employer.followers;

  // Create an array representing the last 6 months with follower counts
  const followersOverTime = Array.from({ length: 6 }, (_, index) => {
    const month = new Date().getMonth() - index + 1;
    return followers.filter((follower: any) => {
      return new Date(follower.createdAt).getMonth() + 1 === month;
    }).length;
  }).reverse();

  return followersOverTime;
};

// Helper function to get the job types and their counts for the employer
const getJobTypes = async (employerId: string) => {
  const objectIdEmployerId = new mongoose.Types.ObjectId(employerId);

  const jobTypes = await Job.aggregate([
    { $match: { company: objectIdEmployerId } },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);

  return jobTypes.map((jobType) => ({
    label: jobType._id,
    value: jobType.count,
  }));
};

export const verifyEmail = asyncErrors(async (request, response) => {
  try {
    const { token } = request.query;
    const employer = await Employer.findOne({ verificationToken: token });

    if (!employer) {
      return sendResponse(
        { message: "Invalid or expired verification token." },
        400,
        response
      );
    }

    employer.emailVerified = true;
    employer.verificationToken = undefined;
    await employer.save();

    sendResponse({ message: "Email successfully verified." }, 200, response);
  } catch (errors) {
    sendResponse(
      { message: "Error verifying email, please try again" },
      400,
      response
    );
  }
});
