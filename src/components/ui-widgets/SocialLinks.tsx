'use client';

import Link from 'next/link';
import { SVGProps } from 'react';

interface SocialLink {
    name: string;
    url: string;
    icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
}

interface SocialLinksProps {
    socialLinks: SocialLink[];
    className?: string;
    iconClassName?: string;
}

export function SocialLinks({ socialLinks, className = "", iconClassName = "w-5 h-5" }: SocialLinksProps) {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social) => {
        const Icon = social.icon;

        return (
            <div key={social.name}>
                <Link
                    href={social.url}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 text-secondary transition-all duration-200 motion-reduce:transition-none hover:bg-primary/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
                    aria-label={social.name}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    data-umami-event={social.url.startsWith('mailto:') ? 'contact-email' : 'social-click'}
                    data-umami-event-platform={social.url.startsWith('mailto:') ? undefined : social.name}
                >
                    <Icon className={iconClassName} />
                </Link>
            </div>
        );
    });
} 