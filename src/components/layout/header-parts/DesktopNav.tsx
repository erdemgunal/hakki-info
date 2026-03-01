'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PAGE_LINKS } from '@/config/navigation';

export interface DesktopNavProps {
    pathname: string;
}

export function DesktopNav({ pathname }: DesktopNavProps) {
    return (
        <>
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
            <div className="hidden lg:flex items-center gap-2">
                <Link
                    href="/hakki_erdem_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button
                        size="sm"
                        className="rounded-lg bg-destructive text-white hover:bg-destructive/90"
                    >
                        Resume
                    </Button>
                </Link>
            </div>
        </>
    );
}
