import React from "react";

import "../../globals.css";
import "react-toastify/dist/ReactToastify.css";

import EmployersDashboardNavbar from "@/components/employers/dashboard/navbar/EmployersDashboardNavbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div>
        <EmployersDashboardNavbar />
      </div>
      <div className="basis-full p-6 overflow-hidden">{children}</div>
    </div>
  );
};

export default DashboardLayout;
