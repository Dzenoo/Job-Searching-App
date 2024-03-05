import { Job } from "@/typings/jobs";

type JobListProps = {
  jobs: Job[];
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
