import React from "react";
import { FiltersCheckboxesSectionTypes, FiltersCheckboxesTypes } from "./types";
import useSearchParams from "@/hooks/useSearchParams";
import { Checkbox } from "../Checkbox";

const FiltersCheckboxesSection: React.FC<FiltersCheckboxesSectionTypes> = ({
  title,
  checkboxes,
  overflow,
}) => {
  const { filters, updateSearchParams } = useSearchParams();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base-black">{title}</h1>
      </div>
      <div
        className={`flex flex-col gap-6 overflow-y-auto ${overflow && "h-44"}`}
      >
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

export { FiltersCheckboxesSection };
