import type { Metadata } from "next";
import { QueryContextProvider } from "@/context/react-query-client";
import { ToastContainer } from "react-toastify";
import { Libre_Franklin } from "next/font/google";
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"), {
  ssr: false,
});

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import AppThemeProvider from "@/context/app-theme-provider";
import Footer from "@/components/layout/footer/Footer";

const MobileBar = dynamic(() => import("@/components/layout/navbar/Mobile"), {
  ssr: false,
});

const inter = Libre_Franklin({ subsets: ["latin"], weight: "400" });

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
      <html suppressHydrationWarning={true} lang="en">
        <body className={inter.className}>
          <AppThemeProvider>
            <Navbar />
            <main className="base-margin">{children}</main>
            <Footer />
            <ToastContainer />
            <MobileBar />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}
