import { JobAlertsTypes, SeekerTypes } from "@/typings/seekers";

type SeekerProfileAlertsProps = {
  alerts?: JobAlertsTypes;
};

type NewAlertsFormProps = {
  closeDialog: (dialogId: string) => void;
  alerts: JobAlertsTypes;
};

export { type SeekerProfileAlertsProps, type NewAlertsFormProps };
