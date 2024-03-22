"use client";

import React from "react";
import { NavbarLinksList } from "../List";
import { usePathname } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import { EmployersNavbarLinks, SeekersNavbarLinks } from "@/constants/navbar";

const MobileBar: React.FC = () => {
  const { isAuthenticated, userType } = useAuthentication().getCookieHandler();
  const pathname = usePathname();
  const isSeeker = userType === "seeker";

  if (!isAuthenticated) return null;

  return (
    <div className="xl:hidden bg-white border-t border-gray-100 p-6 sticky bottom-0 max-xl:flex items-center justify-center">
      <NavbarLinksList
        pathname={pathname}
        data={isSeeker ? SeekersNavbarLinks : EmployersNavbarLinks}
      />
    </div>
  );
};

export default MobileBar;
