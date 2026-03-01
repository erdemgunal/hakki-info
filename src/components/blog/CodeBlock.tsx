// src/components/blog/CodeBlock.tsx
'use client';

import { useRef, useState } from 'react';
import ChevronDownIcon from '@/components/icon/ChevronDownIcon';
import ChevronUpIcon from '@/components/icon/ChevronUpIcon';
import CheckIcon from '@/components/icon/CheckIcon';
import CopyIcon from '@/components/icon/CopyIcon';
import WrapIcon from '@/components/icon/WrapIcon';

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
            not-prose group my-6 overflow-hidden
            rounded-xl border border-border/30
            bg-muted text-foreground
        ">
            {/* ── Top bar ──────────────────────────────────────────────── */}
            <div className="
                flex items-center justify-between px-4 py-1.5
                bg-background border-b border-border/30
            ">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.12em] text-muted-foreground/50 select-none">
                    {langLabel}
                    {collapsed && <span className="ml-2 text-muted-foreground/30">· hidden</span>}
                </span>

                <div className="flex items-center gap-0.5">
                    <BarButton
                        onClick={() => setCollapsed((v) => !v)}
                        aria-label={collapsed ? 'Expand' : 'Collapse'}
                        title={collapsed ? 'Expand' : 'Collapse'}
                        active={collapsed}
                    >
                        {collapsed ? (
                            <ChevronDownIcon width={12} height={12} />
                        ) : (
                            <ChevronUpIcon width={12} height={12} />
                        )}
                    </BarButton>

                    <BarButton
                        onClick={() => setWrapped((v) => !v)}
                        aria-label="Toggle line wrap"
                        title="Toggle line wrap"
                        active={wrapped}
                    >
                        <WrapIcon width={12} height={12} />
                    </BarButton>

                    <BarButton
                        onClick={handleCopy}
                        aria-label="Copy code"
                        title={copied ? 'Copied!' : 'Copy'}
                    >
                        {copied
                            ? <span className="text-emerald-400"><CheckIcon width={12} height={12} /></span>
                            : <CopyIcon width={12} height={12} />
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
                        'm-0 py-3 px-0',
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
                active ? 'text-accent/80' : 'text-muted-foreground/50 hover:text-muted-foreground/80',
            ].join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}
