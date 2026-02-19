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
    const [copied, setCopied] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [wrapped, setWrapped] = useState(false);
    const [lineCount, setLineCount] = useState(0);
    const preRef = useRef<HTMLPreElement>(null);

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
        <div className="not-prose group my-5 rounded-xl overflow-hidden bg-[#0d1117]">

            {/* ── Top bar ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/4">

                {/* Language label */}
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium uppercase tracking-[0.12em] text-white/30 select-none">
                        {language && language !== 'plaintext' ? language : 'code'}
                    </span>
                    {collapsed && lineCount > 0 && (
                        <span className="text-[11px] text-white/25 select-none">
                            · {lineCount} {lineCount === 1 ? 'line' : 'lines'} hidden
                        </span>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-0.5">
                    <BarButton
                        onClick={() => setCollapsed((v) => !v)}
                        aria-label={collapsed ? 'Expand' : 'Collapse'}
                        title={collapsed ? 'Expand' : 'Collapse'}
                        active={collapsed}
                    >
                        <CollapseIcon collapsed={collapsed} />
                    </BarButton>

                    <BarButton
                        onClick={() => setWrapped((v) => !v)}
                        aria-label="Toggle line wrap"
                        title="Toggle line wrap"
                        active={wrapped}
                    >
                        <WrapIcon />
                    </BarButton>

                    <BarButton
                        onClick={handleCopy}
                        aria-label="Copy code"
                        title={copied ? 'Copied!' : 'Copy'}
                    >
                        {copied ? (
                            <span className="text-emerald-400">
                                <CheckIcon />
                            </span>
                        ) : (
                            <CopyIcon />
                        )}
                    </BarButton>
                </div>
            </div>

            {/* ── Code area ────────────────────────────────────────────── */}
            {!collapsed && (
                <div className="flex overflow-hidden">

                    {/* Line number gutter */}
                    {lineCount > 0 && (
                        <div
                            aria-hidden
                            className="shrink-0 select-none flex flex-col items-end
                                       pt-5 pb-5 pl-4 pr-3
                                       text-[13px] leading-[1.75] font-mono
                                       text-white/20"
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
                            'bg-transparent border-0 rounded-none shadow-none',
                            wrapped ? 'whitespace-pre-wrap break-all' : 'whitespace-pre overflow-x-auto',
                            '**:data-line:block',
                            '**:data-highlighted-line:-mx-5',
                            '**:data-highlighted-line:px-5',
                            '**:data-highlighted-line:border-l-2',
                            '**:data-highlighted-line:border-accent/70',
                            '**:data-highlighted-line:bg-accent/5',
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

// ─── Bar button ───────────────────────────────────────────────────────────────

function BarButton({
    children,
    active,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
    return (
        <button
            className={[
                'flex items-center px-2 py-1 rounded',
                'text-[11px] transition-colors duration-100 cursor-pointer',
                active
                    ? 'text-accent/80'
                    : 'text-white/30 hover:text-white/60',
            ].join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed
                ? <polyline points="6 9 12 15 18 9" />
                : <polyline points="18 15 12 9 6 15" />
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