'use client';

import Link from 'next/link';
import GlobeIcon from '@/components/icon/GlobeIcon';
import { SocialLinks } from '@/components/ui-widgets';
import { Button } from '@/components/ui/button';
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
            aria-labelledby="hero-heading"
            className="relative scroll-mt-24 py-12 sm:py-16 md:py-20 lg:py-24"
        >
            <div className="flex max-w-3xl flex-col items-start text-left space-y-5 sm:space-y-6">
                <h1
                    id="hero-heading"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
                >
                    {hero.name}
                </h1>

                <p className="max-w-prose text-base sm:text-lg md:text-xl leading-relaxed text-secondary">
                    {hero.summary}
                </p>

                <div className="flex items-center gap-2 text-secondary">
                    <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden />
                    <span className="text-sm sm:text-base">{hero.location}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Button asChild size="lg" className="rounded-lg min-h-11">
                        <Link
                            href="/projects"
                            data-umami-event="hero-cta-projects"
                        >
                            View projects
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-lg min-h-11">
                        <Link
                            href="/contact"
                            data-umami-event="hero-cta-contact"
                        >
                            Contact
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <SocialLinks socialLinks={socialLinks} />
                </div>
            </div>
        </section>
    );
}
