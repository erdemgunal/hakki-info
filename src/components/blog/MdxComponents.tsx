// src/components/blog/MdxComponents.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/blog/CodeBlock';

// ─── BlogImage ────────────────────────────────────────────────────────────────

export function BlogImage({
    src,
    alt,
    caption,
    width = 900,
    height = 500,
}: {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}) {
    return (
        <figure className="not-prose my-6">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full rounded-lg"
            />
            {caption && (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

// ─── Callout (Good to know / Warning / etc.) ──────────────────────────────────

export function Callout({
    type = 'info',
    children,
}: {
    type?: 'info' | 'warning' | 'error';
    children: React.ReactNode;
}) {
    const styles = {
        info:    'bg-muted text-foreground/80',
        warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
        error:   'bg-destructive/10 text-destructive',
    };
    const icons = { info: 'ℹ', warning: '⚠', error: '✕' };

    return (
        <div className={`not-prose my-5 flex gap-3 rounded-lg px-4 py-3 text-sm leading-relaxed ${styles[type]}`}>
            <span className="shrink-0 opacity-70">{icons[type]}</span>
            <div>{children}</div>
        </div>
    );
}

// ─── MDX component map ────────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
    // ── Headings ──────────────────────────────────────────────────────────────
    h1: ({ children, ...props }) => (
        <h1 className="mt-10 mb-3 text-3xl font-bold tracking-tight text-foreground scroll-mt-28" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2 className="mt-10 mb-3 text-2xl font-bold tracking-tight text-foreground scroll-mt-28" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3 className="mt-8 mb-2 text-xl font-semibold text-foreground scroll-mt-28" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h4 className="mt-6 mb-1 text-base font-semibold text-foreground scroll-mt-28" {...props}>
            {children}
        </h4>
    ),

    // ── Links ─────────────────────────────────────────────────────────────────
    a: ({ href = '#', children, ...props }) => {
        const isExternal = href.startsWith('http') || href.startsWith('//');
        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors"
                    {...props}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link
                href={href}
                className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors"
                {...props}
            >
                {children}
            </Link>
        );
    },

    // ── Inline code ───────────────────────────────────────────────────────────
    code: ({ children, className, ...props }) => {
        if (className) {
            return <code className={className} {...props}>{children}</code>;
        }
        return (
            <code
                className="rounded bg-muted px-[0.4em] py-[0.15em] font-mono text-[0.84em] text-accent"
                {...props}
            >
                {children}
            </code>
        );
    },

    // ── Code block ────────────────────────────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pre: (props: any) => {
        return <CodeBlock {...props} />;
    },

    // ── Blockquote ────────────────────────────────────────────────────────────
    blockquote: ({ children, ...props }) => (
        <blockquote
            className="my-5 border-l-2 border-border pl-4 text-muted-foreground [&>p]:my-0"
            {...props}
        >
            {children}
        </blockquote>
    ),

    // ── Tables ────────────────────────────────────────────────────────────────
    table: ({ children, ...props }) => (
        <div className="my-5 overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left" {...props}>{children}</table>
        </div>
    ),
    thead: ({ children, ...props }) => (
        <thead className="bg-muted text-xs text-muted-foreground" {...props}>
            {children}
        </thead>
    ),
    th: ({ children, ...props }) => (
        <th className="px-3 py-2 font-medium" {...props}>{children}</th>
    ),
    td: ({ children, ...props }) => (
        <td className="px-3 py-2 border-t border-border/30 text-foreground/85" {...props}>{children}</td>
    ),
    tr: ({ children, ...props }) => (
        <tr className="hover:bg-muted/20 transition-colors" {...props}>{children}</tr>
    ),

    // ── Images ────────────────────────────────────────────────────────────────
    // Renders phrasing content only (img + optional span) so it stays valid when
    // MDX wraps markdown images in a <p> (avoids hydration error from <figure> inside <p>).
    // width/height when provided reduce CLS; decoding="async" keeps main thread free.
    img: ({ src, alt, width, height, ...props }) => (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt ?? ''}
                width={width}
                height={height}
                decoding="async"
                loading="lazy"
                className="w-full max-w-full h-auto rounded-lg my-6"
                style={typeof width === 'number' && typeof height === 'number' ? { aspectRatio: `${width} / ${height}` } : undefined}
                {...props}
            />
            {alt && (
                <span className="mt-2 block text-center text-xs text-muted-foreground">
                    {alt}
                </span>
            )}
        </>
    ),

    // ── HR ────────────────────────────────────────────────────────────────────
    hr: () => <hr className="my-8 border-border/30" />,

    // ── Custom MDX-only components ────────────────────────────────────────────
    BlogImage,
    Callout,
};