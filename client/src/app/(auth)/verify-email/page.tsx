"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/defaults/useAuthentication";

const VerifyEmail = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const router = useRouter();
  const { token, type } = searchParams;
  const { isAuthenticated } = useAuthentication().getCookieHandler();

  if (isAuthenticated) {
    router.push("/");
  }

  useEffect(() => {
    if (token) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/verify-email?token=${token}`
        )
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          console.error("Verification error:", error);
        });
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Verifying your email...</h1>
    </div>
  );
};

export default VerifyEmail;
