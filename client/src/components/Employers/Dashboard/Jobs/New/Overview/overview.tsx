"use client";

import React from "react";
import { OverviewProps } from "./type";
import { FormInfo, FormItem } from "@/components/Shared/Forms";
import { Controller } from "react-hook-form";
import { Input } from "@/components/Shared/Input";
import { Textarea } from "@/components/Shared/Textarea";

const Overview: React.FC<OverviewProps> = ({ formState, control }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormItem>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              name="description"
              label="Write a detailed description"
              className="h-60"
            />
          )}
        />
        {formState.errors.description?.message && (
          <FormInfo variant="danger">
            {formState.errors.description.message}
          </FormInfo>
        )}
        <FormInfo variant="default">
          This is comprehensive description about job
        </FormInfo>
      </FormItem>
      <FormItem>
        <Controller
          name="expiration_date"
          control={control}
          render={({ field }) => (
            <Input type="date" {...field} label="Add expiration date" />
          )}
        />
        {formState.errors.expiration_date?.message && (
          <FormInfo variant="danger">
            {formState.errors.expiration_date.message}
          </FormInfo>
        )}
        <FormInfo variant="default">
          Applications will not be accepted after this specified date.
        </FormInfo>
      </FormItem>
      <FormItem>
        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              {...field}
              label="What salary is for this job?"
            />
          )}
        />
        {formState.errors.salary?.message && (
          <FormInfo variant="danger">
            {formState.errors.salary.message}
          </FormInfo>
        )}
        <FormInfo variant="default">Specify the salary for the job</FormInfo>
      </FormItem>
    </div>
  );
};

export { Overview };
