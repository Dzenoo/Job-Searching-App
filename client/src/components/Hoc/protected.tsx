"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";

const Protected = (
  WrappedComponent: React.FC<any>,
  AuthRolesProtected: string[]
) => {
  const Wrapper = (props: any) => {
    const { token, userType } = useAuthentication().getCookieHandler();
    const router = useRouter();
    const pathname = usePathname();

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
    }, [token, userType, pathname, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default Protected;
