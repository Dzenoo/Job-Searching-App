import React from "react";
import { DetailsProps } from "./types";
import { FormInfo, FormItem } from "@/components/Shared/Forms";
import { Controller } from "react-hook-form";
import { Input } from "@/components/Shared/Input";
import { Select } from "@/components/Shared/Select";
import { Textarea } from "@/components/Shared/Textarea";

const Details: React.FC<DetailsProps> = ({ formState, control }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormItem>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Senior Software Engineer"
              label="Write a title for your job post"
              {...field}
            />
          )}
        />
        {formState.errors.title?.message && (
          <FormInfo variant="danger">{formState.errors.title.message}</FormInfo>
        )}
        <FormInfo variant="default">Ensure your job title is concise</FormInfo>
      </FormItem>
      <FormItem>
        <Controller
          name="overview"
          control={control}
          render={({ field }) => (
            <Textarea
              placeholder=""
              label="Write a brief overview about this job"
              {...field}
            />
          )}
        />
        {formState.errors.overview?.message && (
          <FormInfo variant="danger">
            {formState.errors.overview.message}
          </FormInfo>
        )}
        <FormInfo variant="default">Provide a brief overview</FormInfo>
      </FormItem>
      <FormItem>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Select
              options={[
                { label: "Select Location", value: "" },
                { label: "Australia", value: "aus" },
                { label: "England", value: "eng" },
                { label: "Turkiye", value: "tur" },
                { label: "Germany", value: "ger" },
                { label: "Spain", value: "spa" },
                { label: "France", value: "fra" },
              ]}
              label="Write a location for your job post"
              {...field}
            />
          )}
        />
        {formState.errors.location?.message && (
          <FormInfo variant="danger">
            {formState.errors.location.message}
          </FormInfo>
        )}
        <FormInfo variant="default">
          A clear location enhances the visibility of your job post in search
          results.
        </FormInfo>
      </FormItem>
    </div>
  );
};

export { Details };
