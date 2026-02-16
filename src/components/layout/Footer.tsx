'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui-widgets';
import { renderSocialLinks } from '@/lib/social-links';
import { getCurrentYear } from '@/lib/date-utils';
import { transformSocialLinks } from '@/lib/icon-mapper';
import { useResumeData } from '@/contexts/ResumeDataContext';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Footer() {
    const resumeData = useResumeData();
    const { hero } = resumeData;
    const socialLinks = transformSocialLinks(hero.contact?.social || []);
    const currentYear = getCurrentYear();
    const { resolvedTheme } = useTheme();
    const mounted = useIsMounted();
    const [istanbulTime, setIstanbulTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istanbulTimeString = now.toLocaleTimeString('en-US', {
                timeZone: 'Europe/Istanbul',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setIstanbulTime(istanbulTimeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const getFooterImage = () => {
        if (!mounted) {
            return "/images/footer/dark_mode_footer.jpg";
        }
        if (resolvedTheme === 'light') {
            return "/images/footer/light_mode_footer.jpg";
        }
        return "/images/footer/dark_mode_footer.jpg";
    };

    return (
        <footer id="footer" className="bg-surface mt-6 sm:mt-8 md:mt-12 lg:mt-16 relative overflow-hidden w-full font-mono">
            <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 relative z-10">

                {/* Footer Image - Middle */}
                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 w-full flex justify-center relative z-0">
                    <Image
                        src={getFooterImage()}
                        alt="Footer Neon Sign"
                        width={1200}
                        height={200}
                        className="w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto object-contain mix-blend-screen opacity-90"
                        priority={false}
                    />
                </div>

                {/* Social Media + Theme/Language Toggles - Below Image (mobile-first) */}
                <div className="mt-6 sm:mt-8 w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 sm:gap-5 px-4 sm:px-6 md:px-8 lg:px-16">
                    <div className="flex flex-wrap justify-center sm:justify-center md:justify-start gap-3 sm:gap-4 w-full md:w-auto">
                        {renderSocialLinks(
                          socialLinks,
                          'w-11 h-11 sm:w-10 sm:h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-foreground/30 transition-all duration-200 touch-manipulation',
                          'w-5 h-5 sm:w-5 sm:h-5'
                        )}
                    </div>
                    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-2 py-2 sm:py-2 relative z-30 shrink-0">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Copyright and Terms - Bottom */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-border w-full px-4 sm:px-6 md:px-8 lg:px-16">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 w-full">
                        <div className="text-secondary text-xs sm:text-sm text-center sm:text-left flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
                            <span>© {currentYear}, All rights reserved</span>
                            <span className="hidden sm:inline text-border">•</span>
                            <Link href="/privacy" className="hover:text-foreground transition-colors duration-200">
                                Privacy
                            </Link>
                            {istanbulTime && (
                                <>
                                    <span className="hidden sm:inline text-border">•</span>
                                    <span className="text-accent font-medium">
                                        Istanbul: {istanbulTime}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};