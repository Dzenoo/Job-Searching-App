"use client";

import React from "react";
import useAuthentication from "@/hooks/useAuthentication";
import Logo from "./Logo/logo";
import { LinkElement } from "@/components/shared/Link";
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
  const { isAuthenticated, userType } = useAuthentication().getCookieHandler();
  const isSeeker = userType === "seeker";

  return (
    <header className="base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray">
      <div>
        <Logo />
      </div>
      <div>
        {isAuthenticated && isSeeker ? (
          <div>
            <SeekersNavbarLinks />
          </div>
        ) : (
          <div>
            <EmployersNavbarLinks />
          </div>
        )}
      </div>
      <div>
        {isAuthenticated && isSeeker ? (
          <div className="flex items-center gap-3">
            <div>
              <SeekersNavbarActions />
            </div>
            <div>
              <SeekersNavbarAvatar />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div>
              <EmployersNavbarActions />
            </div>
            <div>
              <EmployersNavbarAvatar />
            </div>
          </div>
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
