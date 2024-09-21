import { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import dynamic from "next/dynamic";
import { QueryContextProvider } from "@/context/react-query-client";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";

const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"), {
  ssr: false,
});

const inter = Libre_Franklin({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Jobernify",
  description:
    "Sign Up at Jobernfy and explore various of features that helps finding jobs and candidates easily.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </QueryContextProvider>
  );
}
