/**
 * Single source of truth for main navigation: section ids/labels and page links.
 * Used by Header, ActiveSectionIndicator, and any feature that needs section or page list.
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
