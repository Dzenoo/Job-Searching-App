import {
  Bell,
  Building,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Search,
  User,
} from "lucide-react";

export const SeekersNavbarLinks = [
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
];

export const EmployersNavbarLinks = [
  {
    id: "3",
    title: "Find Seekers",
    href: "/",
    icon: <Building />,
  },
];

export const SeekersNavbarActions = [
  {
    id: "1",
    href: "/messages",
    icon: <MessageCircle />,
  },
  {
    id: "2",
    href: "/notifications",
    icon: <Bell />,
  },
  {
    id: "3",
    href: "/profile",
    icon: <User />,
  },
];

export const EmployersNavbarActions = [
  {
    id: "1",
    href: "/messages",
    icon: <MessageCircle />,
  },
  {
    id: "2",
    href: "/notifications",
    icon: <Bell />,
  },
  {
    id: "3",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
];
