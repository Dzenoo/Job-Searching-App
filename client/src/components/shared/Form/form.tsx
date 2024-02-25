import React from "react";
import { twMerge } from "tailwind-merge";
import {
  FormInfoProps,
  FormInfoVariants,
  FormItemProps,
  FormProps,
} from "./types";

const Form = React.forwardRef<
  HTMLFormElement,
  FormProps<React.FormHTMLAttributes<HTMLFormElement>>
>(({ className, children, ...props }, ref) => {
  return (
    <form ref={ref} {...props} className={twMerge("px-3", className)}>
      {children}
    </form>
  );
});

const FormItem = React.forwardRef<
  HTMLDivElement,
  FormItemProps<React.HTMLAttributes<HTMLDivElement>>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={twMerge("py-3 flex flex-col gap-3", className)}
    >
      {children}
    </div>
  );
});

const FormInfo = React.forwardRef<HTMLParagraphElement, FormInfoProps>(
  ({ children, variant = "default", className, ...props }, ref) => {
    return (
      <div>
        <p
          ref={ref}
          {...props}
          className={twMerge(
            "text-[16px] font-light leading-3",
            className,
            FormInfoVariants[variant]
          )}
        >
          {children}
        </p>
      </div>
    );
  }
);

export { Form, FormItem, FormInfo };
