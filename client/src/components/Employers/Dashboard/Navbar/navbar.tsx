"use client";

import React from "react";
import { EmployersDashboardNavbarProps } from "./types";
import {
  Bell,
  Briefcase,
  CalendarSearch,
  LayoutDashboard,
  LayoutTemplate,
  MessageCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EmployersDashboardNavbar: React.FC<
  EmployersDashboardNavbarProps
> = () => {
  const pathname = usePathname();

  const NavbarActionsLinks = new Array(
    {
      id: "1",
      icon: <LayoutDashboard />,
      href: "/dashboard",
    },
    {
      id: "2",
      icon: <Settings />,
      href: "/dashboard/settings",
    },
    {
      id: "3",
      icon: <Briefcase />,
      href: "/dashboard/jobs",
    },
    {
      id: "4",
      icon: <CalendarSearch />,
      href: "/dashboard/applications",
    },
    {
      id: "5",
      icon: <LayoutTemplate />,
      href: "/dashboard/reviews",
    },
    {
      id: "6",
      icon: <Bell />,
      href: "/dashboard/notifications",
    },
    {
      id: "7",
      icon: <MessageCircle />,
      href: "/dashboard/messages",
    }
  );

  return (
    <header className="bg-white sticky top-0 bottom-0 left-0 p-3 border-r border-gray-300 dark:dark:bg-[#1b1b1b] h-screen dark:border-r dark:border-[#1b1b1b]">
      <div className="flex flex-col gap-3">
        {NavbarActionsLinks.map(({ id, icon, href }) => (
          <Link
            href={href}
            key={id}
            className={`transition dark:hover:bg-[#0d0d0d] p-3 rounded-lg hover:bg-gray-100 ${
              pathname === href && "bg-blue-100 dark:bg-[#0066ff] overflow-auto"
            }`}
          >
            {icon}
          </Link>
        ))}
      </div>
    </header>
  );
};

export { EmployersDashboardNavbar };
