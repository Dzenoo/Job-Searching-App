"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import Link from "next/link";

import useAuthentication from "@/hooks/useAuthentication";

import {
  EmployersNavbarActions,
  EmployersNavbarLinks,
  SeekersNavbarActions,
  SeekersNavbarLinks,
} from "@/constants";

import { getSeekerProfile } from "@/lib/actions/seekers.actions";
import { getEmployerProfile } from "@/lib/actions/employers.actions";
import { getImageUrl } from "@/lib/utils";

import { NotificationTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import NavbarActionsList from "./NavbarActionsList";
import NavbarLinksList from "./NavbarLinksList";
import Logo from "./Logo";

const AuthenticationDivLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <Link href={"/login"}>
        <Button variant={"outline"}>Login</Button>
      </Link>
      <Link href={"/signup"}>
        <Button variant={"default"}>Signup</Button>
      </Link>
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
        const response = await getEmployerProfile({
          type: "jobs",
          token: token as string,
        });
        return response;
      }
    },
  });

  const pathname = usePathname();

  const isSeeker = userType === "seeker";

  const fetchedProfile: any = data;

  return (
    <header className="px-5 py-2 dark:bg-[#0d0d0d] base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray dark:border-[#1b1b1b] bg-white">
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
            <Avatar>
              <AvatarImage
                src={getImageUrl(
                  isSeeker
                    ? fetchedProfile?.seeker.image
                    : fetchedProfile?.employer.image
                )}
              />
              <AvatarFallback>
                {isSeeker
                  ? `${fetchedProfile?.seeker.first_name} ${fetchedProfile?.seeker.last_name}`
                  : fetchedProfile?.employer.name}
              </AvatarFallback>
            </Avatar>
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
