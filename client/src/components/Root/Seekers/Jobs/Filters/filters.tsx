"use client";
import React, { useState } from "react";
import { Card } from "@/components/shared/Card";
import { CardContent } from "@/components/shared/Card/card";
import { Checkbox } from "@/components/shared/Checkbox";
import { ListFilter } from "lucide-react";
import { FiltersCheckboxesTypes, FiltersContentProps } from "./types";
import { JobsFiltersData } from "@/constants/jobs";
import useSearchParams from "@/hooks/useSearchParams";

const Filters: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 justify-between">
        <div>
          <h1 className="text-base-black">Filters</h1>
        </div>
        <div>
          <ListFilter />
        </div>
      </div>
      <div>Selected</div>
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
  const { filters, setFilters, updateURL } = useSearchParams();
  const handleCheckboxChange = (type: any, value: any, isChecked: boolean) => {
    const updatedFilters: any = { ...filters };
    if (isChecked) {
      // Add value to the filter
      if (updatedFilters[type]) {
        updatedFilters[type] = Array.from(
          new Set([...updatedFilters[type], value])
        );
      } else {
        updatedFilters[type] = [value];
      }
    } else {
      // Remove value from the filter
      if (updatedFilters[type]) {
        updatedFilters[type] = updatedFilters[type].filter(
          (v: any) => v !== value
        );
        if (updatedFilters[type].length === 0) {
          delete updatedFilters[type];
        }
      }
    }
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  return (
    <div
      key={id}
      className="flex flex-col gap-6 border-b border-gray-300 pb-10"
    >
      <div>
        <h1 className="text-base-black">{title}</h1>
      </div>
      <div className="flex flex-col gap-6">
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id}>
            <Checkbox
              label={checkbox.title}
              checked={
                filters[checkbox.type]?.includes(checkbox.value) ?? false
              }
              onChange={(e) =>
                handleCheckboxChange(
                  checkbox.type,
                  checkbox.value,
                  e.target.checked
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Filters };
