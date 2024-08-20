import React, { useEffect } from "react";
import { NotificationsItemProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import { Calendar } from "lucide-react";
import { LinkElement } from "@/components/Shared/Link";
import { useMutation } from "react-query";
import { readNotificationsData } from "@/utils/actions/shared";
import { toast } from "react-toastify";
import { queryClient } from "@/contexts/react-query-client";
import useAuthentication from "@/hooks/useAuthentication";

const NotificationsItem: React.FC<NotificationsItemProps> = ({
  notification,
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: readNotificationsMutate } = useMutation({
    mutationFn: () => readNotificationsData(token!, notification?._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
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
              <LinkElement
                className="w-full"
                variant="default"
                href={`/jobs/${notification?.data.idOfJob}`}
              >
                View
              </LinkElement>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export { NotificationsItem };
