import { JobTypes } from "./jobs";
import {
  JobApplicationTypes,
  NotificationTypes,
  SeekerDirectMessagesTypes,
} from "./shared";

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
  applications: JobApplicationTypes[];
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
  alerts: {
    title: string;
    type: string;
    level: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export { type SeekerTypes };
