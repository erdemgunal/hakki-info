import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ title, description, tags, link }) {
  return (
    <Card className="flex flex-col overflow-hidden border border-dark-700 p-3 dark:hover:bg-[#403E3E] hover:bg-accent">
      <CardHeader>
        <div className="space-y-1">
        <CardTitle className="text-base">
            {link ? (
              <Link
                href={link}
                target="_blank"
                className="text-xl inline-flex items-center gap-1 hover:underline dark:text-white"
              >
                {title}
                <span className="h-1 w-1 rounded-full bg-green-500" />
              </Link>
            ) : (
              title
            )}
          </CardTitle>

          {link && (
            <div className="hidden font-mono text-xs underline print:visible">
              {link.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
          )}

          <CardDescription className="font-mono text-sm dark:text-[#B8B8B8]">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="px-1 py-0 text-[12px]"
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}