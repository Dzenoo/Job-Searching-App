import { EmployersProps } from "@/components/Employers/types";

type JobItemProps = {
  job: JobProps;
  showDescription?: boolean;
};

type JobProps = {
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
  company: EmployersProps;
};

export { type JobItemProps, type JobProps };
