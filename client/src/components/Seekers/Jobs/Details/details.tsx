import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JobDetailsInfoProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import { renderIconText } from "@/lib/jsx/render-icon-text";

import { formatDate, getTime } from "@/lib/date";
import { getSkillsData } from "@/lib/helpers";
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
import SaveJobButton from "../save";
import Navigator from "@/components/shared/navigator";
import useGetSeeker from "@/hooks/useGetSeeker";
import { ApplicationsTypes } from "@/types/shared";
import { Button } from "@/components/ui/button";

const JobDetailsInfo: React.FC<JobDetailsInfoProps> = ({ job, onApplyJob }) => {
  const { data: fetchedSeekerProfile } = useGetSeeker();

  const expirationDate = formatDate(job?.expiration_date);
  const createdTime = getTime(job?.expiration_date);
  const categorizedSkills = getSkillsData(job?.skills);

  const CompanyInformationsData = new Array(
    {
      id: "1",
      icon: <MapPinIcon color="gray" />,
      data: job?.company.address || job?.location,
    },
    {
      id: "2",
      icon: <LayoutTemplate color="gray" />,
      data: job?.company.size,
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

  const isAppliedJob = fetchedSeekerProfile?.seeker.applications.find(
    (application: ApplicationsTypes) => application.job._id === job._id
  );

  return (
    <div className="flex flex-col gap-3">
      <Navigator info="Jobs" href={"/"} title={job?.title} />
      <Card>
        <CardHeader className="flex justify-between gap-6 max-md:flex-col">
          <div className="flex gap-3 items-center">
            <div>
              <Image
                src={job?.company.image}
                alt={job?.company.name}
                width={100}
                height={100}
                className="h-auto w-auto object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-initial-black">{job?.company.name}</h3>
              </div>
              {renderIconText({
                id: "3",
                icon: <Building color="gray" />,
                data: job?.company.industry,
              })}
              <div className="flex items-center gap-3">
                {CompanyInformationsData.map((data) => renderIconText(data))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="basis-full">
              <Button
                className="w-full px-6"
                variant={isAppliedJob ? "outline" : "default"}
                onClick={onApplyJob}
                disabled={isAppliedJob !== undefined}
              >
                {isAppliedJob ? "Already Applied Job" : "Apply to Job"}
              </Button>
            </div>
            <SaveJobButton jobId={job?._id} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            <h1 className="text-base-black font-bold">{job?.title}</h1>
          </div>
          <div className="flex items-center gap-6 max-sm:justify-between max-sm:flex-wrap">
            {JobInformationsData.map((data) => renderIconText(data))}
          </div>
          <div className="px-10 border border-[--blue-base-color] rounded-xl flex items-center gap-6 justify-between py-4 max-sm:flex-wrap">
            {JobDetailsData.map((data) => renderJobDetails(data))}
          </div>
          <div>
            <div>
              <h1 className="font-bold">Overview</h1>
            </div>
            <div className="py-3">
              <p>{job?.overview}</p>
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
                          <div key={index} className="tag">
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
