import React from "react";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shared/Card/card";
import { Bookmark, GraduationCap, MapPin, Timer } from "lucide-react";
import { FooterInfoDataProps, JobItemProps } from "./types";
import { checkExpired, formatDate, getTime } from "@/utils/date";
import Link from "next/link";

const JobItem: React.FC<JobItemProps> = ({ job, showDescription = true }) => {
  const isJobExpired = checkExpired(job.expiration_date);
  const expirationDate = formatDate(job.expiration_date);
  const createdTime = getTime(job.expiration_date);
  const isJobSaved = false;

  let FooterInfoData: FooterInfoDataProps[] = new Array(
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
    <li key={job.title}>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <Image
                src="/images/company.png"
                alt="company"
                width={300}
                height={300}
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
                  <p className="text-low-gray">Company Name</p>
                </div>
                <div>
                  <p className="text-low-gray">30 Applicants</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button variant="outlined">
              <Bookmark
                color={isJobSaved ? "#0066FF" : "gray"}
                fill={isJobSaved ? "#0066FF" : "#ffffff"}
              />
            </Button>
          </div>
        </CardHeader>
        {showDescription && (
          <CardContent>
            <div>
              <p className="text-initial-gray">{job.overview}</p>
            </div>
          </CardContent>
        )}
        <CardFooter className="border-t border-gray-100 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {FooterInfoData.map((data: FooterInfoDataProps) =>
              renderFooterInformations(data)
            )}
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
              <p className="text-initial-gray">{createdTime}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

const renderFooterInformations = <T extends FooterInfoDataProps>({
  icon,
  data,
  id,
}: T) => (
  <div key={id} className="flex items-center gap-3">
    <div>{icon}</div>
    <div>
      <p className="text-initial-gray">{data}</p>
    </div>
  </div>
);

export { JobItem };
