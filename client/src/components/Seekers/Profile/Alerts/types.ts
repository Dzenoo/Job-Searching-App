import { JobAlertsTypes } from "@/typings/seekers";

type SeekerProfileAlertsProps = {
  alerts?: JobAlertsTypes;
};

type NewAlertsFormProps = {
  closeDialog?: (dialogId: string) => void;
};

export { type SeekerProfileAlertsProps, type NewAlertsFormProps };
