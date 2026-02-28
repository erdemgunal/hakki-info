'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { SECTIONS, FOOTER_ID } from './constants';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';
import { useFooterInView } from '@/hooks/useFooterInView';
import { scrollToSection as scrollToSectionUtil } from '@/lib/scroll-to-section';

export default function ActiveSectionIndicator() {
    const sectionIds = SECTIONS.map((s) => s.id);
    const activeId = useSectionVisibility(sectionIds, 'hero');
    const footerInView = useFooterInView(FOOTER_ID);

    const [menuOpen, setMenuOpen] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToSection = useCallback((id: string) => {
        scrollToSectionUtil(id);
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setMenuOpen(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setMenuOpen(false);
        }, 200);
    }, []);

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex items-center gap-3 transition-all duration-300 ${footerInView
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
                                className={`block rounded-full transition-all duration-200 ${isActive
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
                className={`rounded-lg border border-border/50 bg-card/90 backdrop-blur-sm text-card-foreground shadow-lg transition-all duration-150 ${menuOpen
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
                                        className={`w-full rounded-md px-2.5 py-1.5 text-left text-xs transition-colors ${isActive
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
