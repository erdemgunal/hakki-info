import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-[#007AFF] text-white hover:bg-[#0051FF] dark:bg-[#0A84FF] dark:hover:bg-[#409CFF]",
        destructive:
          "bg-[#FF3B30] text-white hover:bg-[#FF6961] dark:bg-[#FF453A] dark:hover:bg-[#FF6961]",
        outline:
          "border border-[#8E8E93] bg-white text-[#3A3A3C] hover:bg-[#F2F2F7] dark:border-[#48484A] dark:bg-[#1C1C1E] dark:text-[#EBEBF0] dark:hover:bg-[#2C2C2E]",
        secondary:
          "bg-[#E5E5EA] text-[#3A3A3C] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:text-[#EBEBF0] dark:hover:bg-[#3A3A3C]",
        ghost: 
          "text-[#3A3A3C] hover:bg-[#F2F2F7] dark:text-[#EBEBF0] dark:hover:bg-[#2C2C2E]",
        link: 
          "text-[#007AFF] underline-offset-4 hover:underline dark:text-[#0A84FF]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };