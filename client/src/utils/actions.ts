import { TypeOfAccount } from "@/components/Auth/Signup/ChooseTypeAccount/types";
import { getApiHandler, postApiHandler } from "./api";

export const signupSeeker = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => postApiHandler("seeker-signup", data);

export const signupEmployer = async (data: {
  number: string;
  name: string;
  email: string;
  password: string;
  industry: string;
  size: string;
  address: string;
}) => postApiHandler("employer-signup", data);

export const loginUserAccount = async ({
  type,
  loginData,
}: {
  type: TypeOfAccount;
  loginData: {
    email: string;
    password: string;
  };
}) => {
  const path = type === "employer" ? "employer-login" : "seeker-login";
  return postApiHandler(path, loginData);
};

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
}) => {
  return getApiHandler(
    `seeker/jobs?page=${page}&srt=${srt}&search=${search}&salaryRange=${salaryRange}&position=${position}&seniority=${seniority}&type=${type}`,
    token as string
  );
};

export const getJobById = async (jobId: string, token: string) =>
  getApiHandler(`seeker/jobs/${jobId}`, token);
