import React from "react";
import { useForm, Controller } from "react-hook-form";
import { EmployersRegistrationSchemas } from "@/utils/validation";
import { Button } from "@/components/shared/Button";
import { Form, FormInfo, FormItem } from "@/components/shared/Forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shared/Input";
import { EmployersSignupFormTypes } from "./types";
import { TypeOfAccount } from "../ChooseTypeAccount/types";
import { Select } from "@/components/shared/Select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shared/Card/card";
import zod from "zod";
import Link from "next/link";
import { industries } from "@/constants/industries";
import { companySizes } from "@/constants/company-sizes-types";

const EmployersSignupForm: React.FC<EmployersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const {
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

  const onSubmit = (
    values: zod.infer<typeof EmployersRegistrationSchemas>
  ) => {};

  return (
    <Card className="flex flex-col gap-7 py-6 w-[600px]">
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
          <div className="flex items-center gap-3">
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

export default EmployersSignupForm;
