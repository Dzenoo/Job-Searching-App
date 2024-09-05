import { ResponseMessageTypes } from "@/types";
import { postApiHandler } from "../api";

export const createDirectMessages = async (
  seekerId: string,
  token: string
): Promise<ResponseMessageTypes> =>
  await postApiHandler(`employer/${seekerId}/direct-messages`, {}, token);
