'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MenuIcon from '@/components/icon/MenuIcon';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-surface/80 backdrop-blur-md border-[0.5px] border-border rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/5 px-4 sm:px-6 py-3 sm:py-3.5 relative">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 font-heading font-bold text-lg sm:text-xl"
                        onClick={closeMenu}
                    >
                        <span>Hakkı Erdem</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors duration-200 ${pathname === '/'
                                    ? 'text-accent'
                                    : 'text-secondary hover:text-foreground'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            className={`text-sm font-medium transition-colors duration-200 ${pathname?.includes('/projects')
                                    ? 'text-accent'
                                    : 'text-secondary hover:text-foreground'
                                }`}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/blog"
                            className={`text-sm font-medium transition-colors duration-200 ${pathname?.includes('/blog')
                                    ? 'text-accent'
                                    : 'text-secondary hover:text-foreground'
                                }`}
                        >
                            Blog
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="sm:hidden p-2 text-secondary hover:text-foreground transition-colors duration-200"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <MenuIcon className="w-6 h-6" />
                    </button>
                </nav>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10 sm:hidden"
                            onClick={closeMenu}
                        />
                        <div className="absolute top-full left-0 right-0 mt-2 bg-surface backdrop-blur-md border-[0.5px] border-border rounded-xl shadow-lg shadow-black/10 dark:shadow-white/5 overflow-hidden z-20 sm:hidden">
                            <Link
                                href="/"
                                onClick={closeMenu}
                                className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 border-b border-border/50 last:border-b-0 ${pathname === '/'
                                        ? 'text-accent bg-accent/10'
                                        : 'text-secondary hover:text-foreground hover:bg-background/50'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/projects"
                                onClick={closeMenu}
                                className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 border-b border-border/50 last:border-b-0 ${pathname?.includes('/projects')
                                        ? 'text-accent bg-accent/10'
                                        : 'text-secondary hover:text-foreground hover:bg-background/50'
                                    }`}
                            >
                                Projects
                            </Link>
                            <Link
                                href="/blog"
                                onClick={closeMenu}
                                className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 border-b border-border/50 last:border-b-0 ${pathname?.includes('/blog')
                                        ? 'text-accent bg-accent/10'
                                        : 'text-secondary hover:text-foreground hover:bg-background/50'
                                    }`}
                            >
                                Blog
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}