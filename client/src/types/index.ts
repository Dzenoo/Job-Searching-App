// ===============================
// Enums
// ===============================
enum SizeOfEmployers {
  "Less-than-17" = "Less-than-17",
  "20-50" = "20-50",
  "50-100" = "50-100",
  "100-250" = "100-250",
  "250-500" = "250-500",
  "500-1000" = "500-1000",
}

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

enum ApplicationStatus {
  Rejected = "Rejected",
  Pending = "Pending",
  Accepted = "Accepted",
  Interview = "Interview",
}

// ===============================
// Types
// ===============================
type EmployerTypes = {
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
  notifications: NotificationTypes[];
  jobs: JobTypes[];
  followers: SeekerTypes[];
  reviews: ReviewTypes[];
};

type JobTypes = {
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

type ReviewTypes = {
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

type JobAlertsTypes = {
  title: string;
  type: string;
  level: string;
};

type SeekerTypes = {
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
  notifications: NotificationTypes[];
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

type NotificationTypes = {
  user: string;
  _id: string;
  title: string;
  message: string;
  date: string;
  data: any;
  isRead: boolean;
  type: "jobs" | "applications" | "reviews" | "followers";
};

type ApplicationsTypes = {
  _id: string;
  status: keyof typeof ApplicationStatus;
  cover_letter: string;
  resume: string;
  seeker: SeekerTypes;
  job: JobTypes;
  createdAt: string;
};

type ResponseMessageTypes = {
  message: string;
};

// Auth
enum TypeOfAccount {
  Seeker = "seeker",
  Employer = "employer",
  Default = "",
}

// ===============================
// Exports
// ===============================
export {
  type EmployerTypes,
  SizeOfEmployers,
  type JobTypes,
  type ReviewTypes,
  ReviewType,
  ReviewTime,
  type JobAlertsTypes,
  type SeekerTypes,
  type NotificationTypes,
  type ApplicationsTypes,
  ApplicationStatus,
  type ResponseMessageTypes,
  TypeOfAccount,
};
