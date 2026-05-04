'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { DesktopNav, MobileMenu } from '@/components/layout/header-parts';

const MENU_TRANSITION_MS = 300;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const pathname = usePathname();
    const prevPathnameRef = useRef(pathname);
    const closeMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isHomePage = pathname === '/';

    const closeMenu = useCallback(() => {
        setMobileMenuOpen(false);
        if (closeMenuTimeoutRef.current) clearTimeout(closeMenuTimeoutRef.current);
        closeMenuTimeoutRef.current = setTimeout(() => {
            closeMenuTimeoutRef.current = null;
            setMenuVisible(false);
        }, MENU_TRANSITION_MS);
    }, []);

    const openMenu = useCallback(() => {
        if (closeMenuTimeoutRef.current) {
            clearTimeout(closeMenuTimeoutRef.current);
            closeMenuTimeoutRef.current = null;
        }
        setMenuVisible(true);
        requestAnimationFrame(() => setMobileMenuOpen(true));
    }, []);

    const scrollToSection = useCallback(
        (id: string) => {
            const element = document.getElementById(id);
            if (!element) return;

            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            closeMenu();
        },
        [closeMenu],
    );

    useEffect(() => {
        if (prevPathnameRef.current === pathname) return;
        prevPathnameRef.current = pathname;
        closeMenu();
    }, [pathname, closeMenu]);

    useEffect(
        () => () => {
            if (closeMenuTimeoutRef.current) clearTimeout(closeMenuTimeoutRef.current);
        },
        [],
    );

    useEffect(() => {
        if (!menuVisible) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeMenu();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [menuVisible, closeMenu]);

    return (
        <>
            <div
                className={`fixed inset-0 z-15 bg-black/20 backdrop-blur-[2px] lg:hidden transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden
                onClick={closeMenu}
            />
            <header className="fixed top-4 left-1/2 -translate-x-1/2 z-header w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
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

                        <DesktopNav pathname={pathname} />

                        <button
                            type="button"
                            onClick={() => (mobileMenuOpen ? closeMenu() : openMenu())}
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

                    {menuVisible && (
                        <MobileMenu
                            isOpen={mobileMenuOpen}
                            onClose={closeMenu}
                            pathname={pathname}
                            isHomePage={isHomePage}
                            onScrollToSection={scrollToSection}
                        />
                    )}
                </div>
            </header>
        </>
    );
}