"use client";

import React from "react";
import { Card } from "@/components/shared/Card";
import { CardContent } from "@/components/shared/Card/card";
import { Checkbox } from "@/components/shared/Checkbox";
import { ListFilter } from "lucide-react";
import { FiltersCheckboxesTypes, FiltersContentProps } from "./types";
import { JobsFiltersData } from "@/constants/jobs";
import useSearchParams from "@/hooks/useSearchParams";

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
            {JobsFiltersData.map((filters) => renderFilterDiv(filters))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const renderFilterDiv = <T extends FiltersContentProps>({
  id,
  title,
  checkboxes,
}: T) => {
  const { filters, updateSearchParams } = useSearchParams();

  return (
    <div
      key={id}
      className="flex flex-col gap-6 border-b border-gray-300 pb-10"
    >
      <div>
        <h1 className="text-base-black">{title}</h1>
      </div>
      <div className="flex flex-col gap-6">
        {checkboxes.map((checkbox: FiltersCheckboxesTypes) => (
          <div key={checkbox.id}>
            <Checkbox
              label={checkbox.title}
              checked={
                filters[checkbox.type]?.includes(checkbox.value) ?? false
              }
              onChange={(e) =>
                updateSearchParams(
                  checkbox.type,
                  checkbox.value,
                  e.target.checked ? "add" : "remove"
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { FilterJobs };
