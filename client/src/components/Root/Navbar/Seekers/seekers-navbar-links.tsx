import React from "react";
import Link from "next/link";
import { Building, FileText, Search } from "lucide-react";

type SeekersNavbarLinksProps = {
  pathname: string;
};

const SeekersNavbarLinks: React.FC<SeekersNavbarLinksProps> = ({
  pathname,
}) => {
  return (
    <ul className="flex items-center gap-6">
      {Array.from([
        {
          id: "1",
          title: "Find Jobs",
          href: "/",
          icon: <Search />,
        },
        {
          id: "3",
          title: "Find Companies",
          href: "/companies",
          icon: <Building />,
        },
        {
          id: "4",
          title: "Find Events",
          href: "/events",
          icon: <FileText />,
        },
      ]).map(({ href, title, id, icon }) => (
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

export { SeekersNavbarLinks };
