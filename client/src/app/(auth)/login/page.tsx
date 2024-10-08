"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import ChooseLogin from "@/components/auth/login/ChooseLogin";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthentication().getCookieHandler();
  const router = useRouter();

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <section className="py-16 flex justify-center">
      <ChooseLogin />
    </section>
  );
};

export default LoginPage;
