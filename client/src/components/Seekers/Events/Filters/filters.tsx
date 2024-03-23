import React from "react";
import { ListFilter } from "lucide-react";
import { Card, CardContent } from "@/components/Shared/Card";
import { EventsFiltersData } from "@/constants/filters/events";
import { FiltersCheckboxesSection } from "@/components/Shared/FiltersCheckboxesSection";

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
      <Card>
        <CardContent>
          <div className="flex flex-col gap-10">
            {EventsFiltersData.map((filters) => (
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

export { FilterEvents };
