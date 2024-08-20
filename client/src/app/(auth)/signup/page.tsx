"use client";

import React from "react";
import { ChooseTypeAccount } from "@/components/Auth/Signup/ChooseTypeAccount";
import useAuthentication from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const { token } = useAuthentication().getCookieHandler();
  const router = useRouter();

  if (token) {
    router.push("/");
  }

  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseTypeAccount />
    </section>
  );
};

export default SignupPage;
