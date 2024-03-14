import { patchApiHandler } from "../api";

export const registerForEvent = async (eventId: string, token: string) =>
  await patchApiHandler(`seeker/events/${eventId}/register`, {}, token);
