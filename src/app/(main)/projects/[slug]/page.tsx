import { getProjectSlugs, fetchProjectBySlug } from '@/lib/fetch-resume-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { renderBadges, renderTechStackBadges } from '@/lib/badge-utils';
import { Button } from '@/components/ui/button';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';

export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);
    if (!project) notFound();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors"
                >
                    <span aria-hidden>←</span>
                    Back to projects
                </Link>

                <header className="mb-8 sm:mb-12">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        {renderBadges([project.label], 'outline', 'text-xs bg-background/80')}
                        <span className="text-sm text-muted-foreground">{project.year}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </header>

                {project.images.length > 0 && (
                    <section className="mb-10 sm:mb-14">
                        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                            {project.images.map((src, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-video sm:aspect-16/10 rounded-lg border border-border overflow-hidden bg-muted"
                                >
                                    <Image
                                        src={src}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="space-y-8 sm:space-y-10 mb-10 sm:mb-14">
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Problem
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.problem}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Solution
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.solution}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                            Result
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.result}
                        </p>
                    </div>
                </section>

                <section className="mb-10 sm:mb-14">
                    <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                        Tech stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {renderTechStackBadges(
                            project.techStack,
                            project.techStack.length,
                            'outline',
                            'text-xs'
                        )}
                    </div>
                </section>

                <section className="flex flex-wrap gap-3">
                    {project.links.live && (
                        <Button variant="default" size="lg" asChild>
                            <Link
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2"
                            >
                                View live site
                                <ExternalLinkIcon className="w-4 h-4" />
                            </Link>
                        </Button>
                    )}
                    <Button variant="outline" size="lg" asChild>
                        <Link
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                        >
                            View on GitHub
                            <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                </section>
            </div>
        </main>
    );
}
