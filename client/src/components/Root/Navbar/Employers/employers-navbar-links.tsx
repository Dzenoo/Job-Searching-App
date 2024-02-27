import React from "react";
import Link from "next/link";
import { Building, Home, Search } from "lucide-react";

type EmployersNavbarLinksProps = {
  pathname: string;
};

const EmployersNavbarLinks: React.FC<EmployersNavbarLinksProps> = ({
  pathname,
}) => {
  return (
    <ul className="flex items-center gap-6">
      {Array.from([
        {
          id: "1",
          title: "Home",
          href: "/",
          icon: <Home />,
        },
        {
          id: "2",
          title: "Find Jobs",
          href: "/jobs",
          icon: <Search />,
        },
        {
          id: "3",
          title: "Find Seekers",
          href: "/find-seekers",
          icon: <Building />,
        },
      ]).map(({ href, title, id, icon }) => (
        <Link
          key={id}
          href={href}
          className={`flex items-center gap-3 text-[--gray-base-color] transition-colors hover:text-[--black-base-color] ${
            pathname === href && "text-[#0066ff]"
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

export { EmployersNavbarLinks };
