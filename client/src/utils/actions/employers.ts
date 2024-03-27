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

export const getEmployerProfile = async (
  token: string
): Promise<{ employer: EmployerTypes }> =>
  await getApiHandler(`employer`, token);

export const getSeekerById = async (
  seekerId: string,
  token: string
): Promise<{ seeker: SeekerTypes }> =>
  await getApiHandler(`employer/seekers/${seekerId}`, token);
