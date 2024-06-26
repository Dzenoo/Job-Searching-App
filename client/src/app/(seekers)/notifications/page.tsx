"use client";

import Protected from "@/components/Hoc/Protected";
import { NotificationsList } from "@/components/Seekers/Notifications";
import useAuthentication from "@/hooks/useAuthentication";
import { getSeekerProfile } from "@/utils/actions/seekers";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const { token } = useAuthentication().getCookieHandler();

  useEffect(() => {
    const socket = io("http://localhost:7000");

    getSeekerProfile(token!).then((response) => {
      setNotifications(response?.seeker.notifications);
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
    <section className="py-16 mx-40 overflow-auto flex flex-col gap-[10px] max-xl:mx-0">
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

export default Protected(NotificationsPage, ["seeker"]);
