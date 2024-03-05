import { Job } from "@/typings/jobs";

type JobDetailsInfoProps = {
  job: Job;
  onApplyJob: () => void;
};

type JobAlertProps = {
  level: string;
  type: string;
  title: string;
  token: string;
};

export { type JobDetailsInfoProps, type JobAlertProps };
