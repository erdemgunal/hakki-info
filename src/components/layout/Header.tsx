'use client';

import ThemeToggle from '@/components/ui-widgets/ThemeToggle';
import LanguageToggle from '@/components/ui-widgets/LanguageToggle';
import { Link, usePathname } from '@/i18n/routing';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-surface/80 backdrop-blur-md border-[0.5px] border-border rounded-2xl shadow-lg shadow-black/10 dark:shadow-white/5 px-4 sm:px-6 py-3 sm:py-3.5">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 font-heading font-bold text-lg sm:text-xl"
                    >
                        <span>Hakkı Erdem</span>
                    </Link>

                    <div className="hidden sm:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors duration-200 ${pathname === '/' || pathname === '/tr' || pathname === '/en' || pathname === '/de' || pathname === '/fr'
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

                    <div className="flex items-center gap-3 sm:gap-4">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}