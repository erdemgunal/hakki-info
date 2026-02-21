import type { Metadata } from 'next';
import { getProjectSlugs, fetchProjectBySlug } from '@/lib/fetch-resume-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import seo from '@/config/seo.json';
import { Button } from '@/components/ui/button';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';
import { renderBadges, renderTechStackBadges } from '@/lib/badge-utils';

export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface ProjectPageParams {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: ProjectPageParams
): Promise<Metadata> {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);

    if (!project) {
        return {};
    }

    const title = project.seoTitle ?? project.title;
    const description = project.seoDescription ?? project.description;
    const dynamicOgUrl = new URL(`/api/og/${slug}`, seo.url).toString();
    const ogImage = project.seoImage ?? dynamicOgUrl;
    const canonicalUrl = new URL(`/projects/${slug}`, seo.url).toString();

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: seo.siteName,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type: 'article',
        },
        twitter: {
            card: seo.twitterCard as 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageParams) {
    const { slug } = await params;
    const project = await fetchProjectBySlug(slug);
    if (!project) notFound();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">

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
                    {(project.role ?? project.contribution) && (
                        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                            {project.role && (
                                <p>
                                    <span className="font-medium text-foreground">Role:</span>{' '}
                                    {project.role}
                                </p>
                            )}
                            {project.contribution && (
                                <p>
                                    <span className="font-medium text-foreground">Contribution:</span>{' '}
                                    {project.contribution}
                                </p>
                            )}
                        </div>
                    )}
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
