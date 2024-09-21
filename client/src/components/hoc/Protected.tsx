"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/defaults/useAuthentication";

const Protected = (
  WrappedComponent: React.FC<any>,
  AuthRolesProtected: string[]
) => {
  const Wrapper = (props: any) => {
    const { token, userType } = useAuthentication().getCookieHandler();
    const router = useRouter();

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
