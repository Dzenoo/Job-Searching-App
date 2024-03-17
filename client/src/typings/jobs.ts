import { EmployerTypes } from "./employers";

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
  applications: string[];
  createdAt: string;
  company: EmployerTypes;
};

export { type JobTypes };
