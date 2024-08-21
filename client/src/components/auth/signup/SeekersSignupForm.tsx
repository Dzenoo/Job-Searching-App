import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import zod from "zod";
import Link from "next/link";
import { SeekerRegistrationSchemas } from "@/lib/zod/auth";
import { signupSeeker } from "@/lib/actions/auth.actions";
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

type SeekersSignupFormTypes = {
  handleTypeSelection: (type: TypeOfAccount) => void;
};

const SeekersSignupForm: React.FC<SeekersSignupFormTypes> = ({
  handleTypeSelection,
}) => {
  const form = useForm<zod.infer<typeof SeekerRegistrationSchemas>>({
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
      form.reset();
      redirect("/login");
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center gap-3 max-[600px]:flex-wrap">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                    <FormDescription>This is your first name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormDescription>This is your last name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormDescription>This is your email</FormDescription>
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

export default SeekersSignupForm;
