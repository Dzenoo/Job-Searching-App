"use client";

import React, { useEffect } from "react";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import { redirect } from "next/navigation";

const Protected = (
  WrappedComponent: React.FC<any>,
  AuthRolesProtected: string[]
) => {
  const Wrapper = (props: any) => {
    const { token, userType } = useAuthentication().getCookieHandler();

    useEffect(() => {
      if (!token) {
        redirect("/login");
      } else if (!AuthRolesProtected.includes(userType || "")) {
        if (userType === "employer") {
          redirect("/seekers");
        } else {
          redirect("/");
        }
      }
    }, [token, userType]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default Protected;
