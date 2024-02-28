import { JobProps } from "./Item/types";

type JobListProps = {
  jobs: JobProps[];
};

type PopularsJobsInfoProps = {
  jobs: {
    _id: string;
    title: string;
  }[];
};

export { type JobListProps, type PopularsJobsInfoProps };
