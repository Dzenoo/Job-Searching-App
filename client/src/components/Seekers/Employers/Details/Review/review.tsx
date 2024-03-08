import React from "react";
import { ReviewCompanyFormProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/Shared/Input";
import { Button } from "@/components/Shared/Button";
import { ClipLoader } from "react-spinners";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { ReviewEmployersSchemas } from "@/utils/validation";
import { toast } from "react-toastify";

const ReviewCompanyForm: React.FC<ReviewCompanyFormProps> = () => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
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

  const { mutateAsync: loginToAccount } = useMutation({
    mutationFn: loginUserAccount,
    onSuccess: (data: any) => {
      reset();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (
    reviewData: zod.infer<typeof ReviewEmployersSchemas>
  ) => {};

  return (
    <Card>
      <CardHeader>
        <div>
          <h1 className="text-initial-gray">
            Basic Information about employer
          </h1>
        </div>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  type="email"
                  placeholder="Email"
                />
              )}
            />
            {errors.email?.message && (
              <FormInfo variant="danger">{errors.email.message}</FormInfo>
            )}
          </FormItem>
          <FormItem>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Password"
                  type="password"
                  placeholder="Password"
                />
              )}
            />
            {errors.password?.message && (
              <FormInfo variant="danger">{errors.password.message}</FormInfo>
            )}
          </FormItem>
          <div className="pt-7">
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting}
              className="m-auto block relative px-10"
            >
              {isSubmitting ? <ClipLoader /> : "Login"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export { ReviewCompanyForm };
