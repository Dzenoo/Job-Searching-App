import { ApplicationsTypes, JobTypes, ResponseMessageTypes } from "@/types";
import {
  deleteApiHandler,
  getApiHandler,
  patchApiHandler,
  postApiHandler,
} from "../api";

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

export const createNewJob = async (
  token: string,
  formData: any
): Promise<ResponseMessageTypes> =>
  await postApiHandler(`employer/jobs/create-new-job`, formData, token);

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

export const getApplications = async ({
  token,
  jobId,
  type,
  page,
}: {
  token: string;
  jobId: string;
  type: string;
  page: string;
}): Promise<{
  job: JobTypes;
  applications: ApplicationsTypes[];
  totalApplications: number;
  totalPendingStatus: number;
  totalInterviewStatus: number;
}> =>
  await getApiHandler(
    `employer/applications/${jobId}?page=${page}&type=${type}`,
    token
  );

export const updateApplicationStatus = async (
  applicationId: string,
  token: string,
  status: string
) =>
  await patchApiHandler(`employer/${applicationId}/status`, { status }, token);
