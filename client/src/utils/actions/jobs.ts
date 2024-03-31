import { ResponseMessageTypes } from "@/typings/shared";
import {
  deleteApiHandler,
  getApiHandler,
  patchApiHandler,
  postApiHandler,
} from "../api";
import { JobTypes } from "@/typings/jobs";

export const getJobs = async ({
  page = "1",
  srt,
  search,
  salaryRange,
  type,
  seniority,
  position,
  token,
}: {
  token: string;
  page: string;
  srt: string;
  search: string;
  salaryRange: string | string[];
  type: string | string[];
  seniority: string | string[];
  position: string | string[];
}): Promise<{ jobs: JobTypes[]; totalJobs: number; popularJobs: JobTypes[] }> =>
  await getApiHandler(
    `seeker/jobs?page=${page}&srt=${srt}&search=${search}&salaryRange=${salaryRange}&position=${position}&seniority=${seniority}&type=${type}`,
    token as string
  );

export const getJobById = async (
  jobId: string,
  token: string
): Promise<{ job: JobTypes; jobs: JobTypes[] }> =>
  await getApiHandler(`seeker/jobs/${jobId}`, token);

export const applyToJob = async (
  jobId: string,
  token: string,
  formData: FormData
): Promise<ResponseMessageTypes> =>
  await postApiHandler(
    `seeker/jobs/${jobId}/apply`,
    formData,
    token,
    "multipart/form-data"
  );

export const addCoverLetter = async (
  jobId: string,
  token: string
): Promise<{ cover_letter: string }> =>
  await postApiHandler(`seeker/${jobId}/generate-cover-letter`, {}, token);

export const saveJob = async (
  jobId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/jobs/${jobId}/save`, {}, token);

export const addJobAlert = async (
  token: string,
  data: any
): Promise<ResponseMessageTypes> =>
  await patchApiHandler(`seeker/jobs/alerts`, data, token);

export const deleteJob = async (
  token: string,
  jobId: string
): Promise<ResponseMessageTypes> =>
  await deleteApiHandler(`employer/jobs/${jobId}/delete`, token);
