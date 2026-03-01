'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SECTIONS, PAGE_LINKS } from '@/config/navigation';

export interface MobileMenuProps {
    isOpen: boolean; // Kept for API clarity; parent gates rendering
    onClose: () => void;
    pathname: string;
    isHomePage: boolean;
    onScrollToSection: (id: string) => void;
}

export function MobileMenu({
    onClose,
    pathname,
    isHomePage,
    onScrollToSection,
}: MobileMenuProps) {
    return (
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
                                    onClick={onClose}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="mt-1">
                            <Button
                                asChild
                                variant="destructive"
                                size="sm"
                                className="w-full rounded-lg px-3 py-2.5 text-center text-sm font-medium"
                            >
                                <Link
                                    href="/hakki_erdem_cv.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Resume
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </div>
                {isHomePage && (
                    <div className="border-t border-border pt-3">
                        <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Sections
                        </p>
                        <ul className="flex flex-col gap-0.5">
                            {SECTIONS.map(({ id, label }) => (
                                <li key={id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onScrollToSection(id);
                                            onClose();
                                        }}
                                        className="w-full min-h-[24px] rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    );
}
