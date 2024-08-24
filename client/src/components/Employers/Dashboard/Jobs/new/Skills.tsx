import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import MultiSelect from "@/components/ui/multiselect";
import { SkillsInformationsData } from "@/constants";
import { multiselectSkills } from "@/lib/utils";

type SkillsProps = {
  control: Control<any>;
  onSelectSkills: (skills: string[]) => void;
};

const Skills: React.FC<SkillsProps> = ({ control, onSelectSkills }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Relevant Skills</FormLabel>
            <FormControl>
              <MultiSelect
                options={multiselectSkills}
                selectedValues={field.value || []}
                onChange={field.onChange}
              />
            </FormControl>
            <div className="flex flex-wrap gap-2 mt-2">
              {field.value.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <FormDescription>
              Select multiple skills that are relevant to the job.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Skills;
