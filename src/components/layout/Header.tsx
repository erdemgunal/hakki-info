'use client';

import { useState, useCallback, useEffect } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'languages', label: 'Languages' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
] as const;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        if (mobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [mobileMenuOpen]);

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-surface/80 backdrop-blur-md border-[0.5px] border-border rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/5 px-4 sm:px-6 py-3 sm:py-3.5">
                <nav className="flex items-center justify-between">
                    <button
                        onClick={scrollToTop}
                        className="text-foreground font-heading font-bold text-lg sm:text-xl hover:text-accent transition-colors"
                    >
                        Hakkı Erdem
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 -mr-1 text-foreground hover:text-accent transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu Panel */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-3 pt-3 border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
                        <ul className="flex flex-col gap-0.5">
                            {SECTIONS.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection(id)}
                                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}