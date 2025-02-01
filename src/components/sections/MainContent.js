import { Section } from "@/components/ui/Section";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const MainContent = ({ resumeData }) => (
  <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8">
    <Section>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        About
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-pretty font-mono text-gray-600 dark:text-[#B8B8B8]">
        {resumeData.summary}
      </p>
    </Section>

    <Section>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Work Experience
      </h2>
      <ul className="list-disc list-outside pl-5 space-y-4 marker:text-gray-900 dark:marker:text-white">
        {resumeData.work.map((work) => (
          <li key={work.company}>
            <Card className="group overflow-hidden">
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="inline-flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                    <Link
                      href={work.link}
                      target="_blank"
                      className="text-lg font-semibold text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 flex items-center gap-1 group"
                    >
                      {work.company}
                      <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                    </Link>
                    <div className="flex gap-1">
                      {work.badges.map((badge) => (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                          key={badge}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </h2>
                  <div className="text-lg text-gray-900 dark:text-white">
                    {work.start} - {work.end}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-base text-pretty font-mono text-gray-600 dark:text-[#B8B8B8] mt-2">
                {work.description}
              </CardContent>
            </Card>

          </li>
        ))}
      </ul>
    </Section>

    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>
        <div className="grid gap-4">
          {resumeData.education.map((education) => (
            <Card key={education.school}>
              <CardHeader>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {education.school}
                  </h2>
                  <div className="text-lg text-gray-900 dark:text-white">
                    {education.start} - {education.end}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-base text-pretty font-mono text-gray-600 dark:text-[#B8B8B8]">
                {education.degree}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Languages
        </h2>
        <div className="grid gap-4">
          {resumeData.languages.map((lang) => (
            <Card key={lang.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {lang.name}
                  </h2>
                  <Badge
                    className="bg-blue-100 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                  >
                    {lang.level}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    </div>

    <Section>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <Badge
            key={skill}
            className="bg-gray-100 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Section>

    <Section className="scroll-mb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
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
    </Section>
  </div>
);

export default MainContent;