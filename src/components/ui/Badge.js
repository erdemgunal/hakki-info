import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Oxygen } from "next/font/google";

const oxygen = Oxygen({ subsets: ["latin"], weight: "400", display: "swap" });

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-[#007AFF] bg-[#007AFF] text-white hover:bg-[#0051FF] dark:border-[#0A84FF] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF]",
        destructive:
          "border-[#FF3B30] bg-[#FF3B30] text-white hover:bg-[#FF6961] dark:border-[#FF453A] dark:bg-[#FF453A] dark:hover:bg-[#FF6961]",
        outline:
          "border-[#8E8E93] bg-white text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#48484A] dark:bg-[#1C1C1E] dark:text-[#EBEBF0] dark:hover:bg-[#2C2C2E]",
        secondary:
          "border-[#E5E5EA] bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:border-[#2C2C2E] dark:bg-[#2C2C2E] dark:text-[#EBEBF0] dark:hover:bg-[#3A3A3C]",
        ghost:
          "border-transparent text-[#8E8E93] hover:bg-[#F2F2F7] dark:text-[#98989D] dark:hover:bg-[#2C2C2E]",
        link:
          "border-transparent text-[#007AFF] underline-offset-4 hover:underline dark:text-[#0A84FF]",
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
        className: cn(badgeVariants({ variant }), className, oxygen.className),
        ...props
      }
    )
  );
}

export { Badge, badgeVariants };
