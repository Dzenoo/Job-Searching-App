import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Shared/Input";
import { EmployersSignupFormTypes } from "./types";
import { TypeOfAccount } from "../ChooseTypeAccount/types";
import { Select } from "@/components/Shared/Select";
import { industries } from "@/constants/industries";
import { companySizes } from "@/constants/company-sizes-types";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card/card";
import zod from "zod";
import Link from "next/link";
import { EmployersRegistrationSchemas } from "@/lib/zod/auth";
import { signupEmployer } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";

const EmployersSignupForm: React.FC<EmployersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<zod.infer<typeof EmployersRegistrationSchemas>>({
    resolver: zodResolver(EmployersRegistrationSchemas),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      industry: "",
      size: "",
      address: "",
      number: "",
    },
  });

  const { mutateAsync: signupEmployerMutation } = useMutation({
    mutationFn: signupEmployer,
    onSuccess: () => {
      reset();
      window.location.href = "/login";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (
    values: zod.infer<typeof EmployersRegistrationSchemas>
  ) => {
    await signupEmployerMutation(values);
  };

  return (
    <Card className="flex flex-col gap-7 py-6 lg:w-[600px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Looking for a job?{" "}
              <button
                className="text-[--blue-base-color] font-bold"
                onClick={() => handleTypeSelection(TypeOfAccount.Seeker)}
              >
                Seeker
              </button>
            </p>
          </div>
          <div>
            <h1 className="text-base-black">Sign up to hire a talent</h1>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name Of Company"
                  type="text"
                  placeholder="Name"
                />
              )}
            />
            {errors.name?.message && (
              <FormInfo variant="danger">{errors.name.message}</FormInfo>
            )}
          </FormItem>
          <FormItem>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Number"
                  type="text"
                  placeholder="Number"
                />
              )}
            />
            {errors.number?.message && (
              <FormInfo variant="danger">{errors.number.message}</FormInfo>
            )}
          </FormItem>
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
          <div className="flex items-center gap-3 max-[400px]:flex-wrap">
            <FormItem className="w-full">
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={industries} label="Industry" />
                )}
              />
              {errors.industry?.message && (
                <FormInfo variant="danger">{errors.industry.message}</FormInfo>
              )}
            </FormItem>
            <FormItem className="w-full">
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <Select {...field} options={companySizes} label="Size" />
                )}
              />
              {errors.size?.message && (
                <FormInfo variant="danger">{errors.size.message}</FormInfo>
              )}
            </FormItem>
          </div>
          <FormItem>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  type="text"
                  placeholder="Address"
                />
              )}
            />
            {errors.address?.message && (
              <FormInfo variant="danger">{errors.address.message}</FormInfo>
            )}
          </FormItem>
          <div className="pt-7">
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting}
              className="m-auto block relative px-10"
            >
              {isSubmitting ? <ClipLoader color="#fff" /> : "Register"}
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

export { EmployersSignupForm };
