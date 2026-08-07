'use client';

import { Button } from '@/components/ui/button';
import { renderTechStackBadges, renderBadges } from '@/lib/badge-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Section from './Section';
import SectionHeading from '@/components/layout/SectionHeading';
import { useResumeData } from '@/contexts/ResumeDataContext';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Projects() {
    const { projects } = useResumeData();
    const { resolvedTheme } = useTheme();
    const mounted = useIsMounted();

    const getPlaceholderImage = () => {
        if (!mounted) {
            return "/placeholder-light.svg";
        }
        if (resolvedTheme === 'dark') {
            return "/placeholder-dark.svg";
        }
        return "/placeholder-light.svg";
    };

    return (
        <Section id="projects" aria-labelledby="projects-heading">
            <div className="mb-6 sm:mb-8 md:mb-10 text-left">
                <SectionHeading id="projects-heading">Projects</SectionHeading>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.items.map((project, index) => (
                    <Link
                        key={index}
                        href={`/projects/${project.slug}`}
                        data-umami-event="project-click"
                        data-umami-event-slug={project.slug}
                        className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 motion-reduce:transition-none hover:border-foreground/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        <div className="relative h-40 overflow-hidden bg-background">
                            <Image
                                src={project.images[0] || getPlaceholderImage()}
                                alt={`${project.title} - Full Stack Development Project by Hakkı Günal`}
                                fill
                                className="object-cover transition-all duration-300 motion-reduce:transition-none grayscale-[0.25] contrast-105 group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-115"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-200 motion-reduce:transition-none" />

                            <div className="absolute top-4 left-4">
                                {renderBadges([project.label], 'outline', 'text-xs bg-background/80 backdrop-blur-sm')}
                            </div>

                            <div className="absolute bottom-4 right-4">
                                <span className="rounded bg-black/50 px-2 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-sm">
                                    {project.year}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col p-4">
                            <div className="flex-1">
                                <h3 className="mb-2 text-base sm:text-lg font-semibold text-foreground">
                                    {project.title}
                                </h3>

                                <p className="mb-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                                    {project.description}
                                </p>

                                <div className="mb-4 flex flex-wrap gap-2">
                                    {renderTechStackBadges(project.techStack.slice(0, 3), 3, 'outline', 'text-xs')}
                                    {project.techStack.length > 3 && (
                                        <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                                            +{project.techStack.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto border-t border-border pt-4 text-center text-xs sm:text-sm font-medium text-accent transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground">
                                View Project
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 sm:mt-12 text-center">
                <Button variant="outline" size="lg" asChild className="min-h-11">
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 mx-auto text-accent"
                        data-umami-event="nav-view-all-projects"
                    >
                        View all projects
                    </Link>
                </Button>
            </div>
        </Section>
    );
}
