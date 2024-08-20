import { EmployerTypes } from "./employers";
import { SeekerTypes } from "./seekers";

type ReviewTypes = {
  _id: string;
  company: EmployerTypes;
  job_position: string;
  type: keyof typeof ReviewType;
  time: keyof typeof ReviewTime;
  negativeReview: string;
  positiveReview: string;
  technologies: string[];
  seeker: SeekerTypes | string;
  createdAt: string;
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

export { type ReviewTypes, ReviewType, ReviewTime };
