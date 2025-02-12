import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import ThemeSwitch from "@/components/ThemeSwitch";
import { FileText, GlobeIcon, MailIcon, MessageCircle } from "lucide-react";  // Add FileText import
import Link from "next/link";

import { Oxygen } from "next/font/google";
import { cn } from "@/lib/utils";

const oxygen = Oxygen({ subsets: ["latin"], weight: "400", display: "swap" });

export default function HeaderSection({ resumeData }){
  return (
    <div className="flex flex-col-reverse items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-center">
      <div className="flex-1 space-y-3 sm:space-y-4 w-full">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            {resumeData.name}
          </h1>
          <ThemeSwitch />
        </div>
        <p className={cn('text-sm sm:text-base md:text-lg text-pretty text-gray-600 dark:text-[#B8B8B8]', oxygen.className)}>
          {resumeData.about}
        </p>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-600 dark:text-[#B8B8B8]">
          <GlobeIcon className="h-4 w-4" />
          <Link
            className="hover:text-blue-500 hover:underline"
            href={resumeData.locationLink}
            target="_blank"
          >
            <p className={cn('transition-colors', oxygen.className)}>
              {resumeData.location}
            </p>
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <Button
            className="group inline-flex items-center gap-1 sm:gap-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            variant="outline"
            asChild
          >
            <Link href="/resume.pdf" target="_blank">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Resume</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <Button
              className="group h-8 w-8 sm:h-9 sm:w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href={`mailto:${resumeData.contact.email}`}>
                <MailIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
              </Link>
            </Button>
            <Button
              className="group h-8 w-8 sm:h-9 sm:w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href={`https://wa.me/${resumeData.contact.tel}`}>
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
              </Link>
            </Button>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            {resumeData.contact.social.map((social) => (
              <Button
                key={social.name}
                className="group h-8 w-8 sm:h-9 sm:w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                variant="outline"
                size="icon"
                asChild
              >
                <Link href={social.url} target="_blank">
                  <social.icon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl ring-2 ring-gray-200 dark:ring-gray-800">
        <AvatarImage alt={resumeData.name} src={resumeData.avatarUrl} />
        <AvatarFallback>{resumeData.initials}</AvatarFallback>
      </Avatar>
    </div>
  )
};