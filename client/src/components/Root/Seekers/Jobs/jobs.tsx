import React from "react";
import { JobListProps } from "./types";
import { JobItem } from "./Item";

const JobsList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div>
      {jobs?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            Ops! Looks like there are no jobs for this filters
          </h1>
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {jobs?.map((job) => (
          <JobItem job={job} key={job._id} />
        ))}
      </ul>
    </div>
  );
};

export { JobsList };
