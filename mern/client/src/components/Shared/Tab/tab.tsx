"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { TabProps } from "./types";

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ children, className, selected, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          `p-4 rounded-md border transition-colors  `,
          `${
            selected
              ? "border-blue-700 bg-blue-100 transition-colors"
              : "border-gray-400 bg-none hover:bg-gray-100"
          }`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export { Tab };
