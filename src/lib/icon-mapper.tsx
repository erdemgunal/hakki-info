import GitHubIcon from "@/components/icon/GitHubIcon";
import LinkedInIcon from "@/components/icon/LinkedInIcon";
import TwitterIcon from "@/components/icon/TwitterIcon";
import WhatsAppIcon from "@/components/icon/WhatsAppIcon";
import MailIcon from "@/components/icon/MailIcon";
import { SVGProps } from "react";

const iconMap: Record<string, (props: SVGProps<SVGSVGElement>) => React.ReactNode> = {
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    twitter: TwitterIcon,
    whatsapp: WhatsAppIcon,
    mail: MailIcon,
};

export function getIconComponent(iconKey: string) {
    const key = iconKey.toLowerCase();
    return iconMap[key] || MailIcon;
}

export function transformSocialLinks(socialLinks: Array<{ name: string; url: string; iconKey: string }>) {
    return socialLinks.map(social => ({
        name: social.name,
        url: social.url,
        icon: getIconComponent(social.iconKey)
    }));
}

