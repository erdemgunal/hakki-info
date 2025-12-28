import Link from 'next/link';

export function renderSocialLinks(socialLinks: { name: string; url: string; icon: React.ElementType }[], className = "", iconClassName = "w-5 h-5") {
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((social: { name: string; url: string; icon: React.ElementType }) => {
        const Icon = social.icon;
        
        return (
            <Link
                key={social.name}
                href={social.url}
                className={`inline-flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 p-2 rounded-full hover:bg-primary/10 ${className}`}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon className={iconClassName} title={social.name} />
            </Link>
        );
    });
} 