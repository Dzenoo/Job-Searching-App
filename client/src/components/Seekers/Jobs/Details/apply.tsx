import { Button } from "@/components/Shared/Button";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import zod from "zod";
import { ClipLoader } from "react-spinners";
import { ApplyToJobSchemas } from "@/utils/validation";
import { addCoverLetter, applyToJob } from "@/utils/actions";
import { Textarea } from "@/components/Shared/Textarea";
import { queryClient } from "@/contexts/react-query-client";
import useUploads from "@/hooks/useUploads";

type ApplyToJobProps = {
  jobId: string;
  token: string;
};

const ApplyToJob: React.FC<ApplyToJobProps> = ({ jobId, token }) => {
  const { getInputProps, getRootProps, selectedFile } = useUploads({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<zod.infer<typeof ApplyToJobSchemas>>({
    resolver: zodResolver(ApplyToJobSchemas),
    defaultValues: {
      coverLetter: "",
    },
  });

  const { mutateAsync: applyToJobMutate } = useMutation({
    mutationFn: (formData: FormData) => applyToJob(jobId, token, formData),
    onSuccess: () => {
      reset();
      toast.success("Successfully Applied to Job");
      queryClient.invalidateQueries(["jobs"]);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const { mutateAsync: coverLetterJob, isLoading: coverLetterLoading } =
    useMutation({
      mutationFn: () => addCoverLetter(jobId, token),
      onSuccess: (response: any) => {
        setValue("coverLetter", response.cover_letter);
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem className="w-full">
            <div
              {...getRootProps()}
              className="border-4 border-dashed border-gray-300 rounded-md p-4 cursor-pointer transition-colors hover:border-blue-600 h-40 flex items-center justify-center"
            >
              <input {...getInputProps()} />
              {selectedFile ? (
                <p>{selectedFile.name}</p>
              ) : (
                <p>
                  Drag 'n' drop your resume file here, or click to select a file
                </p>
              )}
            </div>
          </FormItem>
          <FormItem className="w-full">
            <Controller
              name="coverLetter"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Cover Letter (optional)"
                  type="text"
                  placeholder="Cover Letter"
                  value={field.value}
                  action={
                    <Button
                      variant="outlined"
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
                  }
                />
              )}
            />
            {errors.coverLetter?.message && (
              <FormInfo variant="danger">{errors.coverLetter.message}</FormInfo>
            )}
          </FormItem>
          <div className="pt-7">
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting || !selectedFile}
              className="w-full"
            >
              {isSubmitting ? <ClipLoader color="#fff" /> : "Apply"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ApplyToJob;
