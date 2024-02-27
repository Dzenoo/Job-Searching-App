"use client";
import React from "react";
import { Card } from "@/components/shared/Card";
import { CardContent } from "@/components/shared/Card/card";
import { Checkbox } from "@/components/shared/Checkbox";
import { ListFilter } from "lucide-react";
import { FiltersCheckoxesTypes, FiltersContentProps } from "./types";
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
  const { updateSearchParams, deleteSearchParams, searchParams } =
    useSearchParams();

  function handleCheckboxFilters(
    e: React.ChangeEvent<HTMLInputElement>,
    checkbox: FiltersCheckoxesTypes
  ) {
    const selectedValues: string[] =
      searchParams.get(checkbox.type)?.split(",") || [];

    if (e.target.checked) {
      selectedValues.push(checkbox.value);
    } else {
      const index = selectedValues.indexOf(checkbox.value);
      if (index !== -1) {
        selectedValues.splice(index, 1);
      }
    }

    if (selectedValues.length > 0) {
      updateSearchParams({
        type: checkbox.type,
        value: selectedValues.join(","),
      });
    } else {
      deleteSearchParams({ type: checkbox.type, value: "" });
    }
  }

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
          <div
            key={checkbox.id}
            className="flex items-center justify-between gap-3"
          >
            <div>
              <Checkbox
                label={checkbox.title}
                onChange={(e) => handleCheckboxFilters(e, checkbox)}
              />
            </div>
            <div>
              <p>({checkbox.count})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Filters };
