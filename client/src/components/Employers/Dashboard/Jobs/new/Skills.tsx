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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

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
              <Select
                multiple
                onValueChange={(value: any) => {
                  const newSkills = [...field.value, value];
                  field.onChange(newSkills);
                  onSelectSkills(newSkills);
                }}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Skills</SelectLabel>
                    <SelectItem value="React.js">React.js</SelectItem>
                    <SelectItem value="Node.js">Node.js</SelectItem>
                    <SelectItem value="Express.js">Express.js</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
