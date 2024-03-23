"use client";

import React from "react";
import { Card } from "@/components/Shared/Card";
import { CardContent } from "@/components/Shared/Card/card";
import { ListFilter } from "lucide-react";
import { JobsFiltersData } from "@/constants/filters/jobs";
import { FiltersCheckboxesSection } from "@/components/Shared/FiltersCheckboxesSection";

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
        <CardContent>
          <div className="flex flex-col gap-10">
            {JobsFiltersData.map((filters) => (
              <FiltersCheckboxesSection
                key={filters.id}
                title={filters.title}
                checkboxes={filters.checkboxes}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { FilterJobs };
