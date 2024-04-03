import { Control, FormState } from "react-hook-form";

type OverviewProps = {
  formState: FormState<{
    description: string;
    expiration_date: string;
    salary: string;
  }>;
  control: Control<any>;
};

export { type OverviewProps };
