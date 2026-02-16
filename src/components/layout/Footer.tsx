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

export default function Footer() {
    const resumeData = useResumeData();
    const { hero, footer } = resumeData;
    const socialLinks = transformSocialLinks(hero.contact?.social || []);
    const currentYear = getCurrentYear();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [istanbulTime, setIstanbulTime] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

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

    const getGlowShadow = () => {
        if (!mounted) {
            return '0 0 20px rgba(187, 134, 252, 0.6), 0 0 40px rgba(187, 134, 252, 0.4), 0 0 60px rgba(187, 134, 252, 0.2)';
        }
        if (resolvedTheme === 'light') {
            return '0 0 20px rgba(98, 0, 238, 0.6), 0 0 40px rgba(98, 0, 238, 0.4), 0 0 60px rgba(98, 0, 238, 0.2)';
        }
        return '0 0 20px rgba(187, 134, 252, 0.6), 0 0 40px rgba(187, 134, 252, 0.4), 0 0 60px rgba(187, 134, 252, 0.2)';
    };

    return (
        <footer id="footer" className="bg-surface mt-6 sm:mt-8 md:mt-12 lg:mt-16 relative overflow-hidden w-full font-mono">
            <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12 relative z-10">
                {/* Text Sections - Top */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
                        {/* Brand Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center">
                                <span className="text-lg sm:text-xl font-bold text-foreground">{footer.brand.name}</span>
                            </div>
                            <p className="text-secondary text-xs sm:text-sm leading-relaxed">
                                {footer.brand.description}
                            </p>
                        </div>

                        {/* Quick Links Section - Privacy only */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className='flex items-center'>
                                <span className="text-lg sm:text-xl font-bold text-foreground">{footer.quickLinks.title}</span>
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                {footer.quickLinks.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="block text-secondary hover:text-foreground text-xs sm:text-sm transition-colors duration-200"
                                    >
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
                            <div className='flex items-center'>
                                <span className="text-lg sm:text-xl font-bold text-foreground">{footer.contact.title}</span>
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <div className="flex items-start sm:items-center space-x-2 text-secondary text-xs sm:text-sm">
                                    <svg className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <div className="wrap-break-word">
                                        <Link
                                            href={`mailto:${hero.email}`}
                                            className="hover:text-foreground transition-colors duration-200"
                                        >
                                            {hero.email}
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-start sm:items-center space-x-2 text-secondary text-xs sm:text-sm">
                                    <svg className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <div className="wrap-break-word">
                                        <span>{hero.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                <div className="mt-6 sm:mt-8 pt-4 border-t border-border/50 w-full px-4 sm:px-6 md:px-8 lg:px-16">
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