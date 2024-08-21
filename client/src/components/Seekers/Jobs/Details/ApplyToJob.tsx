import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import zod from "zod";
import { ClipLoader } from "react-spinners";
import { queryClient } from "@/context/react-query-client";
import useUploads from "@/hooks/useUploads";
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
import { Textarea } from "@/components/ui/textarea";

type ApplyToJobProps = {
  jobId: string;
  token: string;
  closeDialog: (dialogId: string) => void;
};

const ApplyToJob: React.FC<ApplyToJobProps> = ({
  closeDialog,
  jobId,
  token,
}) => {
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
      toast.success("Successfully Applied to Job");
      queryClient.invalidateQueries(["job", { jobId }]);
      queryClient.invalidateQueries(["profile"]);
      queryClient.invalidateQueries(["jobs"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const { mutateAsync: coverLetterJob, isLoading: coverLetterLoading } =
    useMutation({
      mutationFn: () => addCoverLetter(jobId, token),
      onSuccess: (response) => {
        form.setValue("coverLetter", response.cover_letter);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });

  const onSubmit = async (values: zod.infer<typeof ApplyToJobSchemas>) => {
    if (!selectedFile) {
      toast.error("Please select a resume file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    if (values.coverLetter) {
      formData.set("coverLetter", values.coverLetter);
    }

    await applyToJobMutate(formData);

    closeDialog("applyToJob");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-lg">
        <div className="flex flex-col gap-3 items-center justify-center text-center">
          <div>
            <h1 className="text-base-black">Apply to job</h1>
          </div>
          <div>
            <p className="text-initial-gray">
              Ready to take the next step? Apply for this job opportunity by
              uploading resume and cover letter. Your information will be sent
              directly to the employer for consideration. Good luck!
            </p>
          </div>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Textarea placeholder="Cover Letter" {...field} />
                    <Button
                      variant="outline"
                      onClick={async () => await coverLetterJob()}
                      type="button"
                      disabled={coverLetterLoading}
                    >
                      {coverLetterLoading ? (
                        <ClipLoader color="blue" />
                      ) : (
                        "Generate By Ai"
                      )}
                    </Button>
                  </FormControl>
                  <FormDescription>This is your public email</FormDescription>
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
      </div>
    </div>
  );
};

export default ApplyToJob;
