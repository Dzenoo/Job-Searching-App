import React from "react";
import { FormInfo, FormItem } from "@/components/Shared/Forms";
import { Controller } from "react-hook-form";
import { SkillsProps } from "./types";
import { Tag } from "@/components/Shared/Tag";

const Skills: React.FC<SkillsProps> = ({ formState, control }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormItem>
        <p className="dark:text-white text-gray-900 font-medium">Skills</p>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Tag
              options={[
                { label: "React.js", value: "React.js" },
                { label: "Node.js", value: "Node.js" },
                { label: "Express.js", value: "Express.js" },
                { label: "MongoDB", value: "MongoDB" },
              ]}
              label="Search or add up to 10 skills"
              onSelect={() => {}}
              {...field}
              height="h-[10rem]"
            />
          )}
        />
        {formState.errors.skills?.message && (
          <FormInfo variant="danger">
            {formState.errors.skills.message}
          </FormInfo>
        )}
        <FormInfo variant="default">Add skills for job</FormInfo>
      </FormItem>
    </div>
  );
};

export { Skills };
