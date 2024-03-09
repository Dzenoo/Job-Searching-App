import type { Metadata } from "next";
import { QueryContextProvider } from "@/contexts/react-query-client";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Shared/Footer/Footer";
import { Inter } from "next/font/google";
const Navbar = dynamic(() => import("@/components/Layout/Navbar/Navbar"), {
  ssr: false,
});

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Talentify Platform",
  description:
    "Find your dream job with ease using Job Talentify Platform. Discover events, read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="base-margin">{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </QueryContextProvider>
  );
}
