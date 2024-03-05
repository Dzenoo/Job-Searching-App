import React from "react";
import { NavbarLinksListProps } from "./types";
import Link from "next/link";

const NavbarLinksList: React.FC<NavbarLinksListProps> = ({
  pathname,
  data,
}) => {
  return (
    <ul className="flex items-center gap-6">
      {Array.from(data).map(({ href, title, id, icon }) => (
        <Link
          key={id}
          href={href}
          className={`flex items-center gap-3 transition-colors hover:text-[--black-base-color] ${
            pathname === href ? "text-[#0066ff]" : "text-[--gray-base-color]"
          }`}
        >
          <div>{icon}</div>
          <div>
            <h1>{title}</h1>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export { NavbarLinksList };
