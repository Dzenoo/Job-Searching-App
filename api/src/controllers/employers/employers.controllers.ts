import { asyncErrors } from "../../errors";
import { responseServerHandler, validate } from "../../utils/validation";
import Employer from "../../models/employer/employers.schemas";
import Seeker from "../../models/seeker/seekers.schemas";
import Review from "../../models/employer/reviews.schemas";
import Job from "../../models/shared/jobs.schemas";
import Event from "../../models/employer/events.schemas";
import { uuidv7 } from "uuidv7";
import { initializeAws } from "../../utils/aws";

export const signupEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const employerData = request.body;
      const allowedProperties = [
        "password",
        "email",
        "name",
        "number",
        "address",
        "size",
        "industry",
      ];

      validate(allowedProperties, employerData, (error, message) => {
        if (error) {
          return responseServerHandler({ message: message }, 403, response);
        }
      });

      const existingEmployerEmail = await Employer.findOne({
        email: request.body.email,
      });
      const existingEmployerName = await Employer.findOne({
        name: request.body.name,
      });

      if (existingEmployerEmail || existingEmployerName) {
        return responseServerHandler(
          { message: "This account already exists, please try again" },
          400,
          response
        );
      }

      const newEmployer = await Employer.create(request.body);

      if (!newEmployer) {
        return responseServerHandler(
          {
            message: "Cannot register account, please try again",
          },
          500,
          response
        );
      }

      await newEmployer.save();

      responseServerHandler({ employer: newEmployer._id }, 201, response);
    } catch (error) {
      responseServerHandler(
        { message: "Cannot register profile, please try again" },
        400,
        response
      );
    }
  }
);

export const loginEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      const employerData = request.body;
      const allowedProperties = ["email", "password"];

      validate(allowedProperties, employerData, (error, message) => {
        if (error) {
          return responseServerHandler({ message: message }, 403, response);
        }
      });

      // @ts-ignore
      const existingEmployer = await Employer.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingEmployer) {
        return responseServerHandler(
          {
            message: "Invalid credentials for account, please try again",
          },
          500,
          response
        );
      }

      const employerToken = await existingEmployer.generateAuthToken();

      if (!employerToken) {
        return responseServerHandler(
          {
            message: "Cannot login account, please try again",
          },
          500,
          response
        );
      }

      response.cookie("token", employerToken, { httpOnly: true });

      responseServerHandler(
        {
          employer: existingEmployer._id,
          token: employerToken,
        },
        200,
        response
      );
    } catch (error) {
      responseServerHandler(
        { message: "Cannot login now, please try again" },
        400,
        response
      );
    }
  }
);

export const followEmployer = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;

    const [employer, seeker] = await Promise.all([
      Employer.findById(employerId),
      Seeker.findById(seekerId),
    ]);

    if (!employer || !seeker) {
      return responseServerHandler(
        { message: "Employer or Seeker cannot be found" },
        404,
        response
      );
    }

    const isFollowing = employer.followers.includes(seekerId);

    if (isFollowing) {
      await Employer.findByIdAndUpdate(employerId, {
        $pull: { followers: seekerId },
      });
      await Seeker.findByIdAndUpdate(seekerId, {
        $pull: { following: employerId },
      });
      responseServerHandler(
        { message: "Employer successfully unfollowed" },
        201,
        response
      );
    } else {
      await Employer.findByIdAndUpdate(employerId, {
        $push: {
          followers: seekerId,
          notifications: {
            title: "New Followers Notification",
            message: `${seeker.first_name} is now following you`,
          },
        },
      });
      await Seeker.findByIdAndUpdate(seekerId, {
        $push: { following: employerId },
      });
      responseServerHandler(
        { message: "Employer successfully followed" },
        201,
        response
      );
    }
  } catch (error) {
    responseServerHandler(
      {
        message: "Cannot follow or unfollow employer profile, please try again",
      },
      400,
      response
    );
  }
});

export const getEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const { page = 1, limit = 10, type, search, srt } = request.query;
    const skip = (Number(page) - 1) * Number(limit);
    const sort = String(srt);

    let populateQuery: any = {};
    switch (type) {
      case "jobs":
        populateQuery = {
          path: "jobs",
          options: {
            skip,
            limit: Number(limit),
            sort: sort ? { [sort]: 1 } : { _id: 1 },
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
            sort: sort ? { [sort]: 1 } : { _id: 1 },
          },
        };
        break;
      case "events":
        populateQuery = {
          path: "events",
          options: {
            skip,
            limit: Number(limit),
            sort: sort ? { [sort]: 1 } : { _id: 1 },
          },
        };
        break;
      case "messages":
        populateQuery = {
          path: "directMessages.messages",
          select: "content sender createdAt",
        };
        break;
      default:
        break;
    }

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
        case "events":
          searchFields.push("title", "description");
          break;
        default:
          break;
      }

      const searchConditions = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
      searchQuery = { $or: searchConditions };
    }

    const employer = type
      ? await Employer.findById(employerId)
          .populate({
            ...populateQuery,
            match: searchQuery,
          })
          .exec()
      : await Employer.findById(employerId).exec();

    if (!employer) {
      return responseServerHandler(
        { message: "Cannot Find Employer" },
        404,
        response
      );
    }

    const totalJobsData = await Job.countDocuments({ company: employerId });
    const totalEventsData = await Event.countDocuments({ company: employerId });
    const totalReviewsData = await Review.countDocuments({
      company: employerId,
    });
    const totalApplicationsData = await Job.aggregate([
      {
        $match: { company: employerId },
      },
      {
        $lookup: {
          from: "applications",
          localField: "applications",
          foreignField: "_id",
          as: "applications",
        },
      },
      {
        $project: {
          totalApplications: { $size: "$applications" },
        },
      },
    ]);

    const totalApplicationsCount = totalApplicationsData.reduce(
      (total, job) => total + job.totalApplications,
      0
    );

    responseServerHandler(
      {
        employer: employer,
        totalJobsData: totalJobsData,
        totalEventsData: totalEventsData,
        totalReviewsData: totalReviewsData,
        totalApplications: totalApplicationsCount,
      },
      201,
      response
    );
  } catch (error) {
    responseServerHandler(
      { message: "Cannot get profile, please try again" },
      400,
      response
    );
  }
});

