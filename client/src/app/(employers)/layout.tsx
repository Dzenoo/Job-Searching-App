import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Libre_Franklin } from "next/font/google";

import AppThemeProvider from "@/context/app-theme-provider";
import { QueryContextProvider } from "@/context/react-query-client";

import Footer from "@/components/layout/footer/Footer";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";
import EmployersLayout from "@/components/employers/layout/EmployersLayout";

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/logo-icon-dark.png",
        href: "/images/logo-icon-dark.png",
      },
    ],
  },
  title: "Jobernify",
  description:
    "Explore candidates with ease using Jobernify. Find various developers, and stay informed with our intuitive platform. Start your candidate search journey today!",
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
              <Navbar href="/seekers" />
              <EmployersLayout children={children} />
              <Footer />
            </div>
            <Toaster />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}
