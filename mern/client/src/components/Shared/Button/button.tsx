import React from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps, ButtonVariants } from "./types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={twMerge(
          "p-3 rounded-lg font-medium dark:text-white leading-6 disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
          className,
          ButtonVariants[variant]
        )}
      >
        {children}
      </button>
    );
  }
);

export { Button };
