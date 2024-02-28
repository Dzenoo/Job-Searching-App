import React from "react";
import { JobListProps } from "./types";
import { JobItem } from "./Item";

const JobsList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <ul className="flex flex-col gap-3">
      {jobs?.map((job) => (
        <JobItem job={job} />
      ))}
    </ul>
  );
};

export { JobsList };
