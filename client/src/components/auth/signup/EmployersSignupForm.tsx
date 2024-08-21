import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import zod from "zod";
import Link from "next/link";
import { EmployersRegistrationSchemas } from "@/lib/zod/auth";
import { signupEmployer } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TypeOfAccount } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

type EmployersSignupFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const EmployersSignupForm: React.FC<EmployersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const form = useForm<zod.infer<typeof EmployersRegistrationSchemas>>({
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
      form.reset();
      redirect("/login");
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Of Company</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormDescription>This is your first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Number" />
                  </FormControl>
                  <FormDescription>This is your first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormDescription>This is your first name</FormDescription>
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
                    <Input {...field} placeholder="Password" />
                  </FormControl>
                  <FormDescription>This is your first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 max-[400px]:flex-wrap">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Industry" />
                    </FormControl>
                    <FormDescription>This is your first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Of Company</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Size" />
                    </FormControl>
                    <FormDescription>This is your first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormDescription>This is your first name</FormDescription>
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
                {form.formState.isSubmitting ? (
                  <ClipLoader color="#fff" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
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
