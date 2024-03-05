import React from "react";
import { EventItemProps } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
import Image from "next/image";
import { Button } from "@/components/Shared/Button";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { renderIconText } from "@/utils/jsx";
import useSearchParams from "@/hooks/useSearchParams";

const EventItem: React.FC<EventItemProps> = ({ event, onRegisterEvent }) => {
  const { updateSearchParams } = useSearchParams();

  let FooterInfoData = new Array(
    {
      id: "1",
      data: event.location,
      icon: <MapPin color="gray" />,
    },
    {
      id: "2",
      data: event.category,
      icon: <Briefcase color="gray" />,
    },
    {
      id: "3",
      data: event.date,
      icon: <Calendar color="gray" />,
    }
  );

  return (
    <li>
      <Card className="p-0">
        <CardHeader className="py-0">
          <Image
            src="/images/eventimg.jpg"
            alt="event_image_section"
            width={400}
            height={400}
            loading="lazy"
            className="w-full"
          />
        </CardHeader>
        <CardContent className="p-3 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-base-black">Tech Talk Event</h1>
            </div>
            <div>
              <Button
                variant="default"
                onClick={() => {
                  onRegisterEvent();
                  updateSearchParams("evt", event._id, "add");
                }}
              >
                Register
              </Button>
            </div>
          </div>
          <div>
            <p className="text-initial-gray text-wrap">
              Zaista je kul svaki dan kretati na posao, znajući da ćemo dan
              provesti zajedno sa prijateljima stvarajući nešto što igraju
              milioni gejmera širom
            </p>
          </div>
          <div>
            <h3 className="text-initial-black">Centar Nit Company</h3>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-300 px-3">
          <div className="flex justify-between gap-3 items-center">
            {FooterInfoData.map((data) => renderIconText(data))}
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export { EventItem };
