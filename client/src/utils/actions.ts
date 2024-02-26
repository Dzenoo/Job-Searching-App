import { postApiHandler } from "./api";

export const signupSeeker = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => postApiHandler("seeker-signup", data);
