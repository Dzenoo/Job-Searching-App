import { EmployerTypes, ResponseMessageTypes, SeekerTypes } from "@/types";
import { deleteApiHandler, getApiHandler, patchApiHandler } from "../api";

export const getEmployers = async ({
  page = "1",
  srt,
  search,
  token,
}: {
  token: string;
  page: string;
  srt: string;
  search: string;
}): Promise<{ employers: EmployerTypes[]; totalEmployers: number }> =>
  await getApiHandler(
    `seeker/employers?page=${page}&srt=${srt}&search=${search}`,
    token as string
  );

export const getEmployerById = async (
  employerId: string,
  token: string,
  type: string = "reviews",
  page: string = "1"
): Promise<{
  employer: EmployerTypes;
  totalJobs: number;
  totalReviews: number;
}> =>
  await getApiHandler(
    `seeker/employers/${employerId}?page=${page}&type=${type}`,
    token
  );

export const getSeekerProfile = async (
  token: string
): Promise<{ seeker: SeekerTypes }> => await getApiHandler(`seeker`, token);

export const followEmployer = async (
  employerId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/${employerId}/follow`, {}, token);

export const editSeekerProfile = async (
  formData: FormData,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(
    `seeker/edit-seeker-profile`,
    formData,
    token,
    "multipart/form-data"
  );

export const addNewEducation = async (
  data: any,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/add-new-education`, data, token);

export const generateJobAlert = async (
  formData: FormData,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/jobs/alerts`, formData, token);

export const deleteSeekerProfile = async (
  token: string
): Promise<ResponseMessageTypes> =>
  await deleteApiHandler(`seeker/delete-seeker-profile`, token);

export const deleteEducation = async (
  educationId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await deleteApiHandler(`seeker/delete-education/${educationId}`, token);
