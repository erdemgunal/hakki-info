import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import ThemeSwitch from "@/components/ThemeSwitch";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

const HeaderSection = ({ resumeData }) => (
  <div className="flex flex-col-reverse items-start justify-between gap-6 sm:gap-8 md:flex-row md:items-center">
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white font-lora">
          {resumeData.name}
        </h1>
        <ThemeSwitch />
      </div>
      <p className="text-sm sm:text-base md:text-lg text-pretty font-mono text-gray-600 dark:text-[#B8B8B8]">
        {resumeData.about}
      </p>
      <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-gray-600 dark:text-[#B8B8B8]">
        <GlobeIcon className="h-4 w-4" />
        <Link
          className="hover:text-blue-500 hover:underline"
          href={resumeData.locationLink}
          target="_blank"
        >
          {resumeData.location}
        </Link>
      </div>
      <div className="flex gap-2 print:hidden">
        <Button
          className="group h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          variant="outline"
          size="icon"
          asChild
        >
          <Link href={`mailto:${resumeData.contact.email}`}>
            <MailIcon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
          </Link>
        </Button>
        <Button
          className="group h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          variant="outline"
          size="icon"
          asChild
        >
          <Link href={`tel:${resumeData.contact.tel}`}>
            <PhoneIcon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
          </Link>
        </Button>
        {resumeData.contact.social.map((social) => (
          <Button
            key={social.name}
            className="group h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            variant="outline"
            size="icon"
            asChild
          >
            <Link href={social.url} target="_blank">
              <social.icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
    <Avatar className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl ring-2 ring-gray-200 dark:ring-gray-800">
      <AvatarImage alt={resumeData.name} src={resumeData.avatarUrl} />
      <AvatarFallback>{resumeData.initials}</AvatarFallback>
    </Avatar>
  </div>
);

export default HeaderSection;