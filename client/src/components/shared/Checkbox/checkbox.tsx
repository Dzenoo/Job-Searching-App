import React from "react";
import { twMerge } from "tailwind-merge";
import { CheckboxProps } from "./types";

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex gap-3 items-center">
        <input
          {...props}
          type="checkbox"
          ref={ref}
          className={twMerge(
            "w-6 h-6 rounded-md cursor-pointer transition-colors border-gray-400 hover:border-gray-600",
            className
          )}
        />
        {label && <label className="font-medium text-gray-900">{label}</label>}
      </div>
    );
  }
);

export { Checkbox };
