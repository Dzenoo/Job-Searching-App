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

type SaveJobButtonProps = {
  jobId: string;
  token?: string;
};

export {
  type JobListProps,
  type PopularsJobsInfoProps,
  type SaveJobButtonProps,
};
