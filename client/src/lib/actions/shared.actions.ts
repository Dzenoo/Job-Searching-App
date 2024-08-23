import axios from "axios";
import { patchApiHandler } from "../api";
import { ResponseMessageTypes } from "@/types";

export const readNotificationsData = async (
  token: string,
  notification: string
): Promise<{
  message: ResponseMessageTypes;
}> => await patchApiHandler(`notifications/${notification}`, {}, token);

export const fetchCountries = async (): Promise<any> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [];
  }
};
