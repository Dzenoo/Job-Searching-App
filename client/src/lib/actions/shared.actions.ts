import { patchApiHandler } from "../api";
import { ResponseMessageTypes } from "@/types";

/**
 * Marks a specific notification as read.
 * @param token - The authentication token.
 * @param notification - The ID of the notification to mark as read.
 * @returns A promise resolving to a message indicating the success or failure of the operation.
 */
export const readNotificationsData = async (
  token: string,
  notification: string
): Promise<{ message: ResponseMessageTypes }> => {
  try {
    return await patchApiHandler(`notifications/${notification}`, {}, token);
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
