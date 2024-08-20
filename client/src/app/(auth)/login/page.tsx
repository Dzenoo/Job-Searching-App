"use client";

import React from "react";
import { ChooseLoginType } from "@/components/Auth/Login/ChooseLoginType";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const LoginPage: React.FC = () => {
  const { token } = useAuthentication().getCookieHandler();
  const router = useRouter();

  if (token) {
    router.push("/");
  }

  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseLoginType />
    </section>
  );
};

export default LoginPage;
