import { uuidv7 } from "uuidv7";
import { asyncErrors } from "../errors/asyncErrors";
import Seeker from "../models/seekers.schema";
import Job from "../models/jobs.schema";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/aws";
import { sendResponse, validate } from "../utils/validation";
import Application from "../models/applications.schema";
import Review from "../models/reviews.schema";
import Employer from "../models/employers.schema";
import { sendEmail } from "../utils/email"; // Assume you have an email utility

// Controller function to sign up a new seeker
export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const allowedProperties = [
        "first_name",
        "last_name",
        "email",
        "password",
      ];
      const seekerData = request.body;

      // Validate the input data
      validate(allowedProperties, seekerData, (error, message) => {
        if (error) {
          return sendResponse({ message: message }, 403, response);
        }
      });

      // Check if a seeker with the provided email already exists
      const existingSeeker = await Seeker.findOne({
        email: request.body.email,
      });

      if (existingSeeker) {
        if (!existingSeeker.emailVerified) {
          return sendResponse(
            {
              message:
                "An account with this email already exists but is not verified. Please check your email for the verification link or request a new one.",
            },
            400,
            response
          );
        }
        return sendResponse(
          {
            message:
              "An account with this email already exists. Please try logging in or use a different email address.",
          },
          400,
          response
        );
      }

      const verificationToken = uuidv7(); // Generate a unique token
      const newSeeker = await Seeker.create({
        ...request.body,
        verificationToken,
      });

      if (!newSeeker) {
        return sendResponse(
          { message: "Cannot register account, please try again" },
          500,
          response
        );
      }

      // await newSeeker.save();

      await sendEmail(
        newSeeker.email,
        "Jobernify - Verify your email",
        `Please verify your email by clicking on this link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&type=seeker`
      );

      sendResponse(
        { seeker: newSeeker._id, seekerToken: newSeeker.generateAuthToken },
        201,
        response
      );
    } catch (error) {
      sendResponse(
        { message: "Cannot register profile, please try again" },
        400,
        response
      );
    }
  }
);

// Controller function for seeker login
export const loginSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const allowedProperties = ["email", "password"];
      const seekerData = request.body;

      // Validate the input data
      validate(allowedProperties, seekerData, (error, message) => {
        if (error) {
          return sendResponse({ message: message }, 403, response);
        }
      });

      // @ts-ignore
      const existingSeeker = await Seeker.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingSeeker) {
        return sendResponse(
          {
            message:
              "The email or password you entered is incorrect. Please try again.",
          },
          500,
          response
        );
      }

      if (!existingSeeker.emailVerified) {
        return sendResponse(
          { message: "Please verify your email before logging in." },
          403,
          response
        );
      }

      const seekerToken = await existingSeeker.generateAuthToken();

      if (!seekerToken) {
        return sendResponse(
          {
            message:
              "We encountered an issue while logging in. Please try again later.",
          },
          500,
          response
        );
      }

      // Set the token as a cookie in the response
      const expiration_date = new Date(Date.now() + 3600000);

      response.cookie("token", seekerToken, {
        httpOnly: true,
        expires: expiration_date,
      });

      sendResponse(
        { seeker: existingSeeker._id, token: seekerToken },
        200,
        response
      );
    } catch (errors) {
      sendResponse({ message: "Error during login" }, 400, response);
    }
  }
);

// Controller function to get the profile of the logged-in seeker
export const getSeekerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const { page = 1, limit = 10 } = request.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Find the seeker's profile and populate related fields
    const seeker = await Seeker.findById(seekerId)
      .populate({
        path: "savedJobs",
        options: { skip, limit: Number(limit) },
        select:
          "_id title location level expiration_date createdAt applications overview",
        populate: {
          path: "company",
          select: "_id image name",
        },
      })
      .populate({
        path: "applications",
        populate: {
          path: "job",
          model: Job,
          select: "_id title type level position",
          populate: {
            path: "company",
            select: "_id image name size address industry",
          },
        },
        select: "_id status createdAt updatedAt",
      })
      .select(
        "_id first_name last_name email biography image education skills alerts github linkedin portfolio following headline"
      )
      .exec();

    if (!seeker) {
      return sendResponse(
        {
          message:
            "We could not find your profile. Please check your details and try again.",
        },
        201,
        response
      );
    }

    sendResponse({ seeker: seeker }, 201, response);
  } catch (errors) {
    sendResponse(
      { message: "Cannot get profile, please try again" },
      400,
      response
    );
  }
});

// Controller function to edit the profile of the logged-in seeker
export const editSeekerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const updateData = { ...request.body, image: request.file };

    const allowedProperties = [
      "first_name",
      "last_name",
      "github",
      "linkedin",
      "portfolio",
      "skills",
      "image",
      "biography",
      "headline",
    ];

    // Validate the input data
    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    if (request.file) {
      const currentSeeker = await Seeker.findById(seekerId);

      // If the seeker already has an image, delete it from AWS
      if (currentSeeker.image.includes("seekers")) {
        await deleteFileFromS3(currentSeeker.image.split("/")[1], "seekers");
      }

      const result = uuidv7();
      const imageKey = `seeker_${result}.png`;
      const uploads = await uploadFileToS3(request.file, imageKey, "seekers");
      await uploads.done();

      updateData.image = `seekers/${imageKey}`;
    }

    const editedProfile = await Seeker.findByIdAndUpdate(seekerId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!editedProfile) {
      return sendResponse(
        {
          message:
            "We could not find your profile or update it. Please try again later.",
        },
        404,
        response
      );
    }

    sendResponse({ message: "Successfully edited profile" }, 201, response);
  } catch (errors) {
    sendResponse(
      { message: "Cannot edit profile, please try again" },
      400,
      response
    );
  }
});

