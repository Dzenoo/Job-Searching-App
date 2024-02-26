import React from "react";
import { useForm, Controller } from "react-hook-form";
import { SeekerRegistrationSchemas } from "@/utils/validation";
import { Button } from "@/components/shared/Button";
import { Form, FormInfo, FormItem } from "@/components/shared/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shared/Input";
import { SeekersSignupFormTypes } from "./types";
import { TypeOfAccount } from "../ChooseTypeAccount/types";
import { useMutation } from "react-query";
import { signupSeeker } from "@/utils/actions";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shared/Card/card";
import zod from "zod";
import Link from "next/link";

const SeekersSignupForm: React.FC<SeekersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<zod.infer<typeof SeekerRegistrationSchemas>>({
    resolver: zodResolver(SeekerRegistrationSchemas),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signupSeekerMutation } = useMutation({
    mutationFn: signupSeeker,
    onSuccess: () => {
      reset();
      window.location.href = "/login";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (
    values: zod.infer<typeof SeekerRegistrationSchemas>
  ) => {
    await signupSeekerMutation(values);
  };

  return (
    <Card className="flex flex-col gap-7 py-6">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Hiring a talent?{" "}
              <button
                className="text-[--blue-base-color] font-bold"
                onClick={() => handleTypeSelection(TypeOfAccount.Employer)}
              >
                Employer
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-base-black">Sign up to find job you want</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3 max-[600px]:flex-wrap">
            <FormItem className="w-full">
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                  />
                )}
              />
              {errors.first_name?.message && (
                <FormInfo variant="danger">
                  {errors.first_name.message}
                </FormInfo>
              )}
            </FormItem>
            <FormItem className="w-full">
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                  />
                )}
              />
              {errors.last_name?.message && (
                <FormInfo variant="danger">{errors.last_name.message}</FormInfo>
              )}
            </FormItem>
          </div>
          <FormItem className="w-full">
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-initial-gray relative text-center">
          Already have account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export { SeekersSignupForm };
