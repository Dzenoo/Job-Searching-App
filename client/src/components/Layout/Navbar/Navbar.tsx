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
import { getSeekerProfile } from "@/utils/actions/seekers";
import { getEmployerProfile } from "@/utils/actions/employers";
import { NotificationTypes } from "@/typings/shared";

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
    queryKey: ["profile", userType],
    queryFn: async () => {
      if (userType === "seeker") {
        const response = await getSeekerProfile(token as string);
        return response;
      } else if (userType === "employer") {
        const response = await getEmployerProfile({ token: token as string });
        return response;
      }
    },
  });

  const pathname = usePathname();

  const isSeeker = userType === "seeker";

  const fetchedProfile: any = data;

  return (
    <header className="dark:bg-[#1b1b1b] base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray dark:border-[#1b1b1b] sticky top-0 bg-white z-30">
      <div>
        <Logo />
      </div>
      {isAuthenticated && (
        <div className="max-xl:hidden">
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
              notifications={
                isSeeker
                  ? fetchedProfile?.seeker.notifications.filter(
                      (not: NotificationTypes) => !not.isRead
                    ).length
                  : 0
              }
              pathname={pathname}
              logout={deleteCookieHandler}
              data={isSeeker ? SeekersNavbarActions : EmployersNavbarActions}
            />
          </div>
          <div>
            <Avatar
              image={
                isSeeker
                  ? fetchedProfile?.seeker.image
                  : fetchedProfile?.employer.image
              }
              name={
                isSeeker
                  ? `${fetchedProfile?.seeker.first_name} ${fetchedProfile?.seeker.last_name}`
                  : fetchedProfile?.employer.name
              }
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
