import React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/80 dark:bg-[#0A1322] dark:hover:bg-[#2C2C2C] dark:text-[#3C88DF] dark:hover:text-blue-300 text-primary-foreground hover:bg-primary/60",
        secondary:
          "border-transparent bg-secondary dark:bg-[#0a160d] dark:hover:bg-[#2C2C2C] dark:text-[#449d5d] dark:hover:text-emerald-400 text-secondary-foreground hover:bg-secondary/60",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },

    defaultVariants: {
      variant: "default",
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