import { Employer } from "./employers";

type Job = {
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
  company: Employer;
};
export { type Job };
