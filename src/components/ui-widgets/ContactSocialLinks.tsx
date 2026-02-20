'use client';

import { SocialLinks } from '@/components/ui-widgets/SocialLinks';
import { transformSocialLinks } from '@/lib/icon-mapper';

interface SocialItem {
    name: string;
    url: string;
    iconKey: string;
}

interface ContactSocialLinksProps {
    social: SocialItem[];
    iconClassName?: string;
}

export function ContactSocialLinks({ social, iconClassName = 'w-5 h-5' }: ContactSocialLinksProps) {
    const socialLinks = transformSocialLinks(social || []);
    return <SocialLinks socialLinks={socialLinks} iconClassName={iconClassName} />;
}
