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

  const isPendingVerification =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingVerification") === "true"
      : false;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    } else if (!isPendingVerification) {
      router.push("/login");
    }
  }, [isAuthenticated, isPendingVerification, router]);

  useEffect(() => {
    if (isPendingVerification) {
      localStorage.removeItem("pendingVerification");
    }
  }, [isPendingVerification]);

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
      <h1 className="text-lg">Verifying your email...</h1>
    </div>
  );
};

export default VerifyEmail;
