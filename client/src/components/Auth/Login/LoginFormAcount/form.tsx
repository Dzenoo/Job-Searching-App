import React from "react";
import { Button } from "@/components/Shared/Button";
import { Form, FormInfo, FormItem } from "@/components/Shared/Forms";
import { Input } from "@/components/Shared/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoginFormTypes } from "./types";
import { TypeOfAccount } from "../../Signup/ChooseTypeAccount/types";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card/card";
import Link from "next/link";
import zod from "zod";
import useAuthentication from "@/hooks/useAuthentication";
import { loginUserAccount } from "@/utils/actions/auth";
import { LoginSchemasForm } from "@/utils/zod/auth";

const LoginFormAccount: React.FC<LoginFormTypes> = ({
  handleTypeSelection,
  type,
}) => {
  const { storeCookieHandler } = useAuthentication();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<zod.infer<typeof LoginSchemasForm>>({
    resolver: zodResolver(LoginSchemasForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginToAccount } = useMutation({
    mutationFn: loginUserAccount,
    onSuccess: (data) => {
      reset();
      storeCookieHandler(data.token);
      window.location.href = "/";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (loginData: zod.infer<typeof LoginSchemasForm>) => {
    await loginToAccount({ type, loginData });
  };

  return (
    <Card className="flex flex-col gap-7 py-6 lg:w-[430px]">
      <CardHeader>
        <div className="flex items-center justify-center gap-3 flex-col">
          <div>
            <p className="text-low-gray">
              Login to{" "}
              <button
                className={`text-[--blue-base-color] ${
                  type === TypeOfAccount.Seeker && "font-bold"
                }`}
                onClick={() => handleTypeSelection(TypeOfAccount.Seeker)}
              >
                Seeker
              </button>{" "}
              or{" "}
              <button
                className={`text-[--blue-base-color] ${
                  type === TypeOfAccount.Employer && "font-bold"
                }`}
                onClick={() => handleTypeSelection(TypeOfAccount.Employer)}
              >
                Employer
              </button>{" "}
              Account
            </p>
          </div>
          <div>
            <h1 className="text-base-black">Login to JobTalentify</h1>
          </div>
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
      <CardFooter>
        <p className="text-initial-gray relative text-center">
          Dont have account?{" "}
          <Link href="/signup" className="text-blue-600 underline">
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export { LoginFormAccount };
