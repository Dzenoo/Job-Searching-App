"use client";

import React from "react";
import { ChooseLoginType } from "@/components/Auth/Login/ChooseLoginType";
import Protected from "@/components/Hoc/Protected";

const LoginPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseLoginType />
    </section>
  );
};

export default Protected(LoginPage, []);
