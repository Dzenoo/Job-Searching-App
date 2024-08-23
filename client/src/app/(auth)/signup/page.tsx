"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import ChooseSignup from "@/components/auth/signup/ChooseSignup";

const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuthentication().getCookieHandler();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseSignup />
    </section>
  );
};

export default SignupPage;
