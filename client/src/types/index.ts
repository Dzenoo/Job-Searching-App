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

enum EventLocation {
  Online = "Online",
  InPerson = "InPerson",
  Hybrid = "Hybrid",
  Virtual = "Virtual",
  Outdoor = "Outdoor",
  Indoor = "Indoor",
}

enum EventCategory {
  Conference = "Conference",
  Seminar = "Seminar",
  Workshop = "Workshop",
  Networking = "Networking",
  Webinar = "Webinar",
  Hackathon = "Hackathon",
  JobFair = "JobFair",
  Meetup = "Meetup",
  Exhibition = "Exhibition",
  Other = "Other",
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
  directMessages: EmployerDirectMessagesTypes[];
  events: EventTypes[];
  reviews: ReviewTypes[];
};

type EventTypes = {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  location: keyof typeof EventLocation | string;
  category: keyof typeof EventCategory | string;
  company: EmployerTypes;
  seekers: SeekerTypes[];
};

type JobTypes = {
  title: string;
  position: string;
  location: string;
  type: string;
  skills: string[];
  level: string;
  salary: number;
  _id: string;
  expiration_date: string;
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
  directMessages: SeekerDirectMessagesTypes[];
  events: string[];
  alerts: JobAlertsTypes;
  createdAt: Date;
  updatedAt: Date;
};

type NotificationTypes = {
  _id: string;
  title: string;
  message: string;
  date: string;
  data: any;
  isRead: boolean;
  type:
    | "jobs"
    | "applications"
    | "messages"
    | "reviews"
    | "events"
    | "followers";
};

type SeekerDirectMessagesTypes = {
  employerId: string;
  messages: MessageTypes[];
};

type EmployerDirectMessagesTypes = {
  employerId: string;
  messages: MessageTypes[];
};

type MessageTypes = {
  sender: SeekerTypes | EmployerTypes;
  content: string;
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
  type EventTypes,
  EventLocation,
  EventCategory,
  type JobTypes,
  type ReviewTypes,
  ReviewType,
  ReviewTime,
  type JobAlertsTypes,
  type SeekerTypes,
  type NotificationTypes,
  type SeekerDirectMessagesTypes,
  type MessageTypes,
  type ApplicationsTypes,
  type EmployerDirectMessagesTypes,
  ApplicationStatus,
  type ResponseMessageTypes,
  TypeOfAccount,
};
