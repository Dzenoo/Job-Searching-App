import React from "react";
import { LabelVariants, RadioProps } from "./types";
import { twMerge } from "tailwind-merge";

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, variant, ...props }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <input
          type="radio"
          ref={ref}
          {...props}
          className={twMerge(
            "cursor-pointer form-radio text-primary focus:ring-primary focus:ring-offset-2 h-5 w-5",
            className
          )}
        />
        {label && (
          <label className={twMerge("font-medium", LabelVariants[variant])}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

export { Radio };
