import React from "react";

import useSearchParams from "@/hooks/useSearchParams";

import { Card, CardContent } from "@/components/ui/card";

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
      <Card>
        <CardContent>
          {jobs?.length === 0 && (
            <div className="text-center">
              <p className="text-initial-gray">No jobs found</p>
            </div>
          )}
          {jobs?.map((job) => (
            <button
              key={job._id}
              className="text-initial-blue"
              onClick={() => updateSearchParams("query", job.title)}
            >
              {job.title}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default PopularJobsInfo;
