import { postApiHandler } from "./api";

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
