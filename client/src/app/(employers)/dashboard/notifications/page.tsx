"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import useAuthentication from "@/hooks/useAuthentication";
import { getEmployerProfile } from "@/lib/actions/employers.actions";

import Protected from "@/components/hoc/Protected";
import NotificationsList from "@/components/shared/notifications/NotificiationsList";

const DashboardNotificationsPage = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const { token } = useAuthentication().getCookieHandler();

  useEffect(() => {
    const socket = io("http://localhost:7000");

    getEmployerProfile({
      token: token!,
      type: "notifications",
      srt: "",
      search: "",
      page: "1",
    }).then((response) => {
      setNotifications(response?.employer.notifications);
    });

    socket.on("notification", (notification) => {
      setNotifications((prevNotifications: any) => [
        ...prevNotifications,
        notification,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <section className="overflow-auto flex flex-col gap-[10px]">
      <div>
        <h1 className="text-base-black">
          Notifications ({notifications.length})
        </h1>
      </div>
      <div>
        <NotificationsList
          notifications={notifications.sort(
            (a: any, b: any) => b.createdAt - a.createdAt
          )}
        />
      </div>
    </section>
  );
};

export default Protected(DashboardNotificationsPage, ["employer"]);
