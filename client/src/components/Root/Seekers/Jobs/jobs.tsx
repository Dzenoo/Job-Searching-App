import React from "react";
import { JobListProps } from "./types";
import { JobsData } from "@/constants/jobs";
import { JobItem } from "./Item";

const JobsList: React.FC<JobListProps> = () => {
  return (
    <ul className="flex flex-col gap-3">
      {JobsData.map((job) => (
        <JobItem job={job} />
      ))}
    </ul>
  );
};

export { JobsList };
