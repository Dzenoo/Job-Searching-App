"use client";

import React from "react";
import useAuthentication from "@/hooks/useAuthentication";
import Logo from "./Logo/logo";
import {
  SeekersNavbarActions,
  SeekersNavbarAvatar,
  SeekersNavbarLinks,
} from "./Seekers";
import {
  EmployersNavbarActions,
  EmployersNavbarAvatar,
  EmployersNavbarLinks,
} from "./Employers";
import { LinkElement } from "@/components/shared/Link";
import { usePathname } from "next/navigation";

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
  const { isAuthenticated, userType } = getCookieHandler();
  const pathname = usePathname();
  const isSeeker = userType === "seeker";
  const isEmployer = userType === "employer";

  return (
    <header className="base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray">
      <div>
        <Logo />
      </div>
      <div>
        {isAuthenticated && isSeeker ? (
          <div>
            <SeekersNavbarLinks pathname={pathname} />
          </div>
        ) : (
          isAuthenticated &&
          isEmployer && (
            <div>
              <EmployersNavbarLinks />
            </div>
          )
        )}
      </div>
      <div>
        {isAuthenticated && isSeeker ? (
          <div className="flex items-center gap-6">
            <div>
              <SeekersNavbarActions
                pathname={pathname}
                logout={deleteCookieHandler}
              />
            </div>
            <div>
              <SeekersNavbarAvatar />
            </div>
          </div>
        ) : (
          isAuthenticated &&
          isEmployer && (
            <div className="flex items-center gap-3">
              <div>
                <EmployersNavbarActions />
              </div>
              <div>
                <EmployersNavbarAvatar />
              </div>
            </div>
          )
        )}
      </div>
      {!isAuthenticated && (
        <div>
          <AuthenticationDivLinks />
        </div>
      )}
    </header>
  );
};

export default Navbar;
