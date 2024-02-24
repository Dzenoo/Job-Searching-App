import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { type LinkProps, LinkVariants } from "./types";

const LinkElement = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, className, variant, ...props }, ref) => {
    return (
      <Link
        className={twMerge(
          "px-6 py-3 rounded-lg leading-6 disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
          className,
          LinkVariants[variant]
        )}
        ref={ref}
        {...props}
        href={href}
      >
        {children}
      </Link>
    );
  }
);

export { LinkElement };
