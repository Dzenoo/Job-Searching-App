import React from "react";
import { ChooseTypeAccount } from "@/components/Auth/Signup/ChooseTypeAccount";

const SignupPage: React.FC = () => {
  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseTypeAccount />
    </section>
  );
};

export default SignupPage;