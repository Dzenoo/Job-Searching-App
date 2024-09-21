import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { ClipLoader } from "react-spinners";

import { queryClient } from "@/context/react-query-client";
import useUploads from "@/hooks/defaults/useUploads";

import { ApplyToJobSchemas } from "@/lib/zod/jobs";
import { addCoverLetter, applyToJob } from "@/lib/actions/jobs.actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type ApplyToJobProps = {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  jobId: string;
  token: string;
};

const ApplyToJob: React.FC<ApplyToJobProps> = ({
  setDialogOpen,
  isDialogOpen,
  jobId,
  token,
}) => {
  const { toast } = useToast();
  const { getInputProps, getRootProps, selectedFile } = useUploads({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const form = useForm<zod.infer<typeof ApplyToJobSchemas>>({
    resolver: zodResolver(ApplyToJobSchemas),
    defaultValues: {
      coverLetter: "",
    },
  });

  const { mutateAsync: applyToJobMutate } = useMutation({
    mutationFn: (formData: FormData) => applyToJob(jobId, token, formData),
    onSuccess: () => {
      form.reset();
      toast({ title: "Success", description: "Successfully Applied to Job" });
      queryClient.invalidateQueries(["job", { jobId }]);
      queryClient.invalidateQueries(["profile"]);
      queryClient.invalidateQueries(["jobs"]);
      setDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response.data.message });
    },
  });

  const { mutateAsync: coverLetterJob, isLoading: coverLetterLoading } =
    useMutation({
      mutationFn: () => addCoverLetter(jobId, token),
      onSuccess: (response) => {
        form.setValue("coverLetter", response.cover_letter);
      },
      onError: (error: any) => {
        toast({ title: "Error", description: error.response.data.message });
      },
    });

  const onSubmit = async (values: zod.infer<typeof ApplyToJobSchemas>) => {
    if (!selectedFile) {
      toast({ title: "Error", description: "Please select a resume file" });

      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    if (values.coverLetter) {
      formData.set("coverLetter", values.coverLetter);
    }

    await applyToJobMutate(formData);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to Job</DialogTitle>
          <DialogDescription>
            Ready to take the next step? Apply for this job opportunity by
            uploading your resume and cover letter.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormItem>
              <div
                {...getRootProps()}
                className="border-4 border-dashed border-gray-300 rounded-md p-4 cursor-pointer transition-colors hover:border-blue-600 h-40 flex items-center justify-center"
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <p>{selectedFile.name}</p>
                ) : (
                  <p>
                    Drag 'n' drop your resume file here, or click to select a
                    file
                  </p>
                )}
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (optional)</FormLabel>
                  <FormControl>
                    <>
                      <Textarea
                        className="max-h-10"
                        placeholder="Cover Letter"
                        {...field}
                      />
                      {/* <Button
                        variant="outline"
                        onClick={async () => await coverLetterJob()}
                        type="button"
                        disabled={true}
                      >
                        {coverLetterLoading ? (
                          <ClipLoader color="blue" />
                        ) : (
                          "Generate By Ai"
                        )}
                      </Button> */}
                    </>
                  </FormControl>
                  <FormDescription>
                    Add a cover letter to strengthen your application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-7">
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting || !selectedFile}
                className="w-full"
              >
                {form.formState.isSubmitting ? (
                  <ClipLoader color="#fff" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyToJob;
