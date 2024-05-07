import { RESUME_DATA } from "@/data/resume-data";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import ThemeSwitch from "@/components/ThemeSwitch";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/project-card";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white dark:bg-[#1E1E1E] print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <div className="flex-grow flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold dark:text-white">{RESUME_DATA.name}</h1>
              </div>
              <ThemeSwitch />
            </div>
            <p className="max-w-md text-pretty font-mono text-sm dark:text-[#B8B8B8] text-muted-foreground">
              {RESUME_DATA.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs dark:text-[#B8B8B8] text-muted-foreground">
              <a className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline" href={RESUME_DATA.locationLink} target="_blank">
                <GlobeIcon className="h-3 w-3"/>
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              <Button className="h-8 w-8" variant="outline" size="icon" asChild>
                <a href={`mailto:${RESUME_DATA.contact.email}`}>
                  <MailIcon className="h-4 w-4"/>
                </a>
              </Button>
              <Button className="h-8 w-8" variant="outline" size="icon" asChild>
                <a href={`tel:${RESUME_DATA.contact.tel}`}>
                  <PhoneIcon className="h-4 w-4"/>
                </a>
              </Button>
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="h-8 w-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url} target="_blank">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <Avatar className="h-28 w-28">
            <AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold dark:text-white">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground dark:text-[#B8B8B8]">
            {RESUME_DATA.summary}
          </p>
        </Section>
        <Section>
          <h2 className="text-xl font-bold dark:text-white">Work Experience</h2>
          {RESUME_DATA.work.map((work) => {
            return (
              <Card key={work.company}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a className="hover:underline dark:text-white" href={work.link}>
                        {work.company}
                      </a>

                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500 dark:text-[#B8B8B8]">
                      {work.start} - {work.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 text-sm">
                  {work.description}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold dark:text-white">Education</h2>
          {RESUME_DATA.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none dark:text-white">
                      {education.school}
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500 dark:text-[#B8B8B8]">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2">
                  {education.degree}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold dark:text-white">Awards and Certifications</h2>
          {RESUME_DATA.certs.map((cert) => {
            return (
              <Card key={cert.title}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a className={`hover:${cert.link ? 'underline' : 'no-underline'} dark:text-white`} href={cert.link || undefined}>
                        {cert.title}
                      </a>
                    </h3>
                    
                    <div className="text-sm tabular-nums text-gray-500 dark:text-[#B8B8B8]">
                      {cert.end ? `${cert.start} - ${cert.end}` : cert.start}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2">
                  {cert.description}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold dark:text-white">Languages</h2>
          {RESUME_DATA.languages.map((lang) => {
            return (
              <Card key={lang.name}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none dark:text-white">
                      {lang.name}
                      <span className="inline-flex gap-x-1">
                        <Badge
                          variant="secondary"
                          className="align-middle text-xs"
                        >
                          {lang.level}
                        </Badge>
                      </span>
                    </h3>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </Section>
        <Section>
          <h2 className="text-xl font-bold dark:text-white">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {RESUME_DATA.skills.map((skill) => {
              return <Badge key={skill}>{skill}</Badge>;
            })}
          </div>
        </Section>
        <Section className="print-force-new-page scroll-mb-16">
          <h2 className="text-xl font-bold dark:text-white">Projects</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
            {RESUME_DATA.projects.map((project) => {
              return (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.techStack}
                  link={"link" in project ? project.link.href : undefined}
                />
              );
            })}
          </div>
        </Section>
      </section>
    </main>
  );
}
