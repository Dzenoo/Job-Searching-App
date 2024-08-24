import React from "react";

import { ListFilter } from "lucide-react";

import FilterHandler from "@/components/shared/FilterHandler";

import { EventsFiltersData } from "@/constants";

const FilterEvents: React.FC = () => {
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
      {EventsFiltersData.map((filters) => (
        <FilterHandler
          key={filters.id}
          title={filters.title}
          checkboxes={filters.data}
        />
      ))}
    </div>
  );
};

export default FilterEvents;
