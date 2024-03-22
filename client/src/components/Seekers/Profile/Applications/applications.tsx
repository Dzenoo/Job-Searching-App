import React from "react";
import { ApplicationsProps } from "./types";
import { Card, CardContent, CardHeader } from "@/components/Shared/Card";
import { ApplicationsItem } from "./Item";

const Applications: React.FC<ApplicationsProps> = ({ applications }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-base-black">Applications</h1>
          </div>
          <div>
            <p className="text-initial-gray">
              View the status of your job applications below. Stay updated on
              your application progress
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {applications?.length === 0 && (
            <p className="text-initial-gray">No Applications Founded</p>
          )}
        </div>
        <div className="grid gap-3 grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {applications?.map((application) => (
            <ApplicationsItem
              key={application.status}
              application={application}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { Applications };
