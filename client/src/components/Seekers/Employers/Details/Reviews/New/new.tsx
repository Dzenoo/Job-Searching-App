import React from "react";
import { Card, CardContent } from "@/components/Shared/Card";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/Shared/Input";
import { Button } from "@/components/Shared/Button";
import { ClipLoader } from "react-spinners";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import useAuthentication from "@/hooks/useAuthentication";
import { Select } from "@/components/Shared/Select";
import { Textarea } from "@/components/Shared/Textarea";
import { Tag } from "@/components/Shared/Tag";
import { redirect } from "next/navigation";
import { ReviewCompanyFormProps } from "./types";
import { ReviewEmployersSchemas } from "@/utils/zod/reviews";
import { reviewEmployer } from "@/utils/actions/reviews";

const ReviewCompanyForm: React.FC<ReviewCompanyFormProps> = ({
  employerId,
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<zod.infer<typeof ReviewEmployersSchemas>>({
    resolver: zodResolver(ReviewEmployersSchemas),
    defaultValues: {
      job_position: "",
      time: "4-7",
      type: "Internship",
      technologies: [],
      positiveReview: "",
      negativeReview: "",
    },
  });

  const { mutateAsync: reviewEmployerMutate } = useMutation({
    mutationFn: (formData: any) => reviewEmployer(employerId, token!, formData),
    onSuccess: () => {
      redirect(`/companies/${employerId}?typeEmp=reviews`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = async (
    reviewData: zod.infer<typeof ReviewEmployersSchemas>
  ) => {
    await reviewEmployerMutate(reviewData);
  };

  const onSelectTechnology = (technologies: any) => {
    setValue("technologies", technologies);
  };

  return (
    <Card>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <div>
              <h1 className="text-initial-gray">
                Basic Information about employer
              </h1>
            </div>
            <FormItem>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Freelance", label: "Freelance" },
                      { value: "Part-Time", label: "Part-Time" },
                      { value: "Full-Time", label: "Full-Time" },
                      { value: "Internship", label: "Internship" },
                    ]}
                    label="Time"
                  />
                )}
              />
              {errors.type?.message && (
                <FormInfo variant="danger">{errors.type.message}</FormInfo>
              )}
              <FormInfo variant="default">
                Specify the type of employment (e.g., full-time, part-time,
                contract, internship).
              </FormInfo>
            </FormItem>
            <FormItem>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Less than 1", label: "Less than 1" },
                      { value: "1-2", label: "1-2" },
                      { value: "2-4", label: "2-4" },
                      { value: "4-7", label: "4-7" },
                      { value: "7-10", label: "7-10" },
                      { value: "10 or greater", label: "10 or greater" },
                    ]}
                    label="Time of employment"
                  />
                )}
              />
              {errors.time?.message && (
                <FormInfo variant="danger">{errors.time.message}</FormInfo>
              )}
              <FormInfo variant="default">
                Describe the typical time for the job (e.g., 9-6)
              </FormInfo>
            </FormItem>
            <FormItem>
              <Controller
                name="job_position"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Senior Software Engineer"
                    label="Job Position"
                  />
                )}
              />
              {errors.job_position?.message && (
                <FormInfo variant="danger">
                  {errors.job_position.message}
                </FormInfo>
              )}
              <FormInfo variant="default">
                Specify the job position (e.g., software engineer, project
                manager, marketing specialist).
              </FormInfo>
            </FormItem>
          </div>
          <div>
            <div>
              <h1 className="text-initial-gray">Experience Of Job</h1>
            </div>
            <FormItem>
              <Controller
                name="positiveReview"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Positive Review" />
                )}
              />
              {errors.positiveReview?.message && (
                <FormInfo variant="danger">
                  {errors.positiveReview.message}
                </FormInfo>
              )}
              <FormInfo variant="default">
                Mention positive aspects of the job or company.
              </FormInfo>
            </FormItem>
            <FormItem>
              <Controller
                name="negativeReview"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} label="Negative Review" />
                )}
              />
              {errors.negativeReview?.message && (
                <FormInfo variant="danger">
                  {errors.negativeReview.message}
                </FormInfo>
              )}
              <FormInfo variant="default">
                Mention any negative aspects or areas for improvement.
              </FormInfo>
            </FormItem>
            <FormItem>
              <Controller
                name="technologies"
                control={control}
                render={({ field }) => (
                  <Tag
                    options={[
                      { label: "React.js", value: "React.js" },
                      { label: "Node.js", value: "Node.js" },
                      { label: "Express.js", value: "Express.js" },
                      { label: "MongoDB", value: "MongoDB" },
                    ]}
                    {...field}
                    label="Technologies"
                    placeholder="Select Technologies"
                    onSelect={onSelectTechnology}
                  />
                )}
              />
              {errors.technologies?.message && (
                <FormInfo variant="danger">
                  {errors.technologies.message}
                </FormInfo>
              )}
              <FormInfo variant="default">
                List the technologies used in the job or company.
              </FormInfo>
            </FormItem>
          </div>
          <div className="pt-7 flex justify-end">
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting}
              className="px-10"
            >
              {isSubmitting ? <ClipLoader /> : "Review"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export { ReviewCompanyForm };
