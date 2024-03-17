import { EmployerTypes } from "./employers";
import { JobTypes } from "./jobs";
import { SeekerTypes } from "./seekers";

type NotificationTypes = {
  title: string;
  message: string;
  date: Date | string;
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

enum ApplicationStatus {
  "Rejected",
  "Pending",
  "Accepted",
  "Interview",
}

type JobApplicationTypes = {
  cover_letter?: string;
  status: keyof typeof ApplicationStatus;
  resume: string;
  seeker: SeekerTypes;
  job: JobTypes;
};

export {
  type NotificationTypes,
  type SeekerDirectMessagesTypes,
  type MessageTypes,
  type JobApplicationTypes,
  type EmployerDirectMessagesTypes,
};
