import { TypeOfAccount } from "@/components/auth/signup/ChooseTypeAccount/types";
import { postApiHandler } from "../api";
import { SeekerTypes } from "@/types/seekers";
import { EmployerTypes } from "@/types/employers";

export const signupSeeker = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<{ seeker: SeekerTypes; seekerToken: any }> =>
  await postApiHandler("seeker-signup", data);

export const signupEmployer = async (data: {
  number: string;
  name: string;
  email: string;
  password: string;
  industry: string;
  size: string;
  address: string;
}): Promise<{ seeker: EmployerTypes; employerToken: any }> =>
  await postApiHandler("employer-signup", data);

export const loginUserAccount = async ({
  type,
  loginData,
}: {
  type: TypeOfAccount;
  loginData: {
    email: string;
    password: string;
  };
}): Promise<
  { seeker: SeekerTypes; token: any } & { employer: EmployerTypes; token: any }
> =>
  await postApiHandler(
    type === "employer" ? "employer-login" : "seeker-login",
    loginData
  );