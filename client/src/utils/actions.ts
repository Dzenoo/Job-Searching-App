import { TypeOfAccount } from "@/components/Auth/Signup/ChooseTypeAccount/types";
import { getApiHandler, patchApiHandler, postApiHandler } from "./api";
import axios from "axios";

export const signupSeeker = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => await postApiHandler("seeker-signup", data);

export const signupEmployer = async (data: {
  number: string;
  name: string;
  email: string;
  password: string;
  industry: string;
  size: string;
  address: string;
}) => await postApiHandler("employer-signup", data);

export const loginUserAccount = async ({
  type,
  loginData,
}: {
  type: TypeOfAccount;
  loginData: {
    email: string;
    password: string;
  };
}) =>
  await postApiHandler(
    type === "employer" ? "employer-login" : "seeker-login",
    loginData
  );

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
}) =>
  await getApiHandler(
    `seeker/jobs?page=${page}&srt=${srt}&search=${search}&salaryRange=${salaryRange}&position=${position}&seniority=${seniority}&type=${type}`,
    token as string
  );

export const getJobById = async (jobId: string, token: string) =>
  await getApiHandler(`seeker/jobs/${jobId}`, token);

export const applyToJob = async (
  jobId: string,
  token: string,
  formData: FormData
) =>
  await postApiHandler(
    `seeker/jobs/${jobId}/apply`,
    formData,
    token,
    "multipart/form-data"
  );

export const addCoverLetter = async (jobId: string, token: string) =>
  await postApiHandler(`seeker/${jobId}/generate-cover-letter`, {}, token);

export const saveJob = async (jobId: string, token: string) =>
  await patchApiHandler(`seeker/jobs/${jobId}/save`, {}, token);

export const addJobAlert = async (token: string, data: any) =>
  await patchApiHandler(`seeker/jobs/alerts`, data, token);

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
}) =>
  await getApiHandler(
    `seeker/employers?page=${page}&srt=${srt}&search=${search}`,
    token as string
  );

export const followEmployer = async (employerId: string, token: string) =>
  await patchApiHandler(`seeker/${employerId}/follow`, {}, token);

export const getEmployerById = async (
  employerId: string,
  token: string,
  type: string = "reviews",
  page: string = "1"
) =>
  await getApiHandler(
    `seeker/employers/${employerId}?page=${page}&type=${type}`,
    token
  );

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [];
  }
};

export const registerForEvent = async (eventId: string, token: string) =>
  await patchApiHandler(`seeker/events/${eventId}/register`, {}, token);
