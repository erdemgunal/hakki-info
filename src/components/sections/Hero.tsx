'use client';

import Link from 'next/link';
import GlobeIcon from '@/components/icon/GlobeIcon';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/ui-widgets';
import { transformSocialLinks } from '@/lib/icon-mapper';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Hero() {
    const resumeData = useResumeData();
    const { hero, social } = resumeData;
    const heroSocial = (social || []).filter((s) =>
        ['mail', 'github', 'linkedin'].includes(s.iconKey.toLowerCase())
    );
    const socialLinks = transformSocialLinks(heroSocial);

    return (
        <section 
            id="hero" 
            className="relative flex items-center justify-center text-center py-16 sm:py-20 md:py-24 lg:py-28"
        >
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6 sm:space-y-7 md:space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
                    {hero.name}
                </h1>

                <div className="w-full max-w-2xl">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-secondary">
                        {hero.summary}
                    </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-secondary">
                    <GlobeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm md:text-base">{hero.location}</span>
                </div>

                <div className="flex items-center justify-center pt-2">
                    <Link href="/hakki_erdem_cv.pdf" target="_blank" rel="noopener noreferrer">
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-secondary hover:text-foreground hover:bg-muted/50 transition-all duration-200 rounded-lg"
                        >
                            Download CV
                            <ExternalLinkIcon className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <SocialLinks socialLinks={socialLinks} />
                </div>
            </div>
        </section>
    );
}