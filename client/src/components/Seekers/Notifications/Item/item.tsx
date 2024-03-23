import React from "react";
import { NotificationsItemProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import { Calendar } from "lucide-react";
import { LinkElement } from "@/components/Shared/Link";

const NotificationsItem: React.FC<NotificationsItemProps> = ({
  notification,
}) => {
  const formattedDate = formatDate(notification?.date);
  const notificationMessage = notification?.message.split(",")[0];
  const nId = notification?.message.split(",")[1].trim();

  return (
    <Card>
      <div className="flex gap-3 items-center max-sm:flex-wrap">
        <CardHeader>
          <Image
            src="/images/company.png"
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
              <p className="text-initial-gray">{notificationMessage}</p>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <Calendar />
              </div>
              <div>
                <h1 className="text-initial-white">{formattedDate}</h1>
              </div>
            </div>
          </div>
          {nId && (
            <div>
              <LinkElement
                className="w-full"
                variant="default"
                href={`/jobs/${nId}`}
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
