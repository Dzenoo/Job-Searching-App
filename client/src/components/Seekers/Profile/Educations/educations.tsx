import React, { Fragment, useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditableEducationsSchemas } from "@/lib/zod/seekers";
import { useMutation } from "react-query";
import { addNewEducation } from "@/lib/actions/seekers.actions";
import { toast } from "react-toastify";
import useAuthentication from "@/hooks/useAuthentication";
import { queryClient } from "@/context/react-query-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import EducationList from "./EducationList";
import { SeekerTypes } from "@/types";

type AddEducationsDialogProps = {
  closeDialog: () => void;
};

const AddEducationsDialog: React.FC<AddEducationsDialogProps> = ({
  closeDialog,
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const form = useForm<zod.infer<typeof EditableEducationsSchemas>>({
    resolver: zodResolver(EditableEducationsSchemas),
    defaultValues: {
      graduationDate: "",
      institution: "",
      degree: "",
      fieldOfStudy: "",
    },
  });

  const { mutateAsync: addNewEducationMutate } = useMutation({
    mutationFn: (formData: any) => addNewEducation(formData, token!),
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(["profile"]);
      closeDialog();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
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
                  <FormItem>
                    <FormLabel>Graduation Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pick the date"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Select your graduation date
                    </FormDescription>
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
                    <FormDescription>
                      Specify your field of study
                    </FormDescription>
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
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                className="w-full"
              >
                {form.formState.isSubmitting ? (
                  <ClipLoader color="#fff" />
                ) : (
                  "Add"
                )}
              </Button>
            </CardFooter>
          </Card>
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
      <Dialog open={isDialogOpen}>
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
              <Plus />
              <span className="hidden max-lg:inline">Add New Education</span>
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
