import { EmployersDashboardNavbar } from "@/components/Employers/Dashboard/Navbar";
import React from "react";
import "../../globals.css";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div>
        <EmployersDashboardNavbar />
      </div>
      <div className="basis-full p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
