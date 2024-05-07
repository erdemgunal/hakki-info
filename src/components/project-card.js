import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardTitle,
} from "./ui/Card";
import { Badge } from "./ui/Badge";

export function ProjectCard({ title, description, tags, link }) {
  return (
    React.createElement(
      Card,
      { className: "flex flex-col overflow-hidden border border-dark-700 p-3 dark:hover:bg-gray-950 hover:bg-accent"},
      React.createElement(
        CardHeader,
        { className: "" },
        React.createElement(
          "div",
          { className: "space-y-1" },
          React.createElement(
            CardTitle,
            { className: "text-base" },
            link ? (
              React.createElement(
                "a",
                {
                  href: link,
                  target: "_blank",
                  className: "inline-flex items-center gap-1 hover:underline dark:text-white",
                },
                title,
                " ",
                React.createElement("span", { className: "h-1 w-1 rounded-full bg-green-500" })
              )
            ) : (
              title
            )
          ),
          React.createElement(
            "div",
            { className: "hidden font-mono text-xs underline print:visible" },
            link?.replace("https://", "").replace("www.", "").replace("/", "")
          ),
          React.createElement(
            CardDescription,
            { className: "font-mono text-xs dark:text-[#B8B8B8]" },
            description
          )
        )
      ),
      React.createElement(
        CardContent,
        { className: "mt-auto flex" },
        React.createElement(
          "div",
          { className: "mt-2 flex flex-wrap gap-1" },
          tags.map((tag) => (
            React.createElement(
              Badge,
              {
                className: "px-1 py-0 text-[10px]",
                variant: "secondary",
                key: tag,
              },
              tag
            )
          ))
        )
      )
    )
  );
}