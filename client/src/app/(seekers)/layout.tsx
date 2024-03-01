import type { Metadata } from "next";
import { QueryContextProvider } from "@/contexts/react-query-client";
import { ToastContainer } from "react-toastify";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import Footer from "@/components/Root/Footer/Footer";

const Navbar = dynamic(() => import("@/components/Root/Navbar/Navbar"), {
  ssr: false,
});

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
