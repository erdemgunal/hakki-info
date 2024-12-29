import { RESUME_DATA } from "@/data/resume-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/project-card";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1E1E] dark:to-[#141414]">
      <div className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 lg:p-24">
        <section className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-[#1E1E1E] print:space-y-6">
          {/* Header Section */}
          <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-400">
                  {RESUME_DATA.name}
                </h1>
                <ThemeSwitch />
              </div>
              <p className="max-w-md text-pretty font-mono text-sm text-gray-700 dark:text-[#B8B8B8]">
                {RESUME_DATA.about}
              </p>
              <div className="flex items-center gap-2 font-mono text-sm text-gray-600 dark:text-[#B8B8B8]">
                <GlobeIcon className="h-4 w-4"/>
                <a className="hover:text-blue-500 hover:underline" href={RESUME_DATA.locationLink} target="_blank">
                  {RESUME_DATA.location}
                </a>
              </div>
              <div className="flex gap-2 print:hidden">
                <Button className="group h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700" variant="outline" size="icon" asChild>
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400"/>
                  </a>
                </Button>
                <Button className="group h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700" variant="outline" size="icon" asChild>
                  <a href={`tel:${RESUME_DATA.contact.tel}`}>
                    <PhoneIcon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400"/>
                  </a>
                </Button>
                {RESUME_DATA.contact.social.map((social) => (
                  <Button
                    key={social.name}
                    className="group h-9 w-9 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={social.url} target="_blank">
                      <social.icon className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-500 dark:text-gray-400" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            <Avatar className="h-32 w-32 rounded-xl ring-2 ring-gray-200 dark:ring-gray-800">
              <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
              <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Main Content */}
          <div className="mt-8 grid gap-8">
            <Section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About</h2>
              <p className="text-pretty font-mono text-sm text-gray-600 dark:text-[#B8B8B8]">
                {RESUME_DATA.summary}
              </p>
            </Section>

            <Section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
              <div className="grid gap-4">
                {RESUME_DATA.work.map((work) => (
                  <Card key={work.company} className="group overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="inline-flex items-center gap-2">
                          <a className="text-lg font-semibold text-gray-900 hover:text-blue-500 dark:text-white" href={work.link}>
                            {work.company}
                          </a>
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
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-[#B8B8B8]">
                          {work.start} - {work.end}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600 dark:text-[#B8B8B8]">
                      {work.description}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>

            <div className="grid gap-8 md:grid-cols-2">
              <Section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
                <div className="grid gap-4">
                  {RESUME_DATA.education.map((education) => (
                    <Card key={education.school}>
                      <CardHeader>
                        <div className="flex flex-col gap-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {education.school}
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-[#B8B8B8]">
                            {education.start} - {education.end}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-600 dark:text-[#B8B8B8]">
                        {education.degree}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Section>

              <Section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h2>
                <div className="grid gap-4">
                  {RESUME_DATA.languages.map((lang) => (
                    <Card key={lang.name}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {lang.name}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.map((skill) => (
                  <Badge key={skill} className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Section>

            <Section className="scroll-mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {RESUME_DATA.projects.map((project) => (
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
        </section>
      </div>
    </main>
  );
}