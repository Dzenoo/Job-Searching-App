import { JobTypes } from "@/types/jobs";

type JobDetailsInfoProps = {
  job: JobTypes;
  onApplyJob?: () => void;
};

type JobAlertProps = {
  level: string;
  type: string;
  title: string;
};

export { type JobDetailsInfoProps, type JobAlertProps };
