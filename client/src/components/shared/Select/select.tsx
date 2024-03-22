import React from "react";
import { twMerge } from "tailwind-merge";
import {
  LabelVariants,
  OptionProps,
  SelectProps,
  SelectVariants,
} from "./types";

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, variant = "default", className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[0.6em]">
        {label && (
          <label className={twMerge("font-medium", LabelVariants[variant])}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          {...props}
          className={twMerge(
            "p-3 rounded-lg border cursor-pointer overflow-auto min-w-40 focus:outline-none text-gray-900 font-light leading-6 transition-colors",
            className,
            SelectVariants[variant]
          )}
        >
          {options.map((option: OptionProps) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export { Select };
