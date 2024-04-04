import { EmployerTypes } from "@/typings/employers";
import { getApiHandler } from "../api";
import { SeekerTypes } from "@/typings/seekers";

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
    `employer?type=${type || ""}&page=${page}&srt=${srt}&search=${search}`,
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
