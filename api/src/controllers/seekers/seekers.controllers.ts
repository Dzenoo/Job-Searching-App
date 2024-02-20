import { asyncErrors } from "../../errors";
import { validate, responseServerHandler } from "../../utils/validation";
import Seeker from "../../models/seeker/seekers.schemas";
import Employer from "../../models/employer/employers.schemas";
import Application from "../../models/shared/applications.schemas";
import Job from "../../models/shared/jobs.schemas";
import Review from "../../models/employer/reviews.schemas";
import Event from "../../models/employer/events.schemas";

export const signupSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    const allowedProperties = ["first_name", "last_name", "email", "password"];
    const seekerData = request.body;

    validate(allowedProperties, seekerData, (error, message) => {
      if (error) {
        responseServerHandler({ message: message }, 403, response);
        return;
      }
    });

    const existingSeeker = await Seeker.findOne({
      email: request.body.email,
    });

    if (existingSeeker) {
      return responseServerHandler(
        { message: "This email already exists, please try again" },
        404,
        response
      );
    }

    const newSeeker = await Seeker.create(request.body);

    if (!newSeeker) {
      responseServerHandler(
        {
          message: "Cannot register account, please try again",
        },
        500,
        response
      );
      return;
    }

    await newSeeker.save();

    responseServerHandler({ seeker: newSeeker._id }, 201, response);
  }
);

export const loginSeeker = asyncErrors(
  async (request, response): Promise<void> => {
    const allowedProperties = ["email", "password"];
    const seekerData = request.body;

    validate(allowedProperties, seekerData, (error, message) => {
      if (error) {
        responseServerHandler({ message: message }, 403, response);
        return;
      }
    });

    // @ts-ignore
    const existingSeeker = await Seeker.findByCredentials(
      request.body.email,
      request.body.password
    );

    if (!existingSeeker) {
      responseServerHandler(
        {
          message: "Invalid credentials for account, please try again",
        },
        500,
        response
      );
      return;
    }

    const seekerToken = await existingSeeker.generateAuthToken();

    if (!seekerToken) {
      responseServerHandler(
        {
          message: "Cannot login account, please try again",
        },
        500,
        response
      );
      return;
    }

    response.cookie("token", seekerToken, { httpOnly: true });

    responseServerHandler(
      {
        seeker: existingSeeker._id,
        seekerToken: seekerToken,
      },
      200,
      response
    );
  }
);

export const getSeekerProfile = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;

  const { page = 1, limit = 10 } = request.query;
  const skip = (Number(page) - 1) * Number(limit);

  const seeker = await Seeker.findById(seekerId)
    .populate({
      path: "directMessages.messages",
      select: "content sender createdAt",
    })
    .populate({
      path: "savedJobs",
      options: { skip, limit: Number(limit) },
      select: "_id title location level expiration_date createdAt applications",
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
      "_id first_name last_name email biography image education skills alerts github linkedin portfolio"
    )
    .exec();

  if (!seeker) {
    responseServerHandler({ message: "Cannot Find Seeker" }, 201, response);
    return;
  }

  responseServerHandler({ seeker: seeker }, 201, response);
});

export const editSeekerProfile = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const updateData = request.body;

  const allowedProperties = [
    "first_name",
    "last_name",
    "github",
    "linkedin",
    "portfolio",
    "skills",
  ];

  validate(allowedProperties, updateData, (error, message) => {
    if (error) {
      responseServerHandler({ message: message }, 403, response);
      return;
    }
  });

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

  responseServerHandler({ job: editedProfile }, 201, response);
});

export const deleteSeekerProfile = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const seeker = await Seeker.findById(seekerId);

  if (!seeker) {
    responseServerHandler(
      { message: "Seeker not found or could not be deleted" },
      404,
      response
    );
    return;
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
  await Seeker.findByIdAndDelete(seekerId);

  responseServerHandler(
    {
      message: "Seeker profile and associated data deleted successfully",
    },
    200,
    response
  );
});

export const getSeekers = asyncErrors(async (request, response) => {
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
    responseServerHandler({ message: "Cannot Find Seekers" }, 404, response);
    return;
  }

  responseServerHandler({ seekers: seekers }, 200, response);
});

export const getSeekerById = asyncErrors(async (request, response) => {
  const seeker = await Seeker.findById(request.params.seekerId).select(
    "_id first_name last_name email biography education skills github linkedin portfolio image"
  );

  if (!seeker) {
    responseServerHandler({ message: "Seeker not found" }, 404, response);
    return;
  }

  responseServerHandler({ seeker: seeker }, 201, response);
});

export const addNewEducation = asyncErrors(async (request, response) => {
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
      responseServerHandler({ message: message }, 403, response);
      return;
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
    responseServerHandler(
      { message: "Seeker not found or could not add education" },
      404,
      response
    );
    return;
  }

  responseServerHandler({ seeker: seeker }, 201, response);
});

export const deleteEducation = asyncErrors(async (request, response) => {
  // @ts-ignore
  const { seekerId } = request.user;
  const { educationId } = request.params;
  const seeker = await Seeker.findById(seekerId);

  for (const education of seeker.education) {
    if (education._id.toString() === educationId) {
      await Seeker.findByIdAndUpdate(
        seekerId,
        {
          $pull: { education: { _id: educationId } },
        },
        {
          new: true,
        }
      );
    }

    if (!seeker) {
      responseServerHandler(
        { message: "Seeker not found or could not delete education" },
        404,
        response
      );
      return;
    }

    responseServerHandler(
      { message: "Education successfully deleted" },
      201,
      response
    );
  }
});
