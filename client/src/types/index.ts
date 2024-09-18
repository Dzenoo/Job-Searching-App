// ===============================
// Enums
// ===============================
export enum SizeOfEmployers {
  "Less-than-17" = "Less-than-17",
  "20-50" = "20-50",
  "50-100" = "50-100",
  "100-250" = "100-250",
  "250-500" = "250-500",
  "500-1000" = "500-1000",
}

export enum ReviewType {
  "Freelance",
  "Part-Time",
  "Full-Time",
  "Internship",
}

export enum ReviewTime {
  "Less than 1",
  "1-2",
  "2-4",
  "4-7",
  "7-10",
  "10 or greater",
}

export enum ApplicationStatus {
  Rejected = "Rejected",
  Pending = "Pending",
  Accepted = "Accepted",
  Interview = "Interview",
}

// ===============================
// Types
// ===============================
export type EmployerTypes = {
  _id: string;
  image: string;
  industry: string;
  company_description: string;
  size: keyof typeof SizeOfEmployers;
  website: string;
  address: string;
  number: number;
  email: string;
  name: string;
  password: string;
  jobs: JobTypes[];
  followers: SeekerTypes[];
  reviews: ReviewTypes[];
};

export type JobTypes = {
  title: string;
  position: "Remote" | "On-Site" | "Hybrid";
  location: string;
  type: "Internship" | "Full-Time" | "Part-Time" | "Freelance";
  skills: string[];
  level: "Junior" | "Medior" | "Senior";
  salary: number;
  _id: string;
  expiration_date: string & Date;
  description: string;
  overview: string;
  applications: ApplicationsTypes[];
  createdAt: string;
  company: EmployerTypes;
};

export type ReviewTypes = {
  _id: string;
  company: EmployerTypes & string;
  job_position: string;
  type: keyof typeof ReviewType;
  time: keyof typeof ReviewTime;
  negativeReview: string;
  positiveReview: string;
  technologies: string[];
  seeker: SeekerTypes | string;
  createdAt: string;
};

export type JobAlertsTypes = {
  title: string;
  type: string;
  level: string;
};

export type SeekerTypes = {
  _id: string;
  biography: string;
  image: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  portfolio: string;
  linkedin: string;
  github: string;
  applications: ApplicationsTypes[];
  overview: string;
  skills: string[];
  education: {
    _id: string;
    institution: string;
    graduationDate: string;
    fieldOfStudy: string;
    degree: string;
  }[];
  savedJobs: JobTypes[];
  following: string[];
  alerts: JobAlertsTypes;
  createdAt: Date;
  updatedAt: Date;
};

export type ApplicationsTypes = {
  _id: string;
  status: keyof typeof ApplicationStatus;
  cover_letter: string;
  resume: string;
  seeker: SeekerTypes;
  job: JobTypes;
  createdAt: string;
};

export type ResponseMessageTypes = {
  message: string;
};

// Auth
export enum TypeOfAccount {
  Seeker = "seeker",
  Employer = "employer",
  Default = "",
}
