'use client';

import Link from 'next/link';
import { resumeData } from '@/app/data/resume-data';
import GlobeIcon from "@/components/icon/GlobeIcon";
import ExternalLinkIcon from "@/components/icon/ExternalLinkIcon";
import ChevronDownIcon from "@/components/icon/ChevronDownIcon";
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/ui-widgets';

export default function Hero() {
    const { hero } = resumeData;

    return (
        <section id="hero" className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20">
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 text-foreground">
                    {hero.name}
                </h1>

                <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-secondary text-center">
                        {hero.summary}
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 text-secondary mb-8 sm:mb-10">
                    <GlobeIcon className="w-5 h-5" />
                    <span className="text-sm sm:text-base md:text-lg">{hero.location}</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-8 sm:mb-10">
                    <Link href="/hakki_erdem_cv.pdf" target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            variant="outline"
                            className="hover:bg-primary/10 transition-all duration-200 rounded-lg"
                        >
                            Özgeçmiş
                            <ExternalLinkIcon className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-5 mb-8">
                    <SocialLinks socialLinks={hero.contact?.social || []} />
                </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDownIcon className="w-6 h-6 text-secondary" />
            </div>
        </section>
    );
} 