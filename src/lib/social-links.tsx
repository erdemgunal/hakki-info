import Link from 'next/link';

const DEFAULT_LINK_CLASS =
    'inline-flex items-center justify-center text-secondary hover:text-foreground transition-all duration-200 rounded-full hover:bg-primary/10 min-w-[44px] min-h-[44px]';
const DEFAULT_ICON_CLASS = 'w-5 h-5';

export function renderSocialLinks(
    socialLinks: { name: string; url: string; icon: React.ElementType }[],
    className = '',
    iconClassName = DEFAULT_ICON_CLASS
) {
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
        <>
            {socialLinks.map((social: { name: string; url: string; icon: React.ElementType }) => {
                const Icon = social.icon;
                return (
                    <Link
                        key={social.name}
                        href={social.url}
                        className={`${DEFAULT_LINK_CLASS} ${className}`}
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon className={iconClassName} title={social.name} aria-hidden />
                    </Link>
                );
            })}
        </>
    );
} 