"use client";

import React from "react";
import { ListFilter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { JobsFiltersData } from "@/constants";
import FilterHandler from "./FilterHandler";

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
      <Card>
        <CardContent className="pt-5">
          {JobsFiltersData.map((filterGroup) => (
            <FilterHandler
              key={filterGroup.id}
              title={filterGroup.title}
              checkboxes={filterGroup.checkboxes}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterJobs;
