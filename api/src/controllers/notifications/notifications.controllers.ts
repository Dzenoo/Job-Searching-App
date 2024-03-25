import { asyncErrors } from "../../errors";
import Notification from "../../models/shared/notifications.schemas";
import { responseServerHandler } from "../../utils/validation";

export const readNotificationsData = asyncErrors(async (request, response) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      request.params.notification,
      {
        isRead: true,
      }
    );

    if (!notification) {
      responseServerHandler(
        { message: "Cannot read notification" },
        400,
        response
      );
    }

    responseServerHandler(
      {
        message: "Successfully read notification",
      },
      201,
      response
    );
  } catch (error) {
    responseServerHandler(
      { message: "Cannot add read, please try again" },
      400,
      response
    );
  }
});
