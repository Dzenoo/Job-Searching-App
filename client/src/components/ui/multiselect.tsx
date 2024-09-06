import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { Badge } from "./badge";

type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
    );
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        onClick={toggleDropdown}
        className="h-fit flex gap-2 justify-between flex-wrap hover:bg-white"
      >
        {selectedValues.length > 0
          ? selectedValues.map((value) => (
              <Badge key={value} variant="secondary">
                {value}
              </Badge>
            ))
          : placeholder}
      </Button>
      {open && (
        <Command className="h-52 absolute top-full left-0 mt-2 w-full z-10 bg-white border rounded-md shadow-lg dark:bg-[#1b1b1b]">
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={`flex justify-between p-2 ${
                    selectedValues.includes(option.value)
                      ? "bg-blue-100 dark:bg-gray-500"
                      : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <span>&#10003;</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
};

export default MultiSelect;
