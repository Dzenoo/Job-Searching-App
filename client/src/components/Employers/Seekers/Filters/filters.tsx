import React from "react";
import { FilterSeekersProps } from "./types";
import { ListFilter } from "lucide-react";
import { Card, CardContent } from "@/components/Shared/Card";
import { FiltersCheckboxesSection } from "@/components/shared/FiltersCheckboxesSection";
import { SeekersFiltersData } from "@/constants/filters/seekers";

const FilterSeekers: React.FC<FilterSeekersProps> = () => {
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
            {SeekersFiltersData.map((filters) => (
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

export { FilterSeekers };
