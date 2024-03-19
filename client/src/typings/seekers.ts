import { JobTypes } from "./jobs";
import {
  ApplicationsTypes,
  NotificationTypes,
  SeekerDirectMessagesTypes,
} from "./shared";

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

export { type SeekerTypes, type JobAlertsTypes };
