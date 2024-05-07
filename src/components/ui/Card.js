import React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(
  function Card({ className, ...props }, ref) {
    return (
      React.createElement(
        "div",
        {
          ref: ref,
          className: cn("rounded-lg bg-card dark:bg-[#1E1E1E] text-card-foreground", className),
          ...props
        }
      )
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(
  function CardHeader({ className, ...props }, ref) {
    return (
      React.createElement(
        "div",
        {
          ref: ref,
          className: cn("flex flex-col space-y-1.5", className),
          ...props
        }
      )
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(
  function CardTitle({ className, ...props }, ref) {
    return (
      React.createElement(
        "h3",
        {
          ref: ref,
          className: cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
          ),
          ...props
        }
      )
    );
  }
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(
  function CardDescription({ className, ...props }, ref) {
    return (
      React.createElement(
        "p",
        {
          ref: ref,
          className: cn("text-sm text-muted-foreground", className),
          ...props
        }
      )
    );
  }
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(
  function CardContent({ className, ...props }, ref) {
    return (
      React.createElement(
        "div",
        {
          ref: ref,
          className: cn(
            "text-pretty font-mono text-sm text-muted-foreground dark:text-[#B8B8B8]",
            className
          ),
          ...props
        }
      )
    );
  }
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(
  function CardFooter({ className, ...props }, ref) {
    return (
      React.createElement(
        "div",
        {
          ref: ref,
          className: cn("flex items-center", className),
          ...props
        }
      )
    );
  }
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
