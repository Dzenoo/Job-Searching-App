import { EmployerTypes } from "./employers";
import { ApplicationsTypes } from "./shared";

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

export { type JobTypes };
