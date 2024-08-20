import { asyncErrors } from "../errors/asyncErrors";
import Notification from "../models/shared/notifications.schema";
import { sendResponse } from "../utils/validation";

// Controller function to mark a notification as read
export const readNotificationsData = asyncErrors(async (request, response) => {
  try {
    // Find the notification by ID and update its 'isRead' status to true
    const notification = await Notification.findByIdAndUpdate(
      request.params.notification,
      {
        isRead: true,
      },
      { new: true } // Return the updated document
    );

    // Check if the notification was not found
    if (!notification) {
      return sendResponse(
        {
          message:
            "The specified notification could not be found. Please check the notification ID and try again.",
        },
        400,
        response
      );
    }

    // Send a success response
    sendResponse(
      {
        message: "The notification has been successfully marked as read.",
      },
      201,
      response
    );
  } catch (error) {
    // Handle any errors that occur during the process
    sendResponse(
      { message: "Cannot mark notification as read, please try again" },
      400,
      response
    );
  }
});
