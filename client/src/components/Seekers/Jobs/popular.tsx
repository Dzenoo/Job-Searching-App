import { Card, CardContent } from "@/components/Shared/Card";
import React from "react";
import { PopularsJobsInfoProps } from "./types";
import useSearchParams from "@/hooks/useSearchParams";

const PopularJobsInfo: React.FC<PopularsJobsInfoProps> = ({ jobs }) => {
  const { updateSearchParams } = useSearchParams();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base-black">Popular Job Titles</h1>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-3">
          {jobs?.length === 0 && (
            <div className="text-center">
              <p className="text-initial-gray">No jobs found</p>
            </div>
          )}
          {jobs?.map((job) => (
            <button
              key={job._id}
              className="text-initial-blue"
              onClick={() => updateSearchParams("query", job.title, "add")}
            >
              {job.title}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export { PopularJobsInfo };
