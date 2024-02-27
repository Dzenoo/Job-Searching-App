"use client";

import React from "react";
import Protected from "@/components/Hoc/protected";
import { JobsList } from "@/components/Root/Seekers/Jobs";
import { Filters } from "@/components/Root/Seekers/Jobs/Filters";

const Jobs = () => {
  return (
    <section className="flex gap-3 justify-between">
      <div className="basis-1/2">Popular</div>
      <div className="basis-full grow">
        <JobsList />
      </div>
      <div className="basis-1/2">
        <Filters />
      </div>
    </section>
  );
};

export default Protected(Jobs);
