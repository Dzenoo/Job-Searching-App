import React from "react";
import { ApplicationItemProps } from "./types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/Shared/Card";
import Image from "next/image";
import { renderIconText } from "@/utils/jsx/render-icon-text";
import {
  Briefcase,
  Building,
  Calendar,
  CalendarCheck,
  GraduationCap,
  MapPin,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/utils/date";

const ApplicationsItem: React.FC<ApplicationItemProps> = ({ application }) => {
  const appliedDate = formatDate(application?.createdAt || "");

  const ApplicationCompanyInfo = new Array(
    {
      id: "1",
      icon: <Building />,
      data: application?.job.company.industry,
    },
    {
      id: "2",
      icon: <MapPin />,
      data: application?.job.company.address,
    },
    {
      id: "3",
      icon: <LayoutTemplate />,
      data: application?.job.company.size,
    }
  );

  const ApplicationJobInfo = new Array(
    {
      id: "1",
      icon: <GraduationCap />,
      data: application?.job.level,
    },
    {
      id: "2",
      icon: <Briefcase />,
      data: application?.job.type,
    },
    {
      id: "3",
      icon: <Calendar />,
      data: application?.job.position,
    }
  );

  const applicationStatusAccepted = application?.status === "Accepted";
  const applicationStatusRejected = application?.status === "Rejected";
  const applicationsStatusInterview = application?.status === "Interview";

  return (
    <Card className="dark:border-[#3b3b3b]">
      <CardHeader>
        <div className="flex gap-3 items-center max-sm:flex-wrap">
          <div>
            <Image
              src={
                !application?.job.company.image.includes("https:")
                  ? `https://job-searching-application.s3.amazonaws.com/${application?.job.company.image}`
                  : application?.job.company.image
              }
              alt={application?.job.company.name}
              width={170}
              height={170}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1>{application?.job.company.name}</h1>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              {ApplicationCompanyInfo.map((data) => renderIconText(data))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div>
            <Link href={`/jobs/${application?.job._id}`}>
              <h1 className="font-bold text-xl overflow-auto">
                {application?.job.title}
              </h1>
            </Link>
          </div>
          <div className="flex gap-6 items-center flex-wrap justify-between">
            {ApplicationJobInfo.map((data) => renderIconText(data))}
          </div>
          <div>
            {renderIconText({
              id: "1",
              icon: <CalendarCheck />,
              data: "Applied" + ` ${appliedDate}`,
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className={`p-3 rounded-full border w-full overflow-auto text-center ${
            applicationStatusAccepted
              ? "bg-green-100"
              : applicationStatusRejected
              ? "bg-red-100"
              : applicationsStatusInterview
              ? "bg-yellow-100"
              : "bg-blue-100"
          }`}
        >
          <p
            className={`
           ${
             applicationStatusAccepted
               ? "text-[--green-base-color]"
               : applicationStatusRejected
               ? "text-[--red-base-color]"
               : applicationsStatusInterview
               ? "text-yellow-100"
               : "text-[--blue-base-color]"
           }`}
          >
            {application?.status}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export { ApplicationsItem };
