'use client';

import React, { useEffect, useState } from 'react';
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
    const { social } = resumeData;
    const socialLinks = transformSocialLinks(social || []);
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

    return (
        <footer id="footer" className="bg-surface mt-6 sm:mt-8 md:mt-12 lg:mt-16 relative z-footer overflow-hidden w-full font-mono">
            <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 relative z-10">

                {/* Social Media + Theme Toggle — single row on mobile (3 icons), spread on desktop */}
                <div className="mt-6 sm:mt-8 w-full flex flex-row items-center justify-center md:justify-between gap-6 sm:gap-4 px-4 sm:px-6 md:px-8 lg:px-16">
                    <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4">
                        {renderSocialLinks(
                            socialLinks,
                            'w-10 h-10 sm:w-11 sm:h-11 md:w-10 md:h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:border-foreground/30 transition-all duration-200 touch-manipulation shrink-0',
                            'w-5 h-5'
                        )}
                    </div>
                    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg px-2 py-2 relative z-30 shrink-0">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Copyright and Terms - Bottom */}
                <div className="mt-6 sm:mt-8 pt-4 border-t border-border w-full px-4 sm:px-6 md:px-8 lg:px-16">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 w-full">
                        <div className="text-secondary text-xs sm:text-sm text-center sm:text-left flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
                            <span>© {currentYear}, All rights reserved</span>
                            <span className="hidden sm:inline text-border">•</span>
                            <Link href="/privacy" className="inline-flex min-h-[24px] min-w-[24px] items-center py-1 hover:text-foreground transition-colors duration-200">
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