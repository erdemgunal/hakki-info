'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'languages', label: 'Languages' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
] as const;

const FOOTER_ID = 'footer';

export default function ActiveSectionIndicator() {
    const [activeId, setActiveId] = useState<string>('hero');
    const [menuOpen, setMenuOpen] = useState(false);
    const [footerInView, setFooterInView] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Track section visibility
    useEffect(() => {
        const sectionIds = SECTIONS.map((s) => s.id);
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el != null);
        
        if (elements.length === 0) return;

        const visibility = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibility.set(entry.target.id, entry.intersectionRatio);
                });
                
                const visibleSections = sectionIds.filter((id) => {
                    const ratio = visibility.get(id) ?? 0;
                    return ratio > 0;
                });

                if (visibleSections.length > 0) {
                    const mostVisible = visibleSections.reduce((a, b) =>
                        (visibility.get(a) ?? 0) >= (visibility.get(b) ?? 0) ? a : b
                    );
                    setActiveId(mostVisible);
                }
            },
            {
                rootMargin: '-10% 0px -60% 0px',
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Track footer visibility
    useEffect(() => {
        const footer = document.getElementById(FOOTER_ID);
        if (!footer) return;

        const footerObserver = new IntersectionObserver(
            ([entry]) => setFooterInView(entry.isIntersecting),
            { rootMargin: '0px 0px -10% 0px', threshold: 0 }
        );

        footerObserver.observe(footer);
        return () => footerObserver.disconnect();
    }, []);

    // Smooth scroll to section
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }, []);

    // Handle mouse enter - only on dots or menu
    const handleMouseEnter = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setMenuOpen(true);
    }, []);

    // Handle mouse leave with delayed closing
    const handleMouseLeave = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setMenuOpen(false);
        }, 200);
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex items-center gap-3 transition-all duration-300 ${
                footerInView 
                    ? 'pointer-events-none opacity-0 -translate-x-4' 
                    : 'opacity-100 translate-x-0'
            }`}
        >
            {/* Navigation Dots */}
            <aside
                className="flex flex-col gap-2 py-1"
                aria-label="Page navigation"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {SECTIONS.map(({ id, label }) => {
                    const isActive = activeId === id;
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => scrollToSection(id)}
                            aria-label={`Navigate to ${label}`}
                            aria-current={isActive ? 'location' : undefined}
                            className="group flex items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                            <span
                                className={`block rounded-full transition-all duration-200 ${
                                    isActive
                                        ? 'h-1.5 w-6 bg-accent'
                                        : 'h-0.5 w-4 bg-foreground/25 group-hover:bg-foreground/40 group-hover:w-5'
                                }`}
                            />
                        </button>
                    );
                })}
            </aside>

            {/* Navigation Menu */}
            <div
                className={`rounded-lg border border-border/50 bg-card/90 backdrop-blur-sm text-card-foreground shadow-lg transition-all duration-150 ${
                    menuOpen 
                        ? 'pointer-events-auto opacity-100 translate-x-0' 
                        : 'pointer-events-none opacity-0 -translate-x-1'
                }`}
                style={{ minWidth: '10rem' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <nav className="px-2 py-2" aria-label="Page sections">
                    <ul className="flex flex-col gap-0.5">
                        {SECTIONS.map(({ id, label }) => {
                            const isActive = activeId === id;
                            return (
                                <li key={id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection(id)}
                                        className={`w-full rounded-md px-2.5 py-1.5 text-left text-xs transition-colors ${
                                            isActive
                                                ? 'text-foreground font-medium'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}