import { Control, FormState } from "react-hook-form";

type DetailsProps = {
  formState: FormState<{ title: string; overview: string; location: string }>;
  control: Control<any>;
};

export { type DetailsProps };
