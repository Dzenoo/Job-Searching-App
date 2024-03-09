import { Employer } from "./employers";

type Review = {
  _id: string;
  company: Employer;
  job_position: string;
  type: keyof typeof ReviewType;
  time: keyof typeof ReviewTime;
  negativeReview: string;
  positiveReview: string;
  technologies: string[];
  seeker: string;
};

enum ReviewType {
  "Freelance",
  "Part-Time",
  "Full-Time",
  "Internship",
}

enum ReviewTime {
  "Less than 1",
  "1-2",
  "2-4",
  "4-7",
  "7-10",
  "10 or greater",
}

export { type Review, ReviewType, ReviewTime };
