import { ResponseMessageTypes } from "@/typings/shared";
import { patchApiHandler } from "../api";

export const registerForEvent = async (
  eventId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/events/${eventId}/register`, {}, token);
