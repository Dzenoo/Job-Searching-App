import { Control, FormState } from "react-hook-form";

type SkillsProps = {
  formState: FormState<{ skills: string[] }>;
  control: Control<any>;
  initialSkills: string[];
  onSelectSkills: (skills: any) => void;
};

export { type SkillsProps };
