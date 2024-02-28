"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

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
      } else if (!AuthRolesProtected.includes(userType!)) {
        router.push("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default Protected;
