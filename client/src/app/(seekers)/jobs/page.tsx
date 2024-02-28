"use client";

import React from "react";
import Protected from "@/components/Hoc/protected";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import { FilterJobs } from "@/components/Root/Seekers/Jobs/Filters";
import { SearchJobs } from "@/components/Root/Seekers/Jobs/Search";
import { Pagination } from "@/components/shared/Pagination";
import { PopularJobsInfo } from "@/components/Root/Seekers/Jobs/popular";

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <section className="flex gap-7 justify-between py-6">
      <div className="basis-1/2">
        <PopularJobsInfo />
      </div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchJobs />
        </div>
        <div>
          <JobsList />
        </div>
        <div className="py-6">
          <Pagination
            totalItems={100}
            itemsPerPage={10}
            currentPage={Number(searchParams?.page) || 1}
            visiblePages={6}
          />
        </div>
      </div>
      <div className="basis-1/2">
        <FilterJobs />
      </div>
    </section>
  );
};

export default Protected(Jobs, ["seeker"]);
