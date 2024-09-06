import axios from "axios";
import { patchApiHandler } from "../api";
import { ResponseMessageTypes } from "@/types";

export const readNotificationsData = async (
  token: string,
  notification: string
): Promise<{
  message: ResponseMessageTypes;
}> => await patchApiHandler(`notifications/${notification}`, {}, token);
