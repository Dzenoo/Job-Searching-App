import { asyncErrors } from "../../errors";
import { responseServerHandler, validate } from "../../utils/validation";
import Review from "../../models/employer/reviews.schemas";
import Employer from "../../models/employer/employers.schemas";

export const addReview = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;
    const employer = await Employer.findById(employerId);
    const reviewData = request.body;

    if (!employer) {
      return responseServerHandler(
        { message: "Cannot Find Employer" },
        404,
        response
      );
    }

    const existingReview = await Review.findOne({
      seeker: seekerId,
    });

    if (existingReview) {
      return responseServerHandler(
        { message: "Already reviewed this employer" },
        400,
        response
      );
    }

    const allowedProperties = [
      "positive_review",
      "negative_review",
      "technologies",
      "job_position",
      "type",
      "time",
    ];

    validate(allowedProperties, reviewData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    const review = await Review.create({
      ...request.body,
      company: employerId,
      seeker: seekerId,
    });

    await Employer.findByIdAndUpdate(employerId, {
      $push: {
        reviews: review._id,
        notifications: {
          title: "New Review Notification",
          message: `${review.title} has been added to your profile`,
        },
      },
    });

    responseServerHandler(
      { message: "Review successfully added" },
      201,
      response
    );
  } catch (error) {
    responseServerHandler(
      { message: "Cannot add review, please try again" },
      400,
      response
    );
  }
});

export const editReview = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const updateData = request.body;

    const existingReview = await Review.findById(updateData.reviewId);

    if (!existingReview) {
      return responseServerHandler(
        { message: "Cannot find review" },
        404,
        response
      );
    }

    const allowedProperties = [
      "positive_review",
      "negative_review",
      "technologies",
      "job_position",
      "type",
      "time",
      "reviewId",
    ];

    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return responseServerHandler({ message: message }, 403, response);
      }
    });

    if (existingReview.seeker.toString() !== seekerId) {
      return responseServerHandler(
        { message: "Unauthorized. You are not the owner of this review." },
        403,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot edit review, please try again" },
      400,
      response
    );
  }
});

export const deleteReview = asyncErrors(async (request, response) => {
  try {
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;
    const employer = await Employer.findById(employerId);

    if (!employer) {
      return responseServerHandler(
        { message: "Cannot Find Employer" },
        404,
        response
      );
    }

    const existingReview = await Review.findOne({
      seeker: seekerId,
    });

    if (!existingReview) {
      return responseServerHandler(
        { message: "Cannot find review" },
        404,
        response
      );
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
  } catch (error) {
    responseServerHandler(
      { message: "Cannot delete review, please try again" },
      400,
      response
    );
  }
});
