import { Control, FormState } from "react-hook-form";

type ScopeProps = {
  formState: FormState<{ level: string; position: string; type: string }>;
  control: Control<any>;
};

export { type ScopeProps };
