/**
 * Navigation feature contract.
 * Keep all route and section navigation constants here so consumers import from
 * the feature API instead of deep project paths.
 */
export const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'languages', label: 'Languages' },
    { id: 'community', label: 'Community' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
] as const;

export const PAGE_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_ID = 'footer';
