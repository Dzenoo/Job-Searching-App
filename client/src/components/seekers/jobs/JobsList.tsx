import React from "react";

import { JobTypes } from "@/types";

import JobItem from "./JobItem";

type JobListProps = {
  jobs?: JobTypes[];
};

const JobsList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div>
      {jobs?.length === 0 && (
        <div>
          <h1 className="text-initial-gray text-center py-6">
            It seems there are no jobs available at the moment.
          </h1>
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {jobs &&
          jobs?.length > 0 &&
          jobs?.map((job) => <JobItem job={job} key={job._id} />)}
      </ul>
    </div>
  );
};

export default JobsList;
