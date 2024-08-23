import React from "react";
import { ListFilter } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import FilterHandler from "@/components/shared/FilterHandler";

import { SeekersFiltersData } from "@/constants";

const FilterSeekers: React.FC = () => {
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
          <div className="flex flex-col gap-10">
            {SeekersFiltersData.map((filters) => (
              <FilterHandler
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

export default FilterSeekers;
