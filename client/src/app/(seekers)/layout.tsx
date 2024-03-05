import type { Metadata } from "next";
import { QueryContextProvider } from "@/contexts/react-query-client";
import { ToastContainer } from "react-toastify";
import { Poppins } from "next/font/google";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/Root/Navbar/Navbar";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

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
