import React from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams";

import { Button } from "@/components/ui/button";

type PopularsJobsInfoProps = {
  jobs?: {
    _id: string;
    title: string;
  }[];
};

const PopularJobsInfo: React.FC<PopularsJobsInfoProps> = ({ jobs }) => {
  const { updateSearchParams } = useSearchParams();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base-black">Popular Job Titles</h1>
      </div>
      <div className="p-0 flex flex-col">
        {jobs?.length === 0 && (
          <div className="text-center">
            <p className="text-initial-gray">No jobs found</p>
          </div>
        )}
        {jobs?.map((job, index) => (
          <Button
            variant="outline"
            key={job._id}
            className={`rounded-none ${index === 0 && "border-b-0"}`}
            onClick={() => updateSearchParams("query", job.title)}
          >
            {job.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default PopularJobsInfo;
