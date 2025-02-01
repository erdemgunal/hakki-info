import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-white hover:bg-primary-foreground dark:border-primary-foreground dark:bg-primary-foreground dark:hover:bg-primary",
        destructive:
          "border-destructive bg-destructive text-white hover:bg-destructive-foreground dark:border-destructive dark:bg-destructive-foreground dark:hover:bg-destructive",
        outline:
          "border-gray-200 bg-white text-secondary-foreground hover:bg-gray-100 hover:border-gray-300 dark:border-gray-600 dark:bg-card dark:text-secondary-foreground dark:hover:bg-gray-700 dark:hover:border-gray-500",
        secondary:
          "border-gray-200 bg-gray-100 text-gray-900 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800",
        ghost:
          "border-transparent text-muted hover:bg-muted hover:text-muted-foreground dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-muted-foreground",
        link:
          "border-transparent text-accent underline-offset-4 hover:underline dark:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    React.createElement(
      "div",
      {
        className: cn(badgeVariants({ variant }), className),
        ...props
      }
    )
  );
}

export { Badge, badgeVariants };
