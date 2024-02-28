import React from "react";
import { twMerge } from "tailwind-merge";
import {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "./types";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={twMerge("py-3", className)}>
        {children}
      </div>
    );
  }
);

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge("py-3 border-t border-gray-300", className)}
      >
        {children}
      </div>
    );
  }
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={twMerge("py-3", className)}>
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
