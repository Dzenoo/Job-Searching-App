import { uuidv7 } from "uuidv7";
import { asyncErrors } from "../errors/asyncErrors";
import Seeker from "../models/seeker/seekers.schema";
import Job from "../models/shared/jobs.schema";
import { deleteFileFromS3, uploadFileToS3 } from "../utils/aws";
import { sendResponse, validate } from "../utils/validation";
import Application from "../models/shared/applications.schema";
import Review from "../models/employer/reviews.schema";
import Event from "../models/employer/events.schema";
import Employer from "../models/employer/employers.schema";

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
        return sendResponse(
          { message: "This email already exists, please try again" },
          400,
          response
        );
      }

      // Create a new seeker
      const newSeeker = await Seeker.create(request.body);

      if (!newSeeker) {
        return sendResponse(
          { message: "Cannot register account, please try again" },
          500,
          response
        );
      }

      await newSeeker.save();

      sendResponse(
        { seeker: newSeeker._id, seekerToken: newSeeker.generateAuthToken },
        201,
        response
      );
    } catch (errors) {
      sendResponse({ message: "Error during signup" }, 400, response);
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
          { message: "Invalid credentials for account, please try again" },
          500,
          response
        );
      }

      const seekerToken = await existingSeeker.generateAuthToken();

      if (!seekerToken) {
        return sendResponse(
          { message: "Cannot login account, please try again" },
          500,
          response
        );
      }

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
        path: "notifications",
        options: { skip, limit: Number(limit) },
      })
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
      .populate({
        path: "directMessages.messages",
        select: "content sender createdAt",
      })
      .select(
        "_id first_name last_name email biography image education skills alerts github linkedin portfolio following events notifications overview"
      )
      .exec();

    if (!seeker) {
      return sendResponse({ message: "Cannot Find Seeker" }, 201, response);
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
      "overview",
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
        { message: "Profile not found or could not be updated" },
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
        { message: "Seeker not found or could not be deleted" },
        404,
        response
      );
    }

    const applications = await Application.find({ seeker: seekerId });
    const reviews = await Review.find({ seeker: seekerId });

    // Delete related data for the seeker
    await Application.deleteMany({ seeker: seekerId });
    await Review.deleteMany({ seeker: seekerId });
    await Event.updateMany(
      { seekers: seekerId },
      { $pull: { seekers: seekerId } }
    );
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
        message: "Seeker profile and associated data deleted successfully",
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
    const { page = 1, limit = 10, search, skills } = request.query;

    const conditions: any = {};

    // Add search conditions if search terms are provided
    if (search) {
      conditions.$or = [
        { first_name: { $regex: new RegExp(String(search), "i") } },
        { email: { $regex: new RegExp(String(search), "i") } },
        { overview: { $regex: new RegExp(String(search), "i") } },
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
        "_id first_name last_name email skills github linkedin portfolio image overview"
      )
      .exec();

    const totalSeekers = await Seeker.countDocuments(conditions);

    if (!seekers) {
      return sendResponse({ message: "Cannot Find Seekers" }, 404, response);
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
      "_id first_name last_name email biography education skills github linkedin portfolio image overview"
    );

    if (!seeker) {
      return sendResponse({ message: "Seeker not found" }, 404, response);
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

    sendResponse({ message: "Successfully added education" }, 201, response);
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
        { message: "Seeker not found or could not delete education" },
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
