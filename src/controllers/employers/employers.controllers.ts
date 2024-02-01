import { asyncErrors } from "../../errors";
import { responseServerHandler } from "../../utils/response";
import Employer from "../../models/employer/employers.schemas";
import Seeker from "../../models/seeker/seekers.schemas";
import Review from "../../models/employer/reviews.schemas";

export const signupEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      if (
        [
          "password",
          "email",
          "name",
          "number",
          "address",
          "size",
          "industry",
        ].filter((property) => !request.body[property]).length > 0
      ) {
        responseServerHandler(
          {
            message: "Please provide valid credentials",
          },
          400,
          response
        );
      }

      const existingEmployer = await Employer.findOne({
        email: request.body.email,
      });

      if (existingEmployer) {
        responseServerHandler(
          { message: "This email already exists, please try again" },
          400,
          response
        );
      }

      const newEmployer = await Employer.create(request.body);

      if (!newEmployer) {
        responseServerHandler(
          {
            message: "Cannot register account, please try again",
          },
          500,
          response
        );
      }

      await newEmployer.save();

      responseServerHandler({ employer: newEmployer._id }, 201, response);
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
    }
  }
);

export const loginEmployer = asyncErrors(
  async (request, response): Promise<void> => {
    try {
      if (
        ["password", "email"].filter((property) => !request.body[property])
          .length > 0
      ) {
        responseServerHandler(
          {
            message: "Please provide valid credentials",
          },
          400,
          response
        );
      }

      // @ts-ignore
      const existingEmployer = await Employer.findByCredentials(
        request.body.email,
        request.body.password
      );

      if (!existingEmployer) {
        responseServerHandler(
          {
            message: "Invalid credentials for account, please try again",
          },
          500,
          response
        );
      }

      const employerToken = await existingEmployer.generateAuthToken();

      if (!employerToken) {
        responseServerHandler(
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
          employerToken: employerToken,
        },
        200,
        response
      );
    } catch (error: any) {
      responseServerHandler({ message: error.message }, 400, response);
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
        $push: { followers: seekerId },
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
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const getEmployerProfile = asyncErrors(async (request, response) => {
  try {
    const employer = await Employer.findById(request.params.employerId);

    if (!employer) {
      responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
    }

    responseServerHandler({ employer: employer }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
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

    const sortOptions: any = { createdAt: srt === "desc" ? -1 : 1 };

    const employers = await Employer.find(conditions)
      .sort(sortOptions)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select(
        "image name company_description reviews followers events size address"
      )
      .exec();

    if (!employers) {
      responseServerHandler(
        { message: "Cannot Find Employers" },
        404,
        response
      );
    }

    responseServerHandler({ employers: employers }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const getEmployerById = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const employer = await Employer.findById(employerId)
      .populate({
        path: "jobs",
        select: "title position _id location level description",
      })
      .populate("reviews")
      .populate("events")
      .select(
        "name reviews events email address size website followers number company_description industry image"
      )
      .exec();

    if (!employer) {
      responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
    }
    responseServerHandler({ employer: employer }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const reviewEmployer = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;
    const employer = await Employer.findById(employerId);

    if (!employer) {
      responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
    }

    const existingReview = await Review.findOne({
      seeker: seekerId,
    });

    if (existingReview) {
      responseServerHandler(
        { message: "Already reviewed this employer" },
        400,
        response
      );
      return;
    }

    const review = await Review.create({
      ...request.body,
      company: employerId,
      seeker: seekerId,
    });

    await Employer.findByIdAndUpdate(employerId, {
      $push: { reviews: review._id },
    });

    responseServerHandler(
      { message: "Review successfully added" },
      201,
      response
    );
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const deleteReviewEmployer = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;
    const employer = await Employer.findById(employerId);

    if (!employer) {
      responseServerHandler({ message: "Cannot Find Employer" }, 404, response);
    }

    const existingReview = await Review.findOne({
      seeker: seekerId,
    });

    if (!existingReview) {
      responseServerHandler({ message: "Cannot find review" }, 404, response);
      return;
    }

    await Employer.findByIdAndUpdate(employerId, {
      $pull: { reviews: existingReview._id },
    });

    await Review.findByIdAndDelete(existingReview._id);

    responseServerHandler(
      { message: "Review successfully deleted" },
      201,
      response
    );
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const editReviewEmployer = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const updateData = request.body;

    const existingReview = await Review.findById(updateData.reviewId);

    if (!existingReview) {
      responseServerHandler({ message: "Cannot find review" }, 404, response);
      return;
    }

    if (Object.keys(updateData).length === 0) {
      responseServerHandler(
        { message: "Data is not valid and review can't be edited" },
        403,
        response
      );
    }

    if (existingReview.seeker.toString() !== seekerId) {
      responseServerHandler(
        { message: "Unauthorized. You are not the owner of this review." },
        403,
        response
      );
      return;
    }

    const editedReview = await Review.findByIdAndUpdate(
      existingReview._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editedReview) {
      return responseServerHandler(
        { message: "Review not found or could not be updated" },
        404,
        response
      );
    }

    responseServerHandler(
      { message: "Review successfully edited" },
      201,
      response
    );
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});

export const editEmployerProfile = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { employerId } = request.user;
    const updateData = request.body;

    const allowedProperties = [
      "industry",
      "company_description",
      "size",
      "name",
      "number",
      "address",
      "website",
    ];

    const disallowedProperties = Object.keys(updateData).filter(
      (prop) => !allowedProperties.includes(prop)
    );

    if (
      disallowedProperties.length > 0 ||
      Object.keys(updateData).length === 0
    ) {
      responseServerHandler(
        { message: "Data is not valid and profile can't be edited" },
        403,
        response
      );
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

    responseServerHandler({ job: editedProfile }, 201, response);
  } catch (error: any) {
    responseServerHandler({ message: error.message }, 400, response);
  }
});
