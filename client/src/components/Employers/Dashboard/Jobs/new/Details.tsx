import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

type DetailsProps = {
  control: Control<any>;
};

const Details: React.FC<DetailsProps> = ({ control }) => {
  return (
    <div className="flex flex-col gap-3">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a title for your job post</FormLabel>
            <FormControl>
              <Input placeholder="Senior Software Engineer" {...field} />
            </FormControl>
            <FormDescription>Ensure your job title is concise</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="overview"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a brief overview about this job</FormLabel>
            <FormControl>
              <Textarea placeholder="" {...field} />
            </FormControl>
            <FormDescription>Provide a brief overview</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a location for your job post</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Locations</SelectLabel>
                    <SelectItem value="aus">Australia</SelectItem>
                    <SelectItem value="eng">England</SelectItem>
                    <SelectItem value="tur">Turkiye</SelectItem>
                    <SelectItem value="ger">Germany</SelectItem>
                    <SelectItem value="spa">Spain</SelectItem>
                    <SelectItem value="fra">France</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              A clear location enhances the visibility of your job post in
              search results.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Details;
