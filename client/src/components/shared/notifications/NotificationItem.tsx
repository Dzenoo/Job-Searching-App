import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Calendar } from "lucide-react";

import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";

import { queryClient } from "@/context/react-query-client";

import useAuthentication from "@/hooks/useAuthentication";

import { NotificationTypes } from "@/types";

import { readNotificationsData } from "@/lib/actions/shared.actions";
import { formatDate, getImageUrl } from "@/lib/utils";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotificationLayout: React.FC<{
  image?: string;
  notification: NotificationTypes;
  extraContent?: React.ReactNode;
}> = ({ image, notification, extraContent }) => {
  const formattedDate = formatDate(notification?.date);

  return (
    <Card
      className={`cursor-pointer ${
        !notification?.isRead ? "border-blue-600 dark:border-blue-600" : ""
      }`}
    >
      <div className="flex gap-3 items-center max-sm:flex-wrap">
        {image && (
          <CardHeader>
            <Image
              src={image as string}
              alt="notification image"
              width={100}
              height={100}
            />
          </CardHeader>
        )}
        <CardContent className="flex justify-between gap-10 basis-full flex-wrap">
          <div className="flex flex-col gap-[10px]">
            <div>
              <h1 className="font-bold">{notification?.title}</h1>
            </div>
            <div>
              <p className="text-initial-gray">{notification?.message}</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <Calendar />
              </div>
              <div>
                <h1 className="dark:text-white">{formattedDate}</h1>
              </div>
            </div>
          </div>
          {extraContent && <div>{extraContent}</div>}
        </CardContent>
      </div>
    </Card>
  );
};

const SeekerNotificationItem: React.FC<{ notification: NotificationTypes }> = ({
  notification,
}) => {
  const imageUrl =
    notification.data.employerImage &&
    getImageUrl(notification?.data?.employerImage);

  const extraContent = notification.type === "jobs" && (
    <Link className="w-full" href={`/jobs/${notification?.data?.idOfJob}`}>
      <Button variant="default">View</Button>
    </Link>
  );

  return (
    <NotificationLayout
      image={imageUrl}
      notification={notification}
      extraContent={extraContent}
    />
  );
};

const EmployerNotificationItem: React.FC<{
  notification: NotificationTypes;
}> = ({ notification }) => {
  return <NotificationLayout notification={notification} />;
};

const NotificationsItem: React.FC<{ notification: NotificationTypes }> = ({
  notification,
}) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: readNotificationsMutate } = useMutation({
    mutationFn: () => readNotificationsData(token!, notification?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const handleCardClick = async () => {
    await readNotificationsMutate();
  };

  const isSeekerNotification = notification?.user === "seeker";

  return (
    <div onClick={handleCardClick}>
      {isSeekerNotification ? (
        <SeekerNotificationItem notification={notification} />
      ) : (
        <EmployerNotificationItem notification={notification} />
      )}
    </div>
  );
};

export default NotificationsItem;
