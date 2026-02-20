'use client';

import { useRef, useState } from 'react';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    'data-language'?: string;
    'data-theme'?: string;
}

export function CodeBlock({
    children,
    'data-language': language,
    'data-theme': _theme,
    style: _style,
    ...props
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [wrapped, setWrapped] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

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

    const langLabel = language && language !== 'plaintext' ? language : 'code';

    return (
        <div className="
            not-prose group my-5 overflow-hidden
            rounded-xl border border-white/[0.07]
            bg-[#1e2029] dark:bg-[#0d1117]
            text-[#cdd9e5] dark:text-[#cdd9e5]
        ">
            {/* ── Top bar ──────────────────────────────────────────────── */}
            <div className="
                flex items-center justify-between px-4 py-2
                bg-[#262b36] dark:bg-[#161b22]
                border-b border-white/[0.07]
            ">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.12em] text-white/40 select-none">
                    {langLabel}
                    {collapsed && <span className="ml-2 text-white/20">· hidden</span>}
                </span>

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
                        {copied
                            ? <span className="text-emerald-400"><CheckIcon /></span>
                            : <CopyIcon />
                        }
                    </BarButton>
                </div>
            </div>

            {/* ── Code area ────────────────────────────────────────────── */}
            {!collapsed && (
                <pre
                    ref={preRef}
                    {...props}
                    data-theme={undefined}
                    style={undefined}
                    className={[
                        'm-0 py-4 px-0',
                        'text-[13px] leading-[1.75] font-mono',
                        'bg-transparent border-0 rounded-none shadow-none',
                        wrapped
                            ? 'whitespace-pre-wrap break-all overflow-x-hidden'
                            : 'whitespace-pre overflow-x-auto',
                        '[counter-reset:line]',
                        '**:data-line:block',
                        '**:data-line:pl-[calc(2.5rem+12px)]',
                        '**:data-line:pr-5',
                        '**:data-line:relative',
                        '**:data-line:[counter-increment:line]',
                        '**:data-highlighted-line:bg-accent/5',
                        '**:data-highlighted-line:border-l-2',
                        '**:data-highlighted-line:border-accent/60',
                    ].join(' ')}
                >
                    {children}
                </pre>
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
                active ? 'text-accent/80' : 'text-white/30 hover:text-white/60',
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
                : <polyline points="18 15 12 9 6 15" />}
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