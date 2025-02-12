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
    <div className="flex flex-col-reverse gap-6 sm:gap-8 md:flex-row md:items-start">
      <div className="flex-1 space-y-4 sm:space-y-5">
        {/* Profile Info */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {resumeData.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <GlobeIcon className="h-4 w-4" />
              <Link
                className="hover:text-blue-500 transition-colors"
                href={resumeData.locationLink}
                target="_blank"
              >
                <span className={oxygen.className}>{resumeData.location}</span>
              </Link>
            </div>
          </div>
          <ThemeSwitch />
        </div>

        <p className={cn('text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed', oxygen.className)}>
          {resumeData.about}
        </p>

        {/* Interactive Buttons Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 print:hidden">
          {/* Resume Section */}
          <Button
            className="w-full sm:w-auto group bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            variant="outline"
            asChild
          >
            <Link href="/resume.pdf" target="_blank">
              <FileText className="mr-2 h-4 w-4" />
              <span>Resume</span>
            </Link>
          </Button>

          {/* Contact Section */}
          <div className="flex w-full sm:w-auto gap-2">
            <Button
              className="flex-1 sm:flex-none group bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href={`mailto:${resumeData.contact.email}`}>
                <MailIcon className="h-4 w-4 text-gray-600 group-hover:text-blue-500 dark:text-gray-400" />
              </Link>
            </Button>
            <Button
              className="flex-1 sm:flex-none group bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              variant="outline"
              size="icon"
              asChild
            >
              <Link href={`https://wa.me/${resumeData.contact.tel}`}>
                <MessageCircle className="h-4 w-4 text-gray-600 group-hover:text-blue-500 dark:text-gray-400" />
              </Link>
            </Button>
          </div>

          {/* Social Media Section */}
          <div className="flex w-full sm:w-auto gap-2">
            {resumeData.contact.social.map((social) => (
              <Button
                key={social.name}
                className="flex-1 sm:flex-none group bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                variant="outline"
                size="icon"
                asChild
              >
                <Link href={social.url} target="_blank">
                  <social.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-500 dark:text-gray-400" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-xl ring-2 ring-gray-200 dark:ring-gray-800 shadow-md">
        <AvatarImage alt={resumeData.name} src={resumeData.avatarUrl} />
        <AvatarFallback>{resumeData.initials}</AvatarFallback>
      </Avatar>
    </div>
  )
};