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
import { formatDate } from "@/lib/utils";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type NotificationsItemProps = {
  notification: NotificationTypes;
};

const NotificationsItem: React.FC<NotificationsItemProps> = ({
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

  const formattedDate = formatDate(notification?.date);

  const isJobAlerts = notification.type === "jobs";

  const employerImageUrl = notification?.data.employerImage.includes("https:")
    ? notification?.data.employerImage
    : `https://job-searching-application.s3.amazonaws.com/${notification?.data?.image}`;

  return (
    <Card
      onClick={async () => await readNotificationsMutate()}
      className={`cursor-pointer ${
        !notification?.isRead ? "border-blue-600 dark:border-blue-600" : ""
      }`}
    >
      <div className="flex gap-3 items-center max-sm:flex-wrap">
        <CardHeader>
          <Image
            src={employerImageUrl}
            alt="notifications"
            width={100}
            height={100}
          />
        </CardHeader>
        <CardContent className="flex justify-between gap-10 basis-full flex-wrap">
          <div className="flex flex-col gap-[10px]">
            <div>
              <h1 className="font-bold">{notification?.title}</h1>
            </div>
            <div>
              <p className="text-initial-gray">
                {notification?.message} {notification?.data.jobLocation}
              </p>
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
          {isJobAlerts && (
            <div>
              <Link
                className="w-full"
                href={`/jobs/${notification?.data.idOfJob}`}
              >
                <Button variant="default">View</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default NotificationsItem;
