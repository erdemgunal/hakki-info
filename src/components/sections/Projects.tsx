'use client';

import { Button } from '@/components/ui/button';
import { renderTechStackBadges, renderBadges } from '@/lib/badge-utils';
import Image from 'next/image';
import Link from 'next/link';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Projects() {
    const resumeData = useResumeData();
    const { projects, hero } = resumeData;
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
        <>
            <Section id="projects">
                <div className="text-left mb-6 sm:mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">{projects.title}</h2>
                </div>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.items.map((project, index) => (
                            <div key={index}>
                                <Link href={`/projects/${project.slug}`}>
                                    <div className="bg-surface rounded-lg border border-border overflow-hidden hover:border-foreground/30 cursor-pointer hover:shadow-lg group flex flex-col h-full transition-all duration-200">
                                        <div className="h-40 bg-background relative overflow-hidden">
                                            <Image
                                                src={project.images[0] || getPlaceholderImage()}
                                                alt={`${project.title} - Full Stack Development Project by Hakkı Günal`}
                                                fill
                                                className="object-cover transition-all duration-300 grayscale-[0.25] contrast-105 group-hover:grayscale-0 group-hover:brightness-110 group-hover:contrast-115"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-200" />

                                            <div className="absolute top-4 left-4">
                                                {renderBadges([project.label], 'outline', 'text-xs bg-background/80 backdrop-blur-sm')}
                                            </div>

                                            <div className="absolute bottom-4 right-4">
                                                <span className="text-xs sm:text-sm text-white font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                                                    {project.year}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 flex flex-col flex-1">
                                            <div className="flex-1">
                                                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{project.title}</h3>

                                                <p className="text-muted-foreground text-xs sm:text-sm mb-3 leading-relaxed">{project.description}</p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {renderTechStackBadges(project.techStack.slice(0, 3), 3, 'outline', 'text-xs')}
                                                    {project.techStack.length > 3 && (
                                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                            +{project.techStack.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-xs sm:text-sm text-accent font-medium text-center mt-auto pt-4 border-t border-border/50 group-hover:text-foreground transition-colors duration-200">
                                                {projects.viewProjectText}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <Button variant="outline" size="lg" asChild>
                        <Link
                            href={hero.contact.social.find(social => social.name === "GitHub")?.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 mx-auto text-accent"
                        >
                            {projects.viewMoreButtonText}
                            <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </Section>
        </>
        );
}