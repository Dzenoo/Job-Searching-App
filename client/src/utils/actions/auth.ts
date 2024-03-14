import { TypeOfAccount } from "@/components/Auth/Signup/ChooseTypeAccount/types";
import { postApiHandler } from "../api";

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
