import React from "react";
import { StatisticsProps } from "./types";
import {
  Briefcase,
  CalendarSearch,
  FileText,
  MessageSquareDot,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";

const Statistics: React.FC<StatisticsProps> = () => {
  const StatisticsData = new Array(
    {
      id: "1",
      title: "Total Jobs",
      data: 36,
      icon: <Briefcase color="#0066FF" />,
    },
    {
      id: "2",
      title: "Total Reviews",
      data: 30,
      icon: <MessageSquareDot color="#00C7E2" />,
    },
    {
      id: "3",
      title: "Total Events",
      data: 13,
      icon: <FileText color="#9225FF" />,
    },
    {
      id: "4",
      title: "Total Applications",
      data: 163,
      icon: <CalendarSearch color="#007D05" />,
    }
  );

  return (
    <div className="grid gap-3 grid-cols-4">
      {StatisticsData.map((statistics) => (
        <Card key={statistics.id}>
          <CardHeader className="flex justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>{statistics.icon}</div>
              <div>
                <h1 className="text-initial-gray">{statistics.title}</h1>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 justify-between">
              <div>
                <p className="font-bold text-3xl">{statistics.data}</p>
              </div>
              <div>
                <p className="text-[--green-base-color]">+13 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { Statistics };
