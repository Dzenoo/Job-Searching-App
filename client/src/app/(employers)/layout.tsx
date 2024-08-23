import dynamic from "next/dynamic";
import AppThemeProvider from "@/context/app-theme-provider";
import { QueryContextProvider } from "@/context/react-query-client";
import { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/layout/footer/Footer";

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
            <ToastContainer />
          </AppThemeProvider>
        </body>
      </html>
    </QueryContextProvider>
  );
}
