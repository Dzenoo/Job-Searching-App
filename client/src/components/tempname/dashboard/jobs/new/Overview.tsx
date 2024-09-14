"use client";

import React from "react";
import { Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type OverviewProps = {
  control: Control<any>;
};

const Overview: React.FC<OverviewProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a detailed description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide a detailed description of the job responsibilities, expectations, and any special requirements."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a comprehensive description between 30 to 600 characters.
              Include details about the role's responsibilities, qualifications,
              and any special requirements to give candidates a clear
              understanding of what the job entails.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="expiration_date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Add expiration date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value as any}
                  onSelect={field.onChange}
                  disabled={
                    (date) => date < new Date() // Disable dates before today
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select the date when the job posting will close. Applications will
              not be accepted after this date. Ensure you choose a date that is
              today or in the future.
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
            <FormLabel>What is the salary for this job?</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter the salary amount (e.g., 50000)"
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Specify the salary for the job in USD. Ensure it is a positive
              number, and the minimum should be $30,000.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Overview;
