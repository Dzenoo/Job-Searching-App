import React from "react";
import { ScopeProps } from "./types";
import { FormInfo, FormItem } from "@/components/Shared/Forms";
import { Controller } from "react-hook-form";
import { Radio } from "@/components/Shared/Radio";

const Scope: React.FC<ScopeProps> = ({ formState, control }) => {
  const levels = [
    {
      value: "Junior",
      title: "Junior",
      description:
        "Ideal for those new to the profession, with limited experience in the field.",
    },
    {
      value: "Medior",
      title: "Medior",
      description:
        "Suited for professionals with a moderate level of experience and skill.",
    },
    {
      value: "Senior",
      title: "Senior",
      description: "Designed for highly experienced and skilled professionals.",
    },
    {
      value: "Lead",
      title: "Lead",
      description:
        "Leadership position for candidates with significant experience and leadership skills.",
    },
  ];

  const positions = [
    {
      value: "Remote",
      title: "Remote",
      description:
        "Fully remote position with no requirement to work from a physical office.",
    },
    {
      value: "Hybrid",
      title: "Hybrid",
      description:
        "Position that allows for a combination of remote and in-office work.",
    },
    {
      value: "On-Site",
      title: "On-Site",
      description:
        "Position that requires the employee to work from a physical office location.",
    },
  ];

  const types = [
    {
      value: "Full-Time",
      title: "Full-Time",
      description: "Full-Time position ",
    },
    {
      value: "Internship",
      title: "Internship",
      description: "Position for students and graduates to gain experience",
    },
    {
      value: "Part-Time",
      title: "Part-Time",
      description: "Position with reduced hours",
    },
    {
      value: "Freelance",
      title: "Freelance",
      description: "Contract-based position where the worker is self-employed.",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <FormItem className="flex flex-col gap-6">
        <div>
          <h1 className="text-initial-black">
            Specify the desired candidate experience level
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {levels.map(({ value, title, description }) => (
            <div key={value}>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Radio
                    {...field}
                    id={value}
                    value={value}
                    variant="default"
                    label={title}
                  />
                )}
              />
              <FormInfo variant="default" className="py-3">
                {description}
              </FormInfo>
            </div>
          ))}
        </div>
        {formState.errors.level && (
          <FormInfo variant="danger">{formState.errors.level.message}</FormInfo>
        )}
      </FormItem>
      <FormItem className="flex flex-col gap-6">
        <div>
          <h1 className="text-initial-black">Specify the job position</h1>
        </div>
        <div className="flex flex-col gap-4">
          {positions.map(({ value, title, description }) => (
            <div key={value}>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <Radio
                    {...field}
                    id={value}
                    value={value}
                    variant="default"
                    label={title}
                  />
                )}
              />
              <FormInfo variant="default" className="py-3">
                {description}
              </FormInfo>
            </div>
          ))}
        </div>
        {formState.errors.position && (
          <FormInfo variant="danger">
            {formState.errors.position.message}
          </FormInfo>
        )}
      </FormItem>
      <FormItem className="flex flex-col gap-6">
        <div>
          <h1 className="text-initial-black">
            Specify the desired type for this job
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {types.map(({ value, title, description }) => (
            <div key={value}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Radio
                    {...field}
                    id={value}
                    value={value}
                    variant="default"
                    label={title}
                  />
                )}
              />
              <FormInfo variant="default" className="py-3">
                {description}
              </FormInfo>
            </div>
          ))}
        </div>
        {formState.errors.type && (
          <FormInfo variant="danger">{formState.errors.type.message}</FormInfo>
        )}
      </FormItem>
    </div>
  );
};

export { Scope };
