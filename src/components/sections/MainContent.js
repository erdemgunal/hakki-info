import { Section } from "@/components/ui/Section";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Oxygen } from "next/font/google";
import { cn } from "@/lib/utils";

const oxygen = Oxygen({ subsets: ["latin"], weight: "400", display: "swap" });

export default function MainContent({ resumeData }) {
  const githubUrl = resumeData.contact.social.find(
    (social) => social.name === "GitHub"
  )?.url;

  return (
    <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8">
      {/* About Section */}
      <Section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          About
        </h2>
        <p className={cn("text-sm sm:text-base md:text-lg text-pretty font-mono text-gray-600 dark:text-[#B8B8B8]", oxygen.className)}>
          {resumeData.summary}
        </p>
      </Section>

      {/* Work Experience Section */}
      <Section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Work Experience
        </h2>
        <ul className="list-disc list-outside pl-5 space-y-4 text-gray-900 dark:text-white">
          {resumeData.work.map((work) => (
            <li key={work.company}>
              <Card className="group overflow-hidden">
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="inline-flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                      <Link
                        href={work.link}
                        target="_blank"
                        className={cn("group text-base sm:text-lg font-semibold flex items-center gap-1", oxygen.className)}
                      >
                        <span className="text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400">
                          {work.company}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                      </Link>
                      <div className="flex gap-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="bg-[#E5E5EA] text-[0.65rem] sm:text-xs text-[#007AFF] dark:bg-[#2C2C2E] dark:text-[#0A84FF] px-1.5 sm:px-2"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </h2>
                    <div className={cn('text-sm sm:text-base text-gray-500 dark:text-gray-400', oxygen.className)}>
                      {work.start} - {work.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={cn('text-sm sm:text-base text-pretty font-mono text-gray-600 dark:text-[#B8B8B8] mt-2', oxygen.className)}>
                  {work.description}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Education Section */}
      <Section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>
        <div className="grid gap-4">
          {resumeData.education.map((education) => (
            <Card key={education.school}>
              <CardHeader>
                <div className="flex flex-col gap-1">
                  <h2 className={cn("text-lg font-semibold text-gray-900 dark:text-white", oxygen.className)}>
                    {education.school}
                  </h2>
                  <div className={cn('text-base sm:text-lg text-gray-900 dark:text-white', oxygen.className)}>
                    {education.start} - {education.end}
                  </div>
                </div>
              </CardHeader>
              <CardContent className={cn('text-sm sm:text-base text-pretty font-mono text-gray-600 dark:text-[#B8B8B8]', oxygen.className)}>
                {education.degree}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Languages Section */}
      <Section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Languages
        </h2>
        <div className="grid gap-4">
          {resumeData.languages.map((lang) => (
            <Card key={lang.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className={cn('text-lg font-semibold text-gray-900 dark:text-white', oxygen.className)}>
                    {lang.name}
                  </h2>
                  <Badge className="bg-[#E5E5EA] text-[0.65rem] sm:text-xs text-[#007AFF] dark:bg-[#2C2C2E] dark:text-[#0A84FF] hover:bg-[#D1D1D6] dark:hover:bg-[#3A3A3C] px-1.5 sm:px-2">
                    {lang.level}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill) => (
            <Badge
              key={skill}
              className="bg-[#F2F2F7] text-[0.7rem] sm:text-sm text-[#3A3A3C] hover:bg-[#E5E5EA] hover:text-[#007AFF] dark:bg-[#2C2C2E] dark:text-[#EBEBF0] dark:hover:bg-[#3A3A3C] dark:hover:text-[#0A84FF] border-0 transition-colors duration-200 px-1.5 sm:px-2"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section className="scroll-mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumeData.projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.techStack}
              link={"link" in project ? project.link.href : undefined}
            />
          ))}
        </div>

        {/* "View More" Button */}
        {githubUrl && (
          <div className="mt-6 flex justify-center">
            <Link
              href={githubUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View More Projects
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Section>
    </div>
  )
};