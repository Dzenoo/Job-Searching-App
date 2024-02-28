"use client";

import React from "react";
import Protected from "@/components/Hoc/protected";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import { FilterJobs } from "@/components/Root/Seekers/Jobs/Filters";
import { SearchJobs } from "@/components/Root/Seekers/Jobs/Search";

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <section className="flex gap-3 justify-between">
      <div className="basis-1/2">Popular</div>
      <div className="basis-full grow flex flex-col gap-3">
        <div>
          <SearchJobs />
        </div>
        <div>
          <JobsList />
        </div>
      </div>
      <div className="basis-1/2">
        <FilterJobs />
      </div>
    </section>
  );
};

export default Protected(Jobs, ["seeker"]);
