import { ResponseMessageTypes, ReviewTime, ReviewType } from "@/types";
import { deleteApiHandler, postApiHandler } from "../api";

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

export const deleteReview = async (employerId: string, token: string) =>
  await deleteApiHandler(`seeker/${employerId}/review`, token);
