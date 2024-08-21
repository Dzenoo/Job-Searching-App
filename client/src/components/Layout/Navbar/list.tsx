import React from "react";
import Link from "next/link";

type NavbarLinksListProps = {
  pathname: string;
  data: {
    id: string;
    title: string;
    icon: React.JSX.Element;
    href: string;
  }[];
};

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
          className={`flex items-center gap-3 transition-colors hover:text-[#0066ff] ${
            pathname === href
              ? "text-[#0066ff]"
              : "text-[--black-base-color] dark:text-white"
          }`}
        >
          <div>{icon}</div>
          <div className="max-sm:hidden">
            <h1>{title}</h1>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export { NavbarLinksList };
