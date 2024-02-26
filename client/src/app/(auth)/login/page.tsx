import React from "react";
import { ChooseLoginType } from "@/components/Auth/Login/ChooseLoginType";

const LoginPage = () => {
  return (
    <section className="py-16 flex justify-center h-screen">
      <ChooseLoginType />
    </section>
  );
};

export default LoginPage;