// Controller function to delete the profile of the logged-in seeker
export const deleteSeekerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return sendResponse(
        {
          message:
            "We could not find your profile or delete it. Please try again later.",
        },
        404,
        response
      );
    }

    const applications = await Application.find({ seeker: seekerId });
    const reviews = await Review.find({ seeker: seekerId });

    // Delete related data for the seeker
    await Application.deleteMany({ seeker: seekerId });
    await Review.deleteMany({ seeker: seekerId });
    await Job.updateMany(
      { applications: { $in: applications.map((app) => app._id) } },
      {
        $pull: {
          applications: { $in: applications.map((app) => app._id) },
        },
      }
    );
    await Employer.updateMany(
      {
        $or: [
          { followers: seekerId },
          { reviews: { $in: reviews.map((review) => review._id) } },
        ],
      },
      {
        $pull: {
          followers: seekerId,
          reviews: { $in: reviews.map((review) => review._id) },
        },
      }
    );

    if (seeker.image.includes("seekers")) {
      await deleteFileFromS3(seeker.image.split("/")[1], "seekers");
    }

    await Seeker.findByIdAndDelete(seekerId);

    sendResponse(
      {
        message:
          "Your profile and all associated data have been successfully deleted.",
      },
      200,
      response
    );
  } catch (errors) {
    sendResponse(
      { message: "Cannot delete profile, please try again" },
      400,
      response
    );
  }
});

// Controller function to get a list of seekers with filtering and pagination
export const getSeekers = asyncErrors(async (request, response) => {
  try {
    const { page = 1, limit = 12, search, skills } = request.query;

    const conditions: any = {
      emailVerified: true,
    };

    // Add search conditions if search terms are provided
    if (search) {
      conditions.$or = [
        { first_name: { $regex: new RegExp(String(search), "i") } },
        { email: { $regex: new RegExp(String(search), "i") } },
        { headline: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    // Filter seekers by skills if provided
    if (skills) {
      const filteredSkills =
        typeof skills === "string" ? skills.split(",") : skills;
      conditions.skills = { $in: filteredSkills };
    }

    const seekers = await Seeker.find(conditions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select(
        "_id first_name last_name email skills github linkedin portfolio image headline"
      )
      .exec();

    const totalSeekers = await Seeker.countDocuments(conditions);

    if (!seekers) {
      return sendResponse(
        {
          message:
            "We could not find any seekers matching your criteria. Please try again later.",
        },
        404,
        response
      );
    }

    sendResponse(
      { seekers: seekers, totalSeekers: totalSeekers },
      200,
      response
    );
  } catch (errors) {
    sendResponse(
      { message: "Cannot get seekers, please try again" },
      400,
      response
    );
  }
});

// Controller function to get a seeker profile by ID
export const getSeekerById = asyncErrors(async (request, response) => {
  try {
    const seeker = await Seeker.findById(request.params.seekerId).select(
      "_id first_name last_name email biography education skills github linkedin portfolio image headline"
    );

    if (!seeker) {
      return sendResponse(
        {
          message:
            "The seeker you are looking for could not be found. Please check the ID and try again.",
        },
        404,
        response
      );
    }

    sendResponse({ seeker: seeker }, 201, response);
  } catch (errors) {
    sendResponse(
      { message: "Cannot get seeker, please try again" },
      400,
      response
    );
  }
});

// Controller function to add education to the seeker's profile
export const createEducation = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const newEducation = request.body;

    const allowedProperties = [
      "institution",
      "graduationDate",
      "fieldOfStudy",
      "degree",
    ];

    // Validate the input data
    validate(allowedProperties, newEducation, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Add the new education entry to the seeker's profile
    const seeker = await Seeker.findByIdAndUpdate(
      seekerId,
      {
        $push: { education: newEducation },
      },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!seeker) {
      return sendResponse(
        { message: "Seeker not found or could not add education" },
        404,
        response
      );
    }

    sendResponse(
      {
        message:
          "Your education entry has been successfully added to your profile.",
      },
      201,
      response
    );
  } catch (errors) {
    sendResponse(
      { message: "Error adding education, please try again" },
      400,
      response
    );
  }
});

// Controller function to delete an education entry from the seeker's profile
export const deleteEducation = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const { educationId } = request.params;
    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return sendResponse(
        {
          message:
            "We could not find your profile or delete the education entry. Please try again later.",
        },
        404,
        response
      );
    }

    // Filter out the education entry to be deleted
    const updatedEducation = seeker.education.filter(
      (education: any) => education._id.toString() !== educationId.toString()
    );

    // Update the seeker's profile with the filtered education list
    const updatedSeeker = await Seeker.findByIdAndUpdate(
      seekerId,
      { education: updatedEducation },
      { new: true }
    );

    if (!updatedSeeker) {
      return sendResponse(
        { message: "Error updating seeker's education" },
        400,
        response
      );
    }

    sendResponse({ message: "Education successfully deleted" }, 201, response);
  } catch (errors) {
    sendResponse(
      { message: "Error deleting education, please try again" },
      400,
      response
    );
  }
});

export const verifyEmail = asyncErrors(async (request, response) => {
  try {
    const { token } = request.query;
    const seeker = await Seeker.findOne({ verificationToken: token });

    if (!seeker) {
      return sendResponse(
        { message: "Invalid or expired verification token." },
        400,
        response
      );
    }

    seeker.emailVerified = true;
    seeker.verificationToken = undefined;
    seeker.verifiedToken = token;
    await seeker.save();

    sendResponse({ message: "Email successfully verified." }, 200, response);
  } catch (errors) {
    sendResponse(
      { message: "Error verifying email, please try again" },
      400,
      response
    );
  }
});
