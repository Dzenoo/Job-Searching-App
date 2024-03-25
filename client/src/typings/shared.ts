import { EmployerTypes } from "./employers";
import { JobTypes } from "./jobs";
import { SeekerTypes } from "./seekers";

type NotificationTypes = {
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
  status: keyof typeof ApplicationStatus;
  cover_letter: string;
  resume: string;
  seeker: SeekerTypes;
  job: JobTypes;
  createdAt: string;
};

enum ApplicationStatus {
  Rejected = "Rejected",
  Pending = "Pending",
  Accepted = "Accepted",
  Interview = "Interview",
}

type ResponseMessageTypes = {
  message: string;
};

export {
  type NotificationTypes,
  type SeekerDirectMessagesTypes,
  type MessageTypes,
  type ApplicationsTypes,
  type EmployerDirectMessagesTypes,
  type ResponseMessageTypes,
};
