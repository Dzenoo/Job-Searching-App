"use client";

import React from "react";
import useAuthentication from "@/hooks/useAuthentication";
import Logo from "./Logo/logo";
import { LinkElement } from "@/components/Shared/Link";
import { usePathname } from "next/navigation";
import { NavbarLinksList } from "./List";
import {
  EmployersNavbarActions,
  EmployersNavbarLinks,
  SeekersNavbarActions,
  SeekersNavbarLinks,
} from "@/constants/navbar";
import { NavbarActionsList } from "./Actions";
import { Avatar } from "@/components/Shared/Avatar";
import { useQuery } from "react-query";
import { getSeekerProfile } from "@/utils/actions";

const AuthenticationDivLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <LinkElement variant={"outlined"} href={"/login"}>
          Login
        </LinkElement>
      </div>
      <div>
        <LinkElement variant={"default"} href={"/signup"}>
          Signup
        </LinkElement>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const { deleteCookieHandler, getCookieHandler } = useAuthentication();
  const { isAuthenticated, userType, token } = getCookieHandler();
  const { data } = useQuery({
    queryFn: () => getSeekerProfile(token as string),
    queryKey: ["profile"],
  });

  const fetchedSeeker: any = data;

  const pathname = usePathname();

  const isSeeker = userType === "seeker";

  return (
    <header className="base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray sticky top-0 bg-white">
      <div>
        <Logo />
      </div>
      {isAuthenticated && (
        <div>
          <NavbarLinksList
            pathname={pathname}
            data={isSeeker ? SeekersNavbarLinks : EmployersNavbarLinks}
          />
        </div>
      )}
      {isAuthenticated && (
        <div className="flex items-center gap-6">
          <div>
            <NavbarActionsList
              pathname={pathname}
              logout={deleteCookieHandler}
              data={isSeeker ? SeekersNavbarActions : EmployersNavbarActions}
            />
          </div>
          <div>
            <Avatar
              image={fetchedSeeker?.seeker.image}
              name={`${fetchedSeeker?.seeker.first_name} ${fetchedSeeker?.seeker.last_name}`}
            />
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <AuthenticationDivLinks />
        </div>
      )}
    </header>
  );
};

export default Navbar;
