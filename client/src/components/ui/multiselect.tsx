import React, { useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full justify-between"
      >
        <span>
          {selectedValues.length > 0 ? selectedValues.join(", ") : placeholder}
        </span>
      </Button>
      {open && (
        <Command className="absolute top-full left-0 mt-2 w-full z-10 bg-white border rounded-md shadow-lg">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={
                    selectedValues.includes(option.value) ? "bg-blue-100" : ""
                  }
                >
                  <span>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <X className="ml-auto h-4 w-4" />
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
