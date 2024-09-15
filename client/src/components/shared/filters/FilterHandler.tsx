"use client";

import React, { useState } from "react";

import useSearchParams from "@/hooks/useSearchParams";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface CheckboxOption {
  id: string;
  title: string;
  value: string;
  type: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  checkboxes: CheckboxOption[];
  initialVisibleCount?: number;
}

const FilterHandler: React.FC<FilterGroupProps> = ({
  title,
  checkboxes,
  initialVisibleCount = 5,
}) => {
  const { filters, checkboxSearchParams } = useSearchParams();
  const [showAll, setShowAll] = useState(false);

  const handleCheckboxChange = (checked: any, type: string, value: string) => {
    checkboxSearchParams(type, value, checked ? "add" : "remove");
  };

  const handleShowMoreToggle = () => {
    setShowAll((prev) => !prev);
  };

  const visibleCheckboxes = showAll
    ? checkboxes
    : checkboxes.slice(0, initialVisibleCount);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filter-group">
        <AccordionTrigger>
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-5">
            {visibleCheckboxes.map((checkbox) => (
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
                  className="flex justify-between gap-2 max-sm:flex-col text-sm font-medium leading-none cursor-pointer"
                >
                  {checkbox.title} ({checkbox.count || 0})
                </label>
              </div>
            ))}
          </div>
          {checkboxes.length > initialVisibleCount && (
            <button
              className="mt-3 text-blue-500 text-sm cursor-pointer"
              onClick={handleShowMoreToggle}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterHandler;
