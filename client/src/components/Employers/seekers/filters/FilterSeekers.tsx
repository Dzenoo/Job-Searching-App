import React from "react";
import { ListFilter } from "lucide-react";

import FilterHandler from "@/components/shared/FilterHandler";

import { SkillsInformationsData } from "@/constants";

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
      <div className="flex flex-col gap-10">
        {SkillsInformationsData.map((filters) => (
          <FilterHandler
            key={filters.id}
            title={filters.category}
            checkboxes={filters.data}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSeekers;
