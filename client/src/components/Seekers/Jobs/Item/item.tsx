import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card/card";
import { GraduationCap, MapPin, Timer } from "lucide-react";
import { JobItemProps } from "./types";
import { checkExpired, formatDate, getTime } from "@/utils/date";
import Link from "next/link";
import SaveJobButton from "../save";
import { renderIconText } from "@/utils/jsx/render-icon-text";

const JobItem: React.FC<JobItemProps> = ({ job, showDescription = true }) => {
  const isJobExpired = checkExpired(job.expiration_date);
  const expirationDate = formatDate(job.expiration_date);
  const createdTime = getTime(job.expiration_date);

  let FooterInfoData = new Array(
    {
      id: "1",
      data: job.location,
      icon: <MapPin color="gray" />,
    },
    {
      id: "2",
      data: job.level,
      icon: <GraduationCap color="gray" />,
    },
    {
      id: "3",
      data: expirationDate,
      icon: <Timer color="gray" />,
    }
  );

  return (
    <li>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={job.company?.image}
                alt={job.company?.name}
                width={60}
                height={60}
                className="object-cover w-auto h-auto"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <div>
                <Link href={`/jobs/${job._id}`}>
                  <h1 className="text-base-black font-bold">{job.title}</h1>
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-low-gray">{job.company?.name}</p>
                </div>
                <div>
                  <p className="text-low-gray">
                    {job?.applications?.length} Applicants
                  </p>
                </div>
              </div>
            </div>
          </div>
          <SaveJobButton jobId={job?._id} />
        </CardHeader>
        {showDescription && (
          <CardContent>
            <div>
              <p className="text-initial-black">{job.overview}</p>
            </div>
          </CardContent>
        )}
        <CardFooter className="border-t border-gray-100 pt-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            {FooterInfoData.map((data) => renderIconText(data))}
          </div>
          <div className="flex items-center gap-3">
            {isJobExpired && (
              <div className="flex items-center gap-3">
                <div>
                  <Timer color="#d70000" />
                </div>
                <div>
                  <p className="text-[--red-base-color] ">Expired</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-initial-gray truncate">{createdTime}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export { JobItem };
