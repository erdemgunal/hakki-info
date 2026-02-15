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
                    className={`inline-flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 p-2 rounded-full hover:bg-primary/10 ${className}`}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon className={iconClassName} />
                </Link>
            </div>
        );
    });
} 