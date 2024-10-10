"use client";

import React, { useEffect } from "react";
import useAuthentication from "@/hooks/defaults/useAuthentication";
import { useRouter } from "next/navigation";

const Protected = (
  WrappedComponent: React.FC<any>,
  AuthRolesProtected: string[]
) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { token, userType } = useAuthentication().getCookieHandler();

    useEffect(() => {
      if (!token) {
        router.push("/login");
      } else if (!AuthRolesProtected.includes(userType || "")) {
        if (userType === "employer") {
          router.push("/seekers");
        } else {
          router.push("/");
        }
      }
    }, [token, userType]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default Protected;
