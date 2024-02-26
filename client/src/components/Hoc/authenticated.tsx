"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const Authenticated = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const { isAuthenticated } = useAuthentication().getCookieHandler();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.push("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default Authenticated;
