import React from "react";
import { EventItemProps } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
import Image from "next/image";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { renderIconText } from "@/lib/jsx/render-icon-text";
import useSearchParams from "@/hooks/useSearchParams";
import useGetSeeker from "@/hooks/useGetSeeker";
import { formatDate } from "@/lib/date";
import { Button } from "@/components/ui/button";

const EventItem: React.FC<EventItemProps> = ({ event, onRegisterEvent }) => {
  const { data: fetchedSeekerProfile } = useGetSeeker();
  const { updateSearchParams } = useSearchParams();

  const isRegistered = fetchedSeekerProfile?.seeker?.events.includes(
    event?._id
  );

  const formattedDate = formatDate(event?.date);

  let FooterInfoData = new Array(
    {
      id: "1",
      data: event?.location,
      icon: <MapPin color="gray" />,
    },
    {
      id: "2",
      data: event?.category,
      icon: <Briefcase color="gray" />,
    },
    {
      id: "3",
      data: formattedDate,
      icon: <Calendar color="gray" />,
    }
  );

  return (
    <li>
      <Card className="p-0">
        <CardHeader className="py-0">
          <Image
            src={`https://job-searching-application.s3.amazonaws.com/${event?.image}`}
            alt={event?.title}
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-60 object-contain"
          />
        </CardHeader>
        <CardContent className="p-3 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 max-lg:flex-wrap">
            <div>
              <h1 className="text-base-black">{event?.title}</h1>
            </div>
            <div>
              <Button
                className="w-full"
                variant={isRegistered ? "outline" : "default"}
                onClick={() => {
                  onRegisterEvent();
                  updateSearchParams("evt", event?._id);
                }}
              >
                {isRegistered ? "Unregister" : "Register"}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-initial-gray text-wrap">{event?.description}</p>
          </div>
          <div>
            <h3 className="text-initial-black">{event.company?.name}</h3>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-300 px-3 dark:border-[#0d0d0d]">
          <div className="flex justify-between gap-3 items-center flex-wrap">
            {FooterInfoData.map((data) => renderIconText(data))}
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export { EventItem };
