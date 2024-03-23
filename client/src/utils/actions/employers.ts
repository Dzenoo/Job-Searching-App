import { EmployerTypes } from "@/typings/employers";
import { getApiHandler } from "../api";

export const getEmployerProfile = async (
  token: string
): Promise<{ employer: EmployerTypes }> =>
  await getApiHandler(`employer`, token);
