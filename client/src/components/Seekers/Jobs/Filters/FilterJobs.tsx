"use client";

import React from "react";

import { ListFilter } from "lucide-react";

import FilterHandler from "@/components/shared/FilterHandler";

import { JobsFiltersData } from "@/constants";

const FilterJobs: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 justify-between">
        <div>
          <h1 className="text-base-black">Filters</h1>
        </div>
        <div>
          <ListFilter />
        </div>
      </div>
      {JobsFiltersData.map((filterGroup) => (
        <FilterHandler
          key={filterGroup.id}
          title={filterGroup.title}
          checkboxes={filterGroup.data}
        />
      ))}
    </div>
  );
};

export default FilterJobs;
