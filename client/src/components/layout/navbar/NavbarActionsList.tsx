import React from "react";
import Link from "next/link";

import { LogOut } from "lucide-react";

import Themes from "./Themes";

type NavbarActionsListProps = {
  data: {
    id: string;
    href: string;
    icon: React.JSX.Element;
  }[];
  logout: () => void;
  pathname: string;
};

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
          className={`flex items-center gap-3 transition-colors hover:text-blue-700 ${
            pathname === href && "text-[#0066ff]"
          }`}
        >
          {icon}
        </Link>
      ))}
      <div>
        <Themes />
      </div>
      <button onClick={logout}>
        <LogOut />
      </button>
    </ul>
  );
};

export default NavbarActionsList;
