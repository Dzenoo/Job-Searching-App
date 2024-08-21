"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control } from "react-hook-form";

type OverviewProps = {
  control: Control<any>;
};

const Overview: React.FC<OverviewProps> = ({ control }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a detailed description</FormLabel>
            <FormControl>
              <Input placeholder="Senior Software Engineer" {...field} />
            </FormControl>
            <FormDescription>
              This is comprehensive description about job
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="expiration_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Add expiration date</FormLabel>
            <FormControl>
              <Input placeholder="Senior Software Engineer" {...field} />
            </FormControl>
            <FormDescription>
              Applications will not be accepted after this specified date.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What salary is for this job?</FormLabel>
            <FormControl>
              <Input placeholder="Senior Software Engineer" {...field} />
            </FormControl>
            <FormDescription>Specify the salary for the job</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Overview;
