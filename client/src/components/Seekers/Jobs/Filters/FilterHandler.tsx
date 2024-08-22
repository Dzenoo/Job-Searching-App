"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import useSearchParams from "@/hooks/useSearchParams";

interface CheckboxOption {
  id: string;
  title: string;
  value: string;
  type: string;
}

interface FilterGroupProps {
  title: string;
  checkboxes: CheckboxOption[];
}

const FilterHandler: React.FC<FilterGroupProps> = ({ title, checkboxes }) => {
  const { filters, checkboxSearchParams } = useSearchParams();

  const handleCheckboxChange = (checked: any, type: string, value: string) => {
    checkboxSearchParams(type, value, checked ? "add" : "remove");
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-5">
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${checkbox.type}-${checkbox.value}`}
              checked={
                filters[checkbox.type]?.includes(checkbox.value) || false
              }
              onCheckedChange={(checked) =>
                handleCheckboxChange(checked, checkbox.type, checkbox.value)
              }
            />
            <label
              htmlFor={`${checkbox.type}-${checkbox.value}`}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {checkbox.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterHandler;
