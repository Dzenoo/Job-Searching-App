import dynamic from "next/dynamic";
import AppThemeProvider from "@/contexts/app-theme-provider";
import { QueryContextProvider } from "@/contexts/react-query-client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/layout/footer/Footer";

export const metadata: Metadata = {
  title: "Job Talentify Platform",
  description:
    "Find your dream job with ease using Job Talentify Platform. Discover events, read employer reviews, and stay informed with our intuitive platform. Start your job search journey today!",
};

const inter = Inter({ subsets: ["latin"] });

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
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}
