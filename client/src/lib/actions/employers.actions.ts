import {
  EmployerTypes,
  JobTypes,
  MessageTypes,
  ResponseMessageTypes,
  SeekerTypes,
} from "@/types";
import { getApiHandler, postApiHandler } from "../api";

export const getSeekers = async ({
  page = "1",
  search,
  skills,
  token,
}: {
  token: string;
  page: string;
  skills: string | string[];
  search: string;
}): Promise<{ seekers: SeekerTypes[]; totalSeekers: number }> =>
  await getApiHandler(
    `employer/seekers?page=${page}&search=${search}&skills=${skills}`,
    token as string
  );

export const getEmployerProfile = async ({
  token,
  page,
  srt,
  search,
  type,
}: {
  token: string;
  page?: string;
  srt?: string;
  search?: string;
  type?: string;
}): Promise<{
  counts: { totalJobs: number; totalReviews: number; totalEvents: number };
  employer: EmployerTypes;
}> =>
  await getApiHandler(
    `employer?type=${type}&page=${page}&srt=${srt}&search=${search}`,
    token
  );

export const getSeekerById = async (
  seekerId: string,
  token: string
): Promise<{ seeker: SeekerTypes }> =>
  await getApiHandler(`employer/seekers/${seekerId}`, token);

export const getEmployerAnalytics = async (
  token: string
): Promise<{
  totalJobs: number;
  totalEvents: number;
  totalReviews: number;
  totalApplications: number;
  jobsPerMonth: number;
  followersOverTime: number;
  jobTypes: any;
}> => await getApiHandler(`employer/analytics`, token);

export const getJob = async (
  token: string,
  jobId: string
): Promise<{ job: JobTypes }> =>
  await getApiHandler(`employer/jobs/${jobId}`, token);

export const createDirectMessages = async (
  seekerId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await postApiHandler(`employer/messages/${seekerId}`, {}, token);

export const getDirectMessages = async (
  token: string
): Promise<{
  directMessages: { seekerId: SeekerTypes; messages: MessageTypes[] }[];
}> => await getApiHandler(`employer/messages`, token);

export const getMessagesRoom = async (
  token: string,
  seekerId: string
): Promise<{
  messageRoom: { seekerId: SeekerTypes; messages: MessageTypes[] };
}> => await getApiHandler(`employer/messages/${seekerId}`, token);
