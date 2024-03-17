import { EventTypes } from "./events";
import { JobTypes } from "./jobs";
import { ReviewTypes } from "./reviews";
import { SeekerTypes } from "./seekers";
import { EmployerDirectMessagesTypes, NotificationTypes } from "./shared";

enum SizeOfEmployers {
  "Less-than-17" = "Less-than-17",
  "20-50" = "20-50",
  "50-100" = "50-100",
  "100-250" = "100-250",
  "250-500" = "250-500",
  "500-1000" = "500-1000",
}

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

export { type EmployerTypes, SizeOfEmployers };
