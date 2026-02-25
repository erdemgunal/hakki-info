'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface HomeAnalyticsTriggerProps {
    pagePath: string;
    views?: number | null;
    children: React.ReactNode;
}

const HEADER_BOTTOM = 80;

export function HomeAnalyticsTrigger({ pagePath, views, children }: HomeAnalyticsTriggerProps) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [open]);

    const label = views != null ? `${views.toLocaleString()} Views` : 'View analytics';

    const modal = open ? (
        <div className="fixed inset-0 z-modal flex flex-col">
            <div
                className="absolute inset-0 bg-black/90"
                onClick={() => setOpen(false)}
            />
            <div
                className="relative flex-1 overflow-y-auto"
                style={{ paddingTop: HEADER_BOTTOM }}
            >
                <div
                    className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pb-12"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <div className="flex justify-end py-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/90 transition-colors"
                            aria-label="Close analytics"
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Close
                        </button>
                    </div>

                    {/* Widget */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground group cursor-pointer"
                aria-label={`Open analytics for ${pagePath}`}
            >
                <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface shadow-sm"
                    aria-hidden="true"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
                        <rect x="1.5" y="7" width="2" height="5" rx="0.75" fill="currentColor" />
                        <rect x="5.5" y="4" width="2" height="8" rx="0.75" fill="currentColor" />
                        <rect x="9.5" y="2" width="2" height="10" rx="0.75" fill="currentColor" />
                    </svg>
                </span>
                <span className="underline-offset-2 hover:underline">{label}</span>
            </button>

            {mounted && createPortal(modal, document.body)}
        </>
    );
}