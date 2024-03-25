import React from "react";
import { NotificationsListProps } from "./types";
import { NotificationsItem } from "./Item";

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
}) => {
  return (
    <div>
      {notifications?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            Ops! Looks like there are no notifications founded
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

export { NotificationsList };
