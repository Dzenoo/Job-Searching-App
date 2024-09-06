import axios from "axios";
import { patchApiHandler } from "../api";
import { ResponseMessageTypes } from "@/types";

export const readNotificationsData = async (
  token: string,
  notification: string
): Promise<{
  message: ResponseMessageTypes;
}> => await patchApiHandler(`notifications/${notification}`, {}, token);

export const typeMessage = async (
  data: { sender: string; content: string },
  token: string,
  employerId: string,
  seekerId: string
) =>
  await patchApiHandler(
    `create-message/${employerId}/${seekerId}`,
    data,
    token
  );
