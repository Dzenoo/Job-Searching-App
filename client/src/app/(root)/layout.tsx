import type { Metadata } from "next";
import { QueryContextProvider } from "@/contexts/react-query-client";
import { Poppins } from "next/font/google";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Root/Navbar/Navbar"), {
  ssr: false,
});

import "../globals.css";
import Footer from "@/components/Root/Footer/Footer";

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
          <main className="base-margin h-screen">{children}</main>
          <Footer />
        </body>
      </html>
    </QueryContextProvider>
  );
}
