import React from "react";
import Link from "next/link";
import { Bell, LogOut, MessageCircle, User } from "lucide-react";
type SeekersNavbarActionsProps = {
  pathname: string;
  logout: () => void;
};

const SeekersNavbarActions: React.FC<SeekersNavbarActionsProps> = ({
  pathname,
  logout,
}) => {
  return (
    <ul className="flex items-center gap-4">
      {Array.from([
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
      ]).map(({ id, href, icon }) => (
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

export { SeekersNavbarActions };
