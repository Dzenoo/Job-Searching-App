import { Control, FormState } from "react-hook-form";

type SkillsProps = {
  formState: FormState<{ skills: string[] }>;
  control: Control<any>;
};

export { type SkillsProps };
