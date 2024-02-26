import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Root/Navbar";
import { QueryContextProvider } from "@/contexts/react-query-client";
import "../globals.css";

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
        </body>
      </html>
    </QueryContextProvider>
  );
}
