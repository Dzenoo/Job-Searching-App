import { asyncErrors } from "../errors/asyncErrors";
import Employer from "../models/employers.schema";
import Review from "../models/reviews.schema";
import Notification from "../models/notifications.schema";
import { sendResponse, validate } from "../utils/validation";

// Controller function to create a review for an employer
export const createReview = asyncErrors(async (request, response) => {
  try {
    // Get seekerId from the authenticated user and employerId from request parameters
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;
    const employer = await Employer.findById(employerId);
    const reviewData = request.body;

    // Check if the employer exists
    if (!employer) {
      return sendResponse(
        {
          message:
            "The specified employer could not be found. Please check the employer ID and try again.",
        },
        404,
        response
      );
    }

    // Check if the seeker has already reviewed this employer
    const existingReview = await Review.findOne({
      seeker: seekerId,
      company: employerId,
    });

    if (existingReview) {
      return sendResponse(
        { message: "You have already submitted a review for this employer." },
        400,
        response
      );
    }

    // Define allowed properties for validation
    const allowedProperties = [
      "positiveReview",
      "negativeReview",
      "technologies",
      "job_position",
      "type",
      "time",
    ];

    // Validate the incoming review data
    validate(allowedProperties, reviewData, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Create the new review in the database
    const review = await Review.create({
      ...request.body,
      company: employerId,
      seeker: seekerId,
    });

    if (!review) {
      return sendResponse(
        { message: "Failed to create the review." },
        500,
        response
      );
    }

    const notification = await Notification.create({
      user: "employer",
      title: "New Review Notification",
      message: `A new review has been added to your profile`,
      type: "reviews",
    });

    // Add the review to the employer's list of reviews and create a notification
    await Employer.findByIdAndUpdate(employerId, {
      $push: {
        reviews: review._id,
        notifications: notification._id,
      },
    });

    // Send a success response
    sendResponse({ message: "Review successfully added" }, 201, response);
  } catch (error) {
    console.log(error);
    // Handle any errors during the process
    sendResponse(
      { message: "Cannot add review, please try again" },
      400,
      response
    );
  }
});

// Controller function to edit an existing review
export const editReview = asyncErrors(async (request, response) => {
  try {
    // Get seekerId from the authenticated user and update data from the request body
    // @ts-ignore
    const { seekerId } = request.user;
    const updateData = request.body;

    // Find the existing review by its ID
    const existingReview = await Review.findById(updateData.reviewId);

    // Check if the review exists
    if (!existingReview) {
      return sendResponse(
        {
          message:
            "The review you are trying to edit could not be found. Please check the review ID and try again.",
        },
        404,
        response
      );
    }

    // Define allowed properties for validation
    const allowedProperties = [
      "positive_review",
      "negative_review",
      "job_position",
      "reviewId",
    ];

    // Validate the incoming update data
    validate(allowedProperties, updateData, (error, message) => {
      if (error) {
        return sendResponse({ message: message }, 403, response);
      }
    });

    // Check if the authenticated seeker is the owner of the review
    if (existingReview.seeker.toString() !== seekerId) {
      return sendResponse(
        {
          message:
            "You are not authorized to edit this review. Please ensure you are the review owner.",
        },
        403,
        response
      );
    }

    // Update the review in the database
    const editedReview = await Review.findByIdAndUpdate(
      existingReview._id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if the review was successfully updated
    if (!editedReview) {
      return sendResponse(
        { message: "Review not found or could not be updated" },
        404,
        response
      );
    }

    // Send a success response
    sendResponse({ message: "Review successfully edited" }, 201, response);
  } catch (error) {
    // Handle any errors during the process
    sendResponse(
      { message: "Cannot edit review, please try again" },
      400,
      response
    );
  }
});

// Controller function to delete an existing review
export const deleteReview = asyncErrors(async (request, response) => {
  try {
    // Get seekerId from the authenticated user and employerId from request parameters
    // @ts-ignore
    const { seekerId } = request.user;
    const employerId = request.params.employerId;
    const employer = await Employer.findById(employerId);

    // Check if the employer exists
    if (!employer) {
      return sendResponse(
        {
          message:
            "The specified employer could not be found. Please check the employer ID and try again.",
        },
        404,
        response
      );
    }

    // Find the review by seekerId
    const existingReview = await Review.findOne({
      seeker: seekerId,
    });

    // Check if the review exists
    if (!existingReview) {
      return sendResponse(
        {
          message:
            "The review you are trying to delete could not be found. Please check the details and try again.",
        },
        404,
        response
      );
    }

    // Remove the review from the employer's list of reviews
    await Employer.findByIdAndUpdate(employerId, {
      $pull: { reviews: existingReview._id },
    });

    // Delete the review from the database
    await Review.findByIdAndDelete(existingReview._id);

    // Send a success response
    sendResponse({ message: "Review successfully deleted" }, 201, response);
  } catch (error) {
    // Handle any errors during the process
    sendResponse(
      { message: "Cannot delete review, please try again" },
      400,
      response
    );
  }
});
