'use client';

import Link from 'next/link';
import GlobeIcon from "@/components/icon/GlobeIcon";
import ExternalLinkIcon from "@/components/icon/ExternalLinkIcon";
import ChevronDownIcon from "@/components/icon/ChevronDownIcon";
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/ui-widgets';
import { transformSocialLinks } from '@/lib/icon-mapper';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Hero() {
    const resumeData = useResumeData();
    const { hero } = resumeData;
    const socialLinks = transformSocialLinks(hero.contact?.social || []);

    return (
        <section id="hero" className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center text-center px-4 sm:px-6">
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground">
                    {hero.name}
                </h1>

                <div className="w-full max-w-2xl mx-auto">
                    <p className="text-sm sm:text-lg md:text-xl leading-relaxed text-secondary text-center">
                        {hero.summary}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-secondary">
                    <GlobeIcon className="w-5 h-5" />
                    <span className="text-xs sm:text-base md:text-lg">{hero.location}</span>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Link href="/hakki_erdem_cv.pdf" target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            variant="outline"
                            className="hover:bg-primary/10 transition-all duration-200 rounded-lg"
                        >
                            {hero.downloadCv}
                            <ExternalLinkIcon className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-5">
                    <SocialLinks socialLinks={socialLinks} />
                </div>
            </div>

            <div className="absolute bottom-8 inset-x-0 flex justify-center animate-bounce">
                <ChevronDownIcon className="w-6 h-6 text-secondary" />
            </div>
        </section>
    );
} 