'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface HomeAnalyticsTriggerProps {
    pagePath: string;
    views?: number | null;
    children: React.ReactNode;
}

// Z_MODAL (40) > Z_HEADER (20) > Z_FOOTER (10) — defined in globals.css @theme
// Using inline value here since this component is portaled to <body>
const Z_MODAL = 40;

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
        // Full-screen overlay — portaled to body, above header
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: Z_MODAL,
                // Flex center — dialog floats in viewport
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                // Semi-transparent — header is visible behind it (like ESN Wiki)
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)',
                // Scrollable when dialog content is taller than viewport
                overflowY: 'auto',
                padding: '80px 16px 40px', // top pad clears the header
            }}
            onClick={() => setOpen(false)}
        >
            {/* Dialog panel — centered, max-width, does NOT close on click inside */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 760,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                    overflow: 'hidden',
                    // Prevent backdrop click from firing when clicking inside
                    pointerEvents: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}

                {/* Close button — bottom-right inside dialog, matching ESN Wiki */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '12px 24px 16px',
                        borderTop: '1px solid #f3f4f6',
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#374151',
                            background: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: 6,
                            padding: '6px 16px',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                        aria-label="Close analytics"
                    >
                        Close
                    </button>
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
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface shadow-sm">
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