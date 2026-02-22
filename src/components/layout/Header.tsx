'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'languages', label: 'Languages' },
    { id: 'community', label: 'Community' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
] as const;

const PAGE_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
] as const;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    useEffect(() => {
        queueMicrotask(() => setMobileMenuOpen(false));
    }, [pathname]);

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-surface/80 backdrop-blur-md border-[0.5px] border-border rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/5 px-4 sm:px-6 py-3 sm:py-3.5">
                <nav className="relative flex items-center justify-between">
                    <Link href="/" className="shrink-0 w-12 h-12 rounded-full overflow-hidden ring-1 ring-border">
                        <Image
                            src="https://cdn.jsdelivr.net/gh/erdemgunal/hakki-info-assets@latest/0fd05493-bb14-4e2d-bf3a-11b1a1101f93.jpeg"
                            alt="Hakkı Erdem"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover object-[55%_50%]"
                        />
                    </Link>

                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-sm">
                        {PAGE_LINKS.map((link, index) => (
                            <div key={link.href} className="flex items-center gap-2">
                                <Link
                                    href={link.href}
                                    className={`min-h-[24px] min-w-[24px] px-3 py-2 inline-flex items-center rounded transition-colors ${
                                        pathname === link.href
                                            ? 'text-foreground font-medium'
                                            : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                                {index < PAGE_LINKS.length - 1 && (
                                    <span className="text-border select-none">|</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop Resume button */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Link
                            href="/hakki_erdem_cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="destructive"
                                size="sm"
                                className="rounded-lg"
                            >
                                Resume
                            </Button>
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden min-w-[24px] min-h-[24px] p-2 -mr-1 text-foreground hover:text-accent transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

                {mobileMenuOpen && (
                    <div className="lg:hidden mt-3 pt-3 border-t border-border">
                        <div className="mb-3">
                            <ul className="flex flex-col gap-0.5">
                                {PAGE_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`block w-full min-h-[24px] rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                                pathname === link.href
                                                    ? 'text-foreground bg-accent/10 font-medium'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}

                                {/* Mobile Resume button inside menu */}
                                <li className="mt-1">
                                        <Link
                                            href="/hakki_erdem_cv.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full min-h-[24px] rounded-lg px-3 py-2.5 text-center text-sm font-medium bg-destructive text-white hover:bg-destructive/90 transition-colors"
                                        >
                                        Resume
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {isHomePage && (
                            <>
                                <div className="border-t border-border pt-3">
                                    <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Sections
                                    </p>
                                    <ul className="flex flex-col gap-0.5">
                                        {SECTIONS.map(({ id, label }) => (
                                            <li key={id}>
                                                <button
                                                    type="button"
                                                    onClick={() => scrollToSection(id)}
                                                    className="w-full min-h-[24px] rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                >
                                                    {label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}