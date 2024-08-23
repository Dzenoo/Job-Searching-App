"use client";

import React from "react";
import {
  Bell,
  Briefcase,
  LayoutDashboard,
  LayoutTemplate,
  MessageCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const EmployersDashboardNavbar: React.FC = () => {
  const pathname = usePathname();

  const NavbarActionsLinks = new Array(
    {
      id: "1",
      icon: <LayoutDashboard />,
      href: "/dashboard",
      tooltip: "Dashboard",
    },
    {
      id: "2",
      icon: <Settings />,
      href: "/dashboard/settings",
      tooltip: "Settings",
    },
    {
      id: "3",
      icon: <Briefcase />,
      href: "/dashboard/jobs",
      tooltip: "Jobs",
    },
    {
      id: "4",
      icon: <LayoutTemplate />,
      href: "/dashboard/reviews",
      tooltip: "Reviews",
    },
    {
      id: "5",
      icon: <Bell />,
      href: "/dashboard/notifications",
      tooltip: "Notifications",
    },
    {
      id: "6",
      icon: <MessageCircle />,
      href: "/dashboard/messages",
      tooltip: "Messages",
    }
  );

  return (
    <header className="bg-white sticky top-0 bottom-0 left-0 p-3 border-r border-gray-300 dark:dark:bg-[#1b1b1b] block min-h-[83vh] h-full dark:border-r dark:border-[#1b1b1b]">
      <div className="flex flex-col gap-3">
        {NavbarActionsLinks.map(({ tooltip, id, icon, href }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  key={id}
                  className={`transition dark:hover:bg-[#0d0d0d] p-3 rounded-lg hover:bg-gray-100 ${
                    pathname === href &&
                    "bg-blue-100 dark:bg-[#0066ff] overflow-auto"
                  }`}
                >
                  {icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </header>
  );
};

export default EmployersDashboardNavbar;
