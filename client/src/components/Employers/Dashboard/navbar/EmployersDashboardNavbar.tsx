"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bell,
  Briefcase,
  LayoutDashboard,
  LayoutTemplate,
  MessageCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EmployersDashboardNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const NavbarActionsLinks = [
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
    },
  ];

  return (
    <header>
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="pl-5 md:hidden"
      >
        {isDrawerOpen ? <X /> : <Menu />}
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div
        className={`h-screen fixed top-0 bottom-0 left-0 z-50 p-3 bg-white border-r border-gray-300 dark:bg-[#1b1b1b] dark:border-[#1b1b1b] transform transition-transform duration-300 md:static md:translate-x-0 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3">
          {NavbarActionsLinks.map(({ tooltip, id, icon, href }) => (
            <TooltipProvider key={id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={`transition dark:hover:bg-[#0d0d0d] p-3 rounded-lg hover:bg-gray-100 ${
                      pathname === href &&
                      "bg-blue-100 dark:bg-[#0066ff] overflow-auto"
                    }`}
                    onClick={() => setIsDrawerOpen(false)}
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
      </div>
    </header>
  );
};

export default EmployersDashboardNavbar;
