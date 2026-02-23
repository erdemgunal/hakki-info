import { fetchResumeData } from '@/lib/fetch-resume-data';
import { ResumeDataProvider } from '@/contexts/ResumeDataContext';
import Link from 'next/link';
import Image from 'next/image';
import { renderBadges, renderTechStackBadges } from '@/lib/badge-utils';
import { Button } from '@/components/ui/button';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';
import { PageAnalyticsWidget } from '@/components/analytics/PageAnalyticsWidget';

export default async function ProjectsPage() {
    const resumeData = await fetchResumeData();
    const { projects, social } = resumeData;

    const getPlaceholderImage = () => {
        return "/placeholder-light.svg";
    };

    return (
        <ResumeDataProvider resumeData={resumeData}>
            <main className="min-h-screen bg-background">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">
                    <div className="text-left mb-8 sm:mb-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Projects
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Explore my portfolio of projects showcasing automation, fullstack development and innovative solutions.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {projects.items.map((project, index) => (
                            <Link key={index} href={`/projects/${project.slug}`}>
                                <div className="bg-surface rounded-lg border border-border overflow-hidden hover:border-foreground/30 cursor-pointer hover:shadow-lg group flex flex-col h-full transition-all duration-200">
                                    <div className="h-48 sm:h-56 bg-background relative overflow-hidden">
                                        <Image
                                            src={project.images[0] || getPlaceholderImage()}
                                            alt={`${project.title} - Full Stack Development Project by Hakkı Günal`}
                                            fill
                                            className="object-cover transition-all duration-300 grayscale-[0.25] contrast-105 group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-115"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-200" />

                                        <div className="absolute top-4 left-4">
                                            {renderBadges([project.label], "outline", "text-xs bg-background/80 backdrop-blur-sm")}
                                        </div>

                                        <div className="absolute bottom-4 right-4">
                                            <span className="text-xs sm:text-sm text-white font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                                                {project.year}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                                                {project.title}
                                            </h3>

                                            <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {renderTechStackBadges(project.techStack.slice(0, 3), 3, "outline", "text-xs")}
                                                {project.techStack.length > 3 && (
                                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-sm text-accent font-medium text-center mt-auto pt-4 border-t border-border group-hover:text-foreground transition-colors duration-200">
                                            View Project Details
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12 sm:mt-16">
                        <Button variant="outline" size="lg" asChild>
                            <Link
                                href={social?.find(s => s.iconKey === "github" || s.name === "GitHub")?.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 mx-auto text-accent"
                            >
                                View more on GitHub
                                <ExternalLinkIcon className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </ResumeDataProvider>
    );
}
