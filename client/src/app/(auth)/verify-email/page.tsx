"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const router = useRouter();
  const { token, type } = searchParams;
  const [verificationStatus, setVerificationStatus] = useState("pending");

  useEffect(() => {
    if (token) {
      setVerificationStatus("verifying");
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${type}/verify-email?token=${token}`
        )
        .then(() => {
          setVerificationStatus("success");
          setTimeout(() => router.push("/login"), 2500);
        })
        .catch((error) => {
          console.error("Verification error:", error);
          // setVerificationStatus("error");
        });
    }
  }, [token, type, router]);

  const renderMessage = () => {
    switch (verificationStatus) {
      case "pending":
        return "Preparing to verify your email...";
      case "verifying":
        return "Verifying your email...";
      case "success":
        return "Email verified successfully! Redirecting to login...";
      case "error":
        return "Error verifying email. Please try again or contact support.";
      default:
        return "Verifying your email...";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-lg">{renderMessage()}</h1>
    </div>
  );
};

export default VerifyEmail;
