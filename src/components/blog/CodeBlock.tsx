'use client';

import { useEffect, useRef, useState } from 'react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    'data-language'?: string;
}

export function CodeBlock({
    children,
    'data-language': language,
    ...props
}: CodeBlockProps) {
    const [copied, setCopied]       = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [wrapped, setWrapped]     = useState(false);
    const [lineCount, setLineCount] = useState(0);
    const preRef = useRef<HTMLPreElement>(null);

    // Count lines after mount via rehype-pretty-code's [data-line] spans
    useEffect(() => {
        if (!preRef.current) return;
        const dataLines = preRef.current.querySelectorAll('[data-line]');
        if (dataLines.length > 0) {
            setLineCount(dataLines.length);
        } else {
            const raw = preRef.current.innerText ?? '';
            const lines = raw.split('\n');
            const count = lines.at(-1)?.trim() === '' ? lines.length - 1 : lines.length;
            setLineCount(Math.max(1, count));
        }
    }, [children]);

    const handleCopy = async () => {
        const text = preRef.current?.innerText ?? '';
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="not-prose group my-6 rounded-xl overflow-hidden border border-border shadow-sm bg-muted/40">

            {/* ── Top bar ────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/60">

                {/* Language label — top-left; when collapsed show hidden line count */}
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-muted-foreground select-none">
                        {language && language !== 'plaintext' ? language : 'code'}
                    </span>
                    {collapsed && lineCount > 0 && (
                        <span className="text-[11px] font-medium text-muted-foreground select-none">
                            {lineCount} hidden {lineCount === 1 ? 'line' : 'lines'}
                        </span>
                    )}
                </div>

                {/* Action buttons — top-right (icons only; labels via title hover) */}
                <div className="flex items-center gap-1">
                    <TopBarButton
                        onClick={() => setCollapsed((v) => !v)}
                        aria-label={collapsed ? 'Expand' : 'Collapse'}
                        title={collapsed ? 'Expand' : 'Collapse'}
                        active={collapsed}
                    >
                        <CollapseIcon collapsed={collapsed} />
                    </TopBarButton>

                    <TopBarButton
                        onClick={() => setWrapped((v) => !v)}
                        aria-label="Toggle line wrap"
                        title="Toggle line wrap"
                        active={wrapped}
                    >
                        <WrapIcon />
                    </TopBarButton>

                    <TopBarButton
                        onClick={handleCopy}
                        aria-label="Copy code"
                        title={copied ? 'Copied!' : 'Copy'}
                    >
                        {copied ? (
                            <span className="text-emerald-500 dark:text-emerald-400">
                                <CheckIcon />
                            </span>
                        ) : (
                            <CopyIcon />
                        )}
                    </TopBarButton>
                </div>
            </div>

            {/* ── Code area ──────────────────────────────────────────────── */}
            {!collapsed && (
                <div className="flex overflow-hidden">

                    {/* Line number gutter */}
                    {lineCount > 0 && (
                        <div
                            aria-hidden
                            className="shrink-0 select-none flex flex-col items-end
                                       pt-5 pb-5 pl-4 pr-4
                                       text-[13px] leading-[1.75] font-mono
                                       text-muted-foreground/40
                                       border-r border-border"
                        >
                            {Array.from({ length: lineCount }, (_, i) => (
                                <span key={i}>{i + 1}</span>
                            ))}
                        </div>
                    )}

                    {/* Code */}
                    <pre
                        ref={preRef}
                        className={[
                            'flex-1 m-0 px-5 py-5',
                            'text-[13px] leading-[1.75] font-mono',
                            'bg-transparent border-0 rounded-none',
                            // wrap toggle
                            wrapped ? 'whitespace-pre-wrap break-all' : 'overflow-x-auto',
                            // rehype-pretty-code line spans
                            '[&_[data-line]]:block',
                            // highlighted lines (border only, no fill)
                            '[&_[data-highlighted-line]]:-mx-5',
                            '[&_[data-highlighted-line]]:px-5',
                            '[&_[data-highlighted-line]]:border-l-2',
                            '[&_[data-highlighted-line]]:border-accent',
                        ].join(' ')}
                        {...props}
                    >
                        {children}
                    </pre>
                </div>
            )}
        </div>
    );
}

// ─── Shared top-bar button ─────────────────────────────────────────────────────

function TopBarButton({
    children,
    active,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
    return (
        <button
            className={[
                'flex items-center gap-1.5 px-2.5 py-1 rounded-md',
                'text-[11px] font-medium transition-all duration-150',
                'border cursor-pointer select-none',
                active
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border',
            ].join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
    // Chevron up = collapse, chevron down = expand
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed
                ? <polyline points="6 9 12 15 18 9" />   /* down = expand */
                : <polyline points="18 15 12 9 6 15" />  /* up = collapse */
            }
        </svg>
    );
}

function WrapIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
    );
}

function CopyIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}