import { asyncErrors } from "../../errors";
import { validate, responseServerHandler } from "../../utils/validation";
import { deleteFromAws, initializeAws } from "../../utils/aws";
import { uuidv7 } from "uuidv7";
import Seeker from "../../models/seeker/seekers.schemas";
import Employer from "../../models/employer/employers.schemas";
import Application from "../../models/shared/applications.schemas";
import Job from "../../models/shared/jobs.schemas";
import Review from "../../models/employer/reviews.schemas";
import Event from "../../models/employer/events.schemas";

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

      validate(allowedProperties, seekerData, (error, message) => {
        if (error) {
          return responseServerHandler({ message: message }, 403, response);
        }
      });

      const existingSeeker = await Seeker.findOne({
        email: request.body.email,
      });

      if (existingSeeker) {
        return responseServerHandler(
          { message: "This email already exists, please try again" },
          400,
          response
        );
      }

      const newSeeker = await Seeker.create(request.body);

      if (!newSeeker) {
        return responseServerHandler(
          {
            message: "Cannot register account, please try again",
          },
          500,
          response
        );
      }

      await newSeeker.save();

      responseServerHandler(
        { seeker: newSeeker._id, seekerToken: newSeeker.generateAuthToken },
        201,
        response
      );
    } catch (errors) {
      responseServerHandler({ message: "Error for signup" }, 400, response);
    }
  }
);

export const loginSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const allowedProperties = ["email", "password"];
      const seekerData = request.body;

      validate(allowedProperties, seekerData, (error, message) => {
        if (error) {
          return responseServerHandler({ message: message }, 403, response);
        }
      });

      // @ts-ignore
      const existingSeeker = await Seeker.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingSeeker) {
        return responseServerHandler(
          {
            message: "Invalid credentials for account, please try again",
          },
          500,
          response
        );
      }

      const seekerToken = await existingSeeker.generateAuthToken();

      if (!seekerToken) {
        return responseServerHandler(
          {
            message: "Cannot login account, please try again",
          },
          500,
          response
        );
      }

      responseServerHandler(
        {
          seeker: existingSeeker._id,
          token: seekerToken,
        },
        200,
        response
      );
    } catch (errors) {
      responseServerHandler({ message: "Error for login" }, 400, response);
    }
  }
);

export const getSeekerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;

    const { page = 1, limit = 10 } = request.query;
    const skip = (Number(page) - 1) * Number(limit);

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
        "_id first_name last_name email biography image education skills alerts github linkedin portfolio following events notifications"
      )
      .exec();

    if (!seeker) {
      return responseServerHandler(
        { message: "Cannot Find Seeker" },
        201,
        response
      );
    }

    responseServerHandler({ seeker: seeker }, 201, response);
  } catch (errors) {
    responseServerHandler(
      { message: "Cannot get profile, please try again" },
      400,
      response
    );
  }
});

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
    ];

    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    if (request.file) {
      const currentSeeker = await Seeker.findById(seekerId);

      if (currentSeeker.image.includes("seekers")) {
        await deleteFromAws(currentSeeker.image.split("/")[1], "seekers");
      }

      const result = uuidv7();
      const imageKey = `seeker_${result}.png`;
      const uploads = await initializeAws(request.file, imageKey, "seekers");
      await uploads.done();

      updateData.image = `seekers/${imageKey}`;
    }

    const editedProfile = await Seeker.findByIdAndUpdate(seekerId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!editedProfile) {
      return responseServerHandler(
        { message: "Profile not found or could not be updated" },
        404,
        response
      );
    }

    responseServerHandler(
      { message: "Sucessfully edited profile" },
      201,
      response
    );
  } catch (errors) {
    responseServerHandler(
      { message: "Cannot edit profile, please try again" },
      400,
      response
    );
  }
});

export const deleteSeekerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return responseServerHandler(
        { message: "Seeker not found or could not be deleted" },
        404,
        response
      );
    }

    const applications = await Application.find({ seeker: seekerId });
    const reviews = await Review.find({ seeker: seekerId });

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
      await deleteFromAws(seeker.image.split("/")[1], "seekers");
    }

    await Seeker.findByIdAndDelete(seekerId);

    responseServerHandler(
      {
        message: "Seeker profile and associated data deleted successfully",
      },
      200,
      response
    );
  } catch (errors) {
    responseServerHandler(
      { message: "Cannot delete profile, please try again" },
      400,
      response
    );
  }
});

export const getSeekers = asyncErrors(async (request, response) => {
  try {
    const { page = 1, limit = 10, search, skills } = request.query;

    const conditions: any = {};

    if (search) {
      conditions.$or = [
        { first_name: { $regex: new RegExp(String(search), "i") } },
        { email: { $regex: new RegExp(String(search), "i") } },
        { github: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    if (skills && typeof skills === "string") {
      conditions.skills = { $in: skills.split(",") };
    } else {
      conditions.skills = [];
    }

    const seekers = await Seeker.find(conditions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select(
        "_id first_name last_name email skills github linkedin portfolio image"
      )
      .exec();

    if (!seekers) {
      return responseServerHandler(
        { message: "Cannot Find Seekers" },
        404,
        response
      );
    }

    responseServerHandler({ seekers: seekers }, 200, response);
  } catch (errors) {
    responseServerHandler(
      { message: "Cannot get seekers, please try again" },
      400,
      response
    );
  }
});

export const getSeekerById = asyncErrors(async (request, response) => {
  try {
    const seeker = await Seeker.findById(request.params.seekerId).select(
      "_id first_name last_name email biography education skills github linkedin portfolio image"
    );

    if (!seeker) {
      return responseServerHandler(
        { message: "Seeker not found" },
        404,
        response
      );
    }

    responseServerHandler({ seeker: seeker }, 201, response);
  } catch (errors) {
    responseServerHandler(
      { message: "Cannot get seeker, please try again" },
      400,
      response
    );
  }
});

export const addNewEducation = asyncErrors(async (request, response) => {
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

    validate(allowedProperties, newEducation, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

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
      return responseServerHandler(
        { message: "Seeker not found or could not add education" },
        404,
        response
      );
    }

    responseServerHandler(
      { message: "Successfully added education" },
      201,
      response
    );
  } catch (errors) {
    responseServerHandler(
      { message: "Error adding education, please try again" },
      400,
      response
    );
  }
});

export const deleteEducation = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const { educationId } = request.params;
    const seeker = await Seeker.findById(seekerId);

    if (!seeker) {
      return responseServerHandler(
        { message: "Seeker not found or could not delete education" },
        404,
        response
      );
    }

    const updatedEducation = seeker.education.filter(
      (education: any) => education._id.toString() !== educationId.toString()
    );

    const updatedSeeker = await Seeker.findByIdAndUpdate(
      seekerId,
      { education: updatedEducation },
      { new: true }
    );

    if (!updatedSeeker) {
      return responseServerHandler(
        { message: "Error updating seeker's education" },
        400,
        response
      );
    }

    responseServerHandler(
      { message: "Education successfully deleted" },
      201,
      response
    );
  } catch (errors) {
    responseServerHandler(
      { message: "Error deleting education, please try again" },
      400,
      response
    );
  }
});
