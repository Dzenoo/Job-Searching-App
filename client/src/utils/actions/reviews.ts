import { ReviewTime, ReviewType } from "@/typings/reviews";
import { postApiHandler } from "../api";
import { ResponseMessageTypes } from "@/typings/shared";

export const reviewEmployer = async (
  employerId: string,
  token: string,
  formData: {
    positive_review: string;
    negative_review: string;
    technologies: string[];
    job_position: string;
    type: keyof typeof ReviewType;
    time: keyof typeof ReviewTime;
  }
): Promise<ResponseMessageTypes> =>
  await postApiHandler(`seeker/${employerId}/review`, formData, token);