export const editEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const updateData = { ...request.body, image: request.file };

    const allowedProperties = [
      "industry",
      "company_description",
      "size",
      "name",
      "number",
      "address",
      "website",
      "image",
    ];

    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    if (request.file) {
      // const currentSeeker = await Seeker.findById(seekerId);

      // Delete the existing image from AWS S3
      // if (currentSeeker.image) {
      // }

      const result = uuidv7();
      const imageKey = `employer_${result}.png`;
      const uploads = await initializeAws(request.file, imageKey, "employers");
      await uploads.done();

      updateData.image = `employers/${imageKey}`;
    }

    const editedProfile = await Employer.findByIdAndUpdate(
      employerId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editedProfile) {
      return responseServerHandler(
        { message: "Profile not found or could not be updated" },
        404,
        response
      );
    }

    responseServerHandler({ employer: editedProfile }, 201, response);
  } catch (error) {
    responseServerHandler(
      { message: "Cannot edit profile, please try again" },
      400,
      response
    );
  }
});

export const deleteEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const employer = await Employer.findById(employerId);
    const jobIds = (employer.jobs || []).map(
      (job: typeof Job | any) => job._id
    );

    if (!employer) {
      return responseServerHandler(
        { message: "Employer not found" },
        404,
        response
      );
    }

    await Job.deleteMany({ company: employerId });
    await Review.deleteMany({ company: employerId });
    await Event.deleteMany({ company: employerId });

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

    await Employer.findByIdAndDelete(employerId);

    responseServerHandler(
      { message: "Employer profile and associated data deleted successfully" },
      200,
      response
    );
  } catch (error) {
    responseServerHandler(
      { message: "Cannot delete profile, please try again" },
      400,
      response
    );
  }
});

export const getEmployerById = asyncErrors(async (request, response) => {
  try {
    const { employerId } = request.params;
    const { page = 1, limit = 10, type = "jobs" } = request.query;

    const skip = (Number(page) - 1) * Number(limit);
    let populateQuery: any;

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
      case "events":
        populateQuery = {
          path: "events",
          options: { skip, limit: Number(limit) },
        };
        break;
      default:
        populateQuery = {};
    }

    const employer = await Employer.findById(employerId)
      .populate(populateQuery)
      .select(
        "name reviews events email address size website followers number company_description industry image jobs"
      )
      .exec();

    if (!employer) {
      return responseServerHandler(
        { message: "Cannot Find Employer" },
        404,
        response
      );
    }

    const totalJobs = await Job.countDocuments({ company: employerId });
    const totalReviews = await Review.countDocuments({ company: employerId });
    const totalEvents = await Event.countDocuments({ company: employerId });

    responseServerHandler(
      {
        employer: employer,
        totalJobs: totalJobs,
        totalReviews: totalReviews,
        totalEvents: totalEvents,
      },
      201,
      response
    );
  } catch (error) {
    responseServerHandler({ message: "Cannot get employer" }, 400, response);
  }
});

export const getEmployers = asyncErrors(async (request, response) => {
  try {
    const { page = 1, limit = 10, search, srt } = request.query;

    const conditions: any = {};

    if (search) {
      conditions.$or = [
        { name: { $regex: new RegExp(String(search), "i") } },
        { address: { $regex: new RegExp(String(search), "i") } },
        { company_description: { $regex: new RegExp(String(search), "i") } },
      ];
    }

    const sortOptions: any = {};

    if (srt) {
      if (srt === "followers" || srt === "events" || srt === "reviews") {
        sortOptions[srt] = -1;
      }
    }

    const employers = await Employer.find(conditions)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select(
        "image name company_description reviews followers events size address"
      )
      .exec();

    const totalEmployers = await Employer.countDocuments(conditions);
    if (!employers) {
      return responseServerHandler(
        { message: "Cannot Find Employers" },
        404,
        response
      );
    }

    responseServerHandler(
      { employers: employers, totalEmployers: totalEmployers },
      201,
      response
    );
  } catch (error) {
    responseServerHandler({ message: "Cannot get employers" }, 400, response);
  }
});
