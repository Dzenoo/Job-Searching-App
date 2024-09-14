import { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import dynamic from "next/dynamic";
import { QueryContextProvider } from "@/context/react-query-client";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";

// Dynamically imported components
const Navbar = dynamic(() => import("@/components/tempname/navbar/Navbar"), {
  ssr: false,
});

// Font setup
const inter = Libre_Franklin({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Job Talentify Platform",
  description:
    "Find your dream job with ease using Job Talentify Platform. Read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!",
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
