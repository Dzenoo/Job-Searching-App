import React from "react";
import { NavbarActionsListProps } from "./types";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Themes from "../Themes";

const NavbarActionsList: React.FC<NavbarActionsListProps> = ({
  notifications,
  data,
  logout,
  pathname,
}) => {
  return (
    <ul className="flex items-center gap-4">
      {Array.from(data).map(({ id, href, icon }) => {
        if (href === "/notifications") {
          return (
            <div>
              <div className="relative">
                <Link
                  key={id}
                  href={href}
                  className={`flex items-center gap-3 transition-colors ${
                    pathname === href && "text-[#0066ff]"
                  }`}
                >
                  {icon}
                </Link>
                {notifications > 0 && (
                  <div className="absolute bottom-4 left-[21px] rounded-full h-[21px] w-[21px] flex items-center justify-center font-bold text-center bg-blue-600 text-xs">
                    {notifications}
                  </div>
                )}
              </div>
            </div>
          );
        }
        return (
          <Link
            key={id}
            href={href}
            className={`flex items-center gap-3 transition-colors ${
              pathname === href && "text-[#0066ff]"
            }`}
          >
            {icon}
          </Link>
        );
      })}
      <div>
        <Themes />
      </div>
      <button onClick={logout}>
        <LogOut />
      </button>
    </ul>
  );
};

export { NavbarActionsList };
