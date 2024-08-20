import React from "react";
import { twMerge } from "tailwind-merge";
import { InputProps, InputVariants, LabelVariants } from "./types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, variant = "default", className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[0.6em]">
        {label && (
          <label className={twMerge("font-medium", LabelVariants[variant])}>
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          className={twMerge(
            "p-3 rounded-lg leading-6 font-light border disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none transition-colors",
            className,
            InputVariants[variant]
          )}
        />
      </div>
    );
  }
);

export { Input };
