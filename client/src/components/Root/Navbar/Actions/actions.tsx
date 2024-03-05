import React from "react";
import { NavbarActionsListProps } from "./types";
import Link from "next/link";
import { LogOut } from "lucide-react";

const NavbarActionsList: React.FC<NavbarActionsListProps> = ({
  data,
  logout,
  pathname,
}) => {
  return (
    <ul className="flex items-center gap-4">
      {Array.from(data).map(({ id, href, icon }) => (
        <Link
          key={id}
          href={href}
          className={`flex items-center gap-3 transition-colors ${
            pathname === href && "text-[#0066ff]"
          }`}
        >
          {icon}
        </Link>
      ))}
      <button onClick={logout}>
        <LogOut />
      </button>
    </ul>
  );
};

export { NavbarActionsList };
