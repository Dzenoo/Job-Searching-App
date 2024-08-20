import { ResponseMessageTypes } from "@/types/shared";
import { getApiHandler, patchApiHandler } from "../api";
import { EventTypes } from "@/types/events";

export const registerForEvent = async (
  eventId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/events/${eventId}/register`, {}, token);

export const getEvents = async ({
  page = "1",
  srt,
  search,
  token,
  category,
  location,
}: {
  token: string;
  page: string;
  srt: string;
  search: string;
  category: string;
  location: string;
}): Promise<{
  events: EventTypes[];
  totalEvents: number;
}> =>
  await getApiHandler(
    `seeker/events?page=${page}&srt=${srt}&search=${search}&category=${category}&location=${location}`,
    token
  );
