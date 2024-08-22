import React from "react";
import { NotificationTypes } from "@/types";
import NotificationsItem from "./NotificationItem";

type NotificationsListProps = {
  notifications: NotificationTypes[];
};

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
}) => {
  return (
    <div>
      {notifications?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            No notifications found.
          </h1>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {notifications?.map((notification) => (
          <NotificationsItem
            key={notification?._id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsList;
