import React from "react";
import { DashboardEmployerJobsProps } from "./types";
import { Table } from "@/components/Shared/Table";
import { formatDate } from "@/utils/date";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";

const DashboardEmployerJobs: React.FC<DashboardEmployerJobsProps> = ({
  jobs,
  currentPage,
  itemsPerPage,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center flex items-center justify-center h-screen overflow-hidden">
        <p className="text-initial-gray">You haven't created any jobs yet.</p>
      </div>
    );
  }

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
    "Options",
  ];

  const transformedJobs = jobs.map((job, ind) => ({
    Index: (currentPage - 1) * itemsPerPage + ind + 1,
    Title: job.title,
    Type: job.type,
    Level: job.level,
    Position: job.position,
    Location: job.location,
    Salary: `${job.salary}$`,
    "Expiration Date": formatDate(job.expiration_date),
    Applications: job.applications?.length ?? 0,
    Options: (
      <div className="flex items-center justify-between gap-3">
        <Link href="/view">
          <Eye />
        </Link>
        <Link href="/edit">
          <Edit />
        </Link>
        <button onClick={() => {}}>
          <Trash color="red" />
        </button>
      </div>
    ),
  }));

  return (
    <Table
      columns={columns}
      data={transformedJobs}
      specialStyles={{
        Salary: "bg-green-100 dark:text-green-600 text-green-600 p-3",
        "Expiration Date": "bg-red-100 dark:text-red-600 text-red-600 p-3",
        Applications:
          "bg-blue-100 dark:text-[--blue-base-color] text-blue-600 p-3",
      }}
    />
  );
};

export { DashboardEmployerJobs };
