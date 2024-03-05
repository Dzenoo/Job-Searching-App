"use client";

import React from "react";
import { ChooseTypeAccount } from "@/components/Auth/Signup/ChooseTypeAccount";
import Protected from "@/components/Hoc/Protected";

const SignupPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseTypeAccount />
    </section>
  );
};

export default Protected(SignupPage, []);
