import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JobDetailsInfoProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/shared/Card";
import { renderIconText } from "@/utils/jsx";
import { Button } from "@/components/shared/Button";
import { formatDate, getTime } from "@/utils/date";
import { getSkillsData } from "@/utils/helpers";
import {
  Bookmark,
  Building,
  Calendar,
  CircleDollarSignIcon,
  GraduationCap,
  LayoutTemplate,
  MapPinIcon,
  Timer,
} from "lucide-react";

const JobDetailsInfo: React.FC<JobDetailsInfoProps> = ({ job, onApplyJob }) => {
  const expirationDate = formatDate(job?.expiration_date);
  const createdTime = getTime(job?.expiration_date);
  const categorizedSkills = getSkillsData(job?.skills);
  const isJobSaved = true;

  const CompanyInformationsData = new Array(
    {
      id: "1",
      icon: <MapPinIcon color="gray" />,
      data: "London, England",
    },
    {
      id: "2",
      icon: <LayoutTemplate color="gray" />,
      data: "50-100",
    }
  );

  const JobInformationsData = new Array(
    {
      id: "1",
      icon: <Calendar color="gray" />,
      data: createdTime,
    },
    {
      id: "2",
      icon: <Timer color="gray" />,
      data: expirationDate,
    },
    {
      id: "3",
      icon: <GraduationCap color="gray" />,
      data: job?.applications.length + " Applications",
    }
  );

  const JobDetailsData = new Array(
    {
      id: "1",
      icon: <Calendar color="gray" />,
      data: job?.position,
      title: "Position",
    },
    {
      id: "2",
      icon: <Timer color="gray" />,
      data: job?.type,
      title: "Time",
    },
    {
      id: "3",
      icon: <GraduationCap color="gray" />,
      data: job?.level,
      title: "Level",
    },
    {
      id: "4",
      icon: <CircleDollarSignIcon color="green" />,
      data: job?.salary + "$",
      title: "Salary",
    }
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-6">
        <div>
          <Image
            src={"/images/logo/logo-icon.png"}
            alt="logo_light_talentify"
            width={40}
            height={40}
            loading="lazy"
          />
        </div>
        <div>
          <Link href="/jobs" className="text-[--blue-base-color]">
            Jobs
          </Link>
        </div>
        <div>
          <p className="text-initial-gray">{job?.title}</p>
        </div>
      </div>
      <Card>
        <CardHeader className="flex justify-between gap-3">
          <div className="flex gap-3">
            <div>
              <Image
                src={"/images/company.png"}
                alt="company_profile_image"
                width={100}
                height={100}
                className="h-auto w-auto object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-initial-black">Company Name</h3>
              </div>
              {renderIconText({
                id: "3",
                data: "Software Development",
                icon: <Building color="gray" />,
              })}
              <div className="flex items-center gap-3">
                {CompanyInformationsData.map((data) => renderIconText(data))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div>
              <Button className="px-6" variant="default" onClick={onApplyJob}>
                Apply to Job
              </Button>
            </div>
            <div>
              <Button variant="outlined">
                <Bookmark
                  color={isJobSaved ? "#0066FF" : "gray"}
                  fill={isJobSaved ? "#0066FF" : "#ffffff"}
                />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            <h1 className="text-base-black font-bold">{job?.title}</h1>
          </div>
          <div className="flex items-center gap-6">
            {JobInformationsData.map((data) => renderIconText(data))}
          </div>
          <div className="px-10 border border-[--blue-base-color] rounded-xl flex items-center gap-6 justify-between py-4">
            {JobDetailsData.map((data) => renderJobDetails(data))}
          </div>
          <div>
            <div>
              <h1 className="font-bold">Overview</h1>
            </div>
            <div className="py-3">
              <p className="text-initial-gray">{job?.overview}</p>
            </div>
          </div>
          <div>
            <div>
              <h1 className="font-bold">Description</h1>
            </div>
            <div className="py-3">{job?.description}</div>
          </div>
          <div>
            <div>
              <h1 className="font-bold">Skills</h1>
            </div>
            <div className="py-3 flex gap-6">
              {Object.entries(categorizedSkills).map(
                ([category, skills]) =>
                  skills.length > 0 && (
                    <div key={category} className="flex flex-col gap-3">
                      <div>
                        <h1 className="text-initial-black">{category}</h1>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="border border-gray-300 rounded-lg px-3 py-1"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const renderJobDetails = <
  T extends {
    id: string;
    icon: React.JSX.Element;
    title: string;
    data: string | number;
  }
>({
  id,
  icon,
  title,
  data,
}: T) => {
  return (
    <div
      key={id}
      className="flex flex-col items-center justify-center gap-3 overflow-auto"
    >
      <div>{icon}</div>
      <div>
        <h1 className="font-bold">{data}</h1>
      </div>
      <div>
        <p className="text-initial-gray">{title}</p>
      </div>
    </div>
  );
};

export { JobDetailsInfo };