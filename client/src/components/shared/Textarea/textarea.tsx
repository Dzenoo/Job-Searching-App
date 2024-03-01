import React from "react";
import { LabelVariants, TextareaProps, TextareaVariants } from "./types";
import { twMerge } from "tailwind-merge";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, variant = "default", action, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[0.6em]">
        <div className="flex items-center justify-between gap-3">
          {label && (
            <label className={twMerge("font-medium", LabelVariants[variant])}>
              {label}
            </label>
          )}
          {action && <div>{action}</div>}
        </div>
        <textarea
          ref={ref}
          {...props}
          className={twMerge(
            "p-3 rounded-lg leading-6 font-light border disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none transition-colors max-h-40",
            className,
            TextareaVariants[variant]
          )}
        />
      </div>
    );
  }
);

export { Textarea };
