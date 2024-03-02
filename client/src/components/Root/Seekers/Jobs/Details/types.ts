import { JobProps } from "../Item/types";

type JobDetailsInfoProps = {
  job: JobProps;
  onApplyJob: () => void;
};

type JobAlertProps = {
  level: string;
  type: string;
  title: string;
  token: string;
};

export { type JobDetailsInfoProps, type JobAlertProps };
