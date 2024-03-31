import React from "react";
import { DashboardEmployerJobsProps } from "./types";
import { Table } from "@/components/Shared/Table";
import { formatDate } from "@/utils/date";

const DashboardEmployerJobs: React.FC<DashboardEmployerJobsProps> = ({
  jobs,
  currentPage,
  itemsPerPage,
}) => {
  const columns = [
    "Index",
    "Title",
    "Type",
    "Level",
    "Position",
    "Location",
    "Salary",
    "Expiration Date",
    "Applications",
  ];

  const transformedJobs = jobs.map((job, ind) => ({
    Index: (currentPage - 1) * itemsPerPage + ind + 1,
    Title: job?.title,
    Type: job?.type,
    Level: job?.level,
    Position: job?.position,
    Location: job?.location,
    Salary: job?.salary + "$",
    "Expiration Date": formatDate(job?.expiration_date),
    Applications: job.applications?.length,
  }));

  return (
    <div>
      {jobs?.length > 0 ? (
        <Table
          columns={columns}
          data={transformedJobs}
          specialStyles={{
            Salary: "bg-green-100 dark:text-green-600 text-green-600 p-3",
            "Expiration Date": "bg-red-100 dark:text-red-600 text-red-600 p-3",
            Applications: "bg-blue-100 dark:text-blue-600 text-blue-600 p-3",
          }}
        />
      ) : (
        <div className="text-center flex items-center justify-center h-screen overflow-hidden">
          <p className="text-initial-gray">You haven't created any jobs yet.</p>
        </div>
      )}
    </div>
  );
};

export { DashboardEmployerJobs };
