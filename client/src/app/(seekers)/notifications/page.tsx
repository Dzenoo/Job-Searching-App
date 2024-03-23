"use client";

import Protected from "@/components/Hoc/Protected";
import { NotificationsList } from "@/components/Seekers/Notifications";
import useGetSeeker from "@/hooks/useGetSeeker";
import React from "react";

const NotificationsPage = () => {
  const { data: fetchedSeeker } = useGetSeeker();

  return (
    <section className="py-16 mx-40 overflow-auto flex flex-col gap-10 max-xl:mx-0">
      <div>
        <h1 className="text-base-black">
          Notifications ({fetchedSeeker?.seeker.notifications.length})
        </h1>
      </div>
      <div>
        <NotificationsList
          notifications={fetchedSeeker?.seeker.notifications || []}
        />
      </div>
    </section>
  );
};

export default Protected(NotificationsPage, ["seeker"]);
