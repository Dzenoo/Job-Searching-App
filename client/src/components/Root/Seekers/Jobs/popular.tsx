import { Card, CardContent } from "@/components/shared/Card";
import React from "react";

const PopularJobsInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base-black">Popular Job Titles</h1>
      </div>
      <Card>
        <CardContent className="flex flex-col gap-3">
          <p className="text-initial-blue">Frontend Developer</p>
          <p className="text-initial-blue">Backend Developer</p>
          <p className="text-initial-blue">Data Scientist</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { PopularJobsInfo };
