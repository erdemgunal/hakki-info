import { fetchResumeData, getAllProjects } from '@/lib/fetch-resume-data';
import Link from 'next/link';
import Image from 'next/image';
import { renderBadges, renderTechStackBadges } from '@/lib/badge-utils';
import { Button } from '@/components/ui/button';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';
import { PageShell, PageHeader } from '@/components/layout';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';

export default async function ProjectsPage() {
    const path = '/projects';
    const [resumeData, projects] = await Promise.all([fetchResumeData(), getAllProjects()]);
    const { social } = resumeData;
    const githubUrl =
        social?.find((s) => s.iconKey === 'github' || s.name === 'GitHub')?.url || '#';

    return (
        <main id="main-content" className="min-h-screen bg-background">
            <PageShell className="pb-4 sm:pb-6 md:pb-8">
                <PageHeader
                    title="Projects"
                    description="Explore my portfolio of projects showcasing automation, fullstack development and innovative solutions."
                />

                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <Link
                            key={index}
                            href={`/projects/${project.slug}`}
                            data-umami-event="project-click"
                            data-umami-event-slug={project.slug}
                            className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 motion-reduce:transition-none hover:border-foreground/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            <div className="relative h-48 sm:h-56 overflow-hidden bg-background">
                                <Image
                                    src={project.images[0] || '/placeholder-light.svg'}
                                    alt={`${project.title} - Full Stack Development Project by Hakkı Günal`}
                                    fill
                                    className="object-cover transition-all duration-300 motion-reduce:transition-none grayscale-[0.25] contrast-105 group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-115"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-200 motion-reduce:transition-none" />

                                <div className="absolute top-4 left-4">
                                    {renderBadges(
                                        [project.label],
                                        'outline',
                                        'text-xs bg-background/80 backdrop-blur-sm',
                                    )}
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <span className="rounded bg-black/50 px-2 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-sm">
                                        {project.year}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                                <div className="flex-1">
                                    <h2 className="mb-2 text-lg sm:text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                                        {project.title}
                                    </h2>

                                    <p className="mb-4 line-clamp-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                                        {project.description}
                                    </p>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {renderTechStackBadges(
                                            project.techStack.slice(0, 3),
                                            3,
                                            'outline',
                                            'text-xs',
                                        )}
                                        {project.techStack.length > 3 && (
                                            <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                                                +{project.techStack.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto border-t border-border pt-4 text-center text-sm font-medium text-accent transition-colors duration-200 motion-reduce:transition-none group-hover:text-foreground">
                                    View Project Details
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 sm:mt-16 text-center">
                    <Button variant="outline" size="lg" asChild className="min-h-11">
                        <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-auto flex items-center gap-2 text-accent"
                            data-umami-event="projects-github"
                        >
                            View more on GitHub
                            <ExternalLinkIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <PageAnalyticsSection path={path} />
            </PageShell>
        </main>
    );
}
