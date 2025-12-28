'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Link as I18nLink, Link } from '@/i18n/routing';
import { ThemeToggle, LanguageToggle } from '@/components/ui-widgets';
import { renderSocialLinks } from '@/lib/social-links';
import { getCurrentYear } from '@/lib/date-utils';
import MessageBubbleIcon from '@/components/icon/MessageBubbleIcon';
import { transformSocialLinks } from '@/lib/icon-mapper';
import type { ResumeData } from '@/lib/fetch-resume-data';

interface FooterProps {
    resumeData: ResumeData;
}

export default function Footer({ resumeData }: FooterProps) {
    const { hero, footer } = resumeData;
    const socialLinks = transformSocialLinks(hero.contact?.social || []);
    const currentYear = getCurrentYear();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const getFooterImage = () => {
        if (!mounted) {
            return "/images/footer/dark_mode_footer.png";
        }
        if (resolvedTheme === 'light') {
            return "/images/footer/light_mode_footer.png";
        }
        return "/images/footer/dark_mode_footer.png";
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
        <footer className="bg-surface mt-8 sm:mt-12 md:mt-16 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12 relative z-10">
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div>
                                <span className="text-xl font-bold text-foreground">{footer.brand.name}</span>
                            </div>
                        </div>
                        <p className="text-secondary text-sm leading-relaxed">
                            {footer.brand.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <div className='flex items-center space-x-2'>
                            <span className="text-xl font-bold text-foreground">{footer.quickLinks.title}</span>
                        </div>
                        <div className="space-y-2">
                            {footer.quickLinks.links.map((link, index) => (
                                <Link key={index} href={link.href} className="block text-secondary hover:text-foreground text-sm">
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <div className='flex items-center space-x-2'>
                            <span className="text-xl font-bold text-foreground">{footer.contact.title}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-secondary text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <div>
                                    <Link
                                        href={`mailto:${hero.email}`}
                                        className="hover:text-foreground transition-colors duration-200"
                                    >
                                        {hero.email}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 text-secondary text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <span>{hero.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-3 pt-2">
                            {renderSocialLinks(socialLinks, "w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:border-foreground/30", "w-4 h-4")}
                        </div>
                    </div>
                </div>

                {/* Language Toggle - Above Bottom Bar */}
                <div className="mt-6 flex justify-end">
                    <div className="flex items-center space-x-3 scale-125 md:scale-100 relative z-30">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-2 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-secondary text-sm">
                            © {currentYear}, All rights reserved
                        </div>
                        <div className="flex items-center space-x-4 text-secondary text-sm">
                            <I18nLink href="/terms" className="hover:text-foreground">
                                Terms
                            </I18nLink>
                            <I18nLink href="/privacy" className="hover:text-foreground">
                                Privacy
                            </I18nLink>
                        </div>
                    </div>
                </div>

                {/* Footer Image */}
                <div className="mt-8 sm:mt-12 md:mt-16 w-full flex justify-center relative z-0">
                    <Image
                        src={getFooterImage()}
                        alt="Footer Neon Sign"
                        width={1200}
                        height={200}
                        className="w-full max-w-4xl h-auto object-contain mix-blend-screen opacity-90"
                        priority={false}
                    />
                </div>
            </div>

            {/* Message Bubble Icon - Bottom Right Corner */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:right-8 z-20">
                <div 
                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{
                        boxShadow: getGlowShadow()
                    }}
                >
                    <MessageBubbleIcon className="w-6 h-6" />
                </div>
            </div>
        </footer>
    );
};