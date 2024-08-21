import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import zod from "zod";
import useAuthentication from "@/hooks/useAuthentication";
import { loginUserAccount } from "@/lib/actions/auth.actions";
import { LoginSchemasForm } from "@/lib/zod/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TypeOfAccount } from "@/types";

type LoginFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
  type: TypeOfAccount;
};

const LoginForm: React.FC<LoginFormTypes> = ({ handleTypeSelection, type }) => {
  const { storeCookieHandler } = useAuthentication();
  const form = useForm<zod.infer<typeof LoginSchemasForm>>({
    resolver: zodResolver(LoginSchemasForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginToAccount } = useMutation({
    mutationFn: loginUserAccount,
    onSuccess: (data) => {
      form.reset();
      storeCookieHandler(data.token);

      if (data.employer) {
        redirect("/seekers");
      } else {
        redirect("/");
      }
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>This is your public email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-7">
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting}
                className="m-auto block relative px-10"
              >
                {form.formState.isSubmitting ? <ClipLoader /> : "Login"}
              </Button>
            </div>
          </form>
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

export default LoginForm;
