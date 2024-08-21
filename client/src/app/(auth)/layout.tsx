import { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryContextProvider } from "@/contexts/react-query-client";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"), {
  ssr: false,
});

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Talentify Platform",
  description:
    "Find your dream job with ease using Job Talentify Platform. Discover events, read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!",
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
          <ToastContainer />
        </body>
      </html>
    </QueryContextProvider>
  );
}
