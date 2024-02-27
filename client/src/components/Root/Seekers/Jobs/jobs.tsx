import React from "react";
import { JobListProps } from "./types";
import { JobsData } from "@/constants/jobs";
import Link from "next/link";
import { Card } from "@/components/shared/Card";
import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shared/Card/card";
import Image from "next/image";

const JobsList: React.FC<JobListProps> = () => {
  return (
    <ul className="flex flex-col gap-3">
      {JobsData.map((job) => (
        <li>
          <Card>
            <CardHeader>
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
                <div className="flex flex-col gap-[6px]">
                  <div>
                    <h1 className="text-base-black font-bold">{job.title}</h1>
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
              <div></div>
            </CardHeader>
            <CardContent>
              <div></div>
            </CardContent>
            <CardFooter>
              <div></div>
              <div></div>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export { JobsList };
