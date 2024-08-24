import React, { Fragment, useState } from "react";

import { CalendarIcon, Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

import { EditableEducationsSchemas } from "@/lib/zod/seekers";
import { addNewEducation } from "@/lib/actions/seekers.actions";
import useAuthentication from "@/hooks/useAuthentication";
import { queryClient } from "@/context/react-query-client";
import { cn } from "@/lib/utils";
import { SeekerTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import EducationList from "./EducationList";

type AddEducationsDialogProps = {
  closeDialog: () => void;
};

const AddEducationsDialog: React.FC<AddEducationsDialogProps> = ({
  closeDialog,
}) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const form = useForm<zod.infer<typeof EditableEducationsSchemas>>({
    resolver: zodResolver(EditableEducationsSchemas),
    defaultValues: {
      graduationDate: new Date(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
    },
  });

  const { mutateAsync: addNewEducationMutate } = useMutation({
    mutationFn: (formData: any) => addNewEducation(formData, token!),
    onSuccess: (response) => {
      toast({ title: "Success", description: response.message });
      queryClient.invalidateQueries(["profile"]);
      closeDialog();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "An error occurred",
      });
    },
  });

  console.log(form.getValues());

  const onSubmit = async (
    values: zod.infer<typeof EditableEducationsSchemas>
  ) => {
    await addNewEducationMutate(values);
  };

  return (
    <DialogContent className="sm:max-w-lg p-6">
      <DialogHeader>
        <DialogTitle>Add Education</DialogTitle>
        <div className="text-center mb-4">
          <p className="text-initial-gray">
            Add education to complete your profile. Employers can learn more
            about you and view if you're a good fit.
          </p>
        </div>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="Institution" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter the institution where you studied
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="graduationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Graduation Date</FormLabel>
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your graduation date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="Field of Study" {...field} />
                </FormControl>
                <FormDescription>Specify your field of study</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Degree" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the degree you obtained
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            className="w-full"
          >
            {form.formState.isSubmitting ? <ClipLoader color="#fff" /> : "Add"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

type EducationsProps = {
  seeker?: SeekerTypes;
};

const Educations: React.FC<EducationsProps> = ({ seeker }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Fragment>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AddEducationsDialog closeDialog={closeDialog} />
      </Dialog>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Education</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={openDialog}
            >
              <div className="max-lg:hidden">Add Education</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <EducationList educations={seeker?.education} />
        </div>
      </div>
    </Fragment>
  );
};

export default Educations;
