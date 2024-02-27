import React from "react";
import { twMerge } from "tailwind-merge";
import {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "./types";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className="py-3">
        {children}
      </div>
    );
  }
);

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        className={twMerge(
          "rounded-lg shadow-lg bg-white p-6 overflow-auto flex flex-col gap-3",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export { Card, CardContent, CardHeader, CardFooter };
