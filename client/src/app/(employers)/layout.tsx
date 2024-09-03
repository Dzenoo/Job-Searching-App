import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Libre_Franklin } from "next/font/google";

import AppThemeProvider from "@/context/app-theme-provider";
import { QueryContextProvider } from "@/context/react-query-client";

import Footer from "@/components/layout/footer/Footer";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";

const MobileBar = dynamic(() => import("@/components/layout/navbar/Mobile"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Job Talentify Platform",
  description:
    "Find your dream job with ease using Job Talentify Platform. Discover events, read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!",
};

const inter = Libre_Franklin({ subsets: ["latin"], weight: "400" });

const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryContextProvider>
      <html suppressHydrationWarning={true} lang="en">
        <body className={inter.className}>
          <AppThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <MobileBar />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}
