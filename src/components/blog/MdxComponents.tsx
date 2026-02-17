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
        <figure className="not-prose my-8">
            <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full object-cover"
                />
            </div>
            {caption && (
                <figcaption className="mt-2.5 text-center text-xs text-muted-foreground italic">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

// ─── MDX component map ────────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
    // ── Headings ──────────────────────────────────────────────────────────────
    h1: ({ children, ...props }) => (
        <h1 className="mt-12 mb-4 font-serif text-3xl font-bold tracking-tight text-foreground scroll-mt-28" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2 className="mt-10 mb-3 font-serif text-2xl font-semibold tracking-tight text-foreground border-b border-border/50 pb-2 scroll-mt-28" {...props}>
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3 className="mt-8 mb-2 font-serif text-xl font-semibold text-foreground scroll-mt-28" {...props}>
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h4 className="mt-6 mb-1.5 text-base font-semibold text-foreground scroll-mt-28" {...props}>
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
                    <span className="ml-0.5 inline-block text-[0.6em] align-super opacity-60">↗</span>
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
    // Fenced blocks (className present) pass through to CodeBlock via <pre>;
    // inline code gets a subtle pill.
    code: ({ children, className, ...props }) => {
        if (className) {
            return <code className={className} {...props}>{children}</code>;
        }
        return (
            <code
                className="rounded-md bg-muted px-[0.4em] py-[0.15em] font-mono text-[0.84em] text-accent border border-border/50"
                {...props}
            >
                {children}
            </code>
        );
    },

    // ── Code block (pre) — use our custom CodeBlock ───────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pre: (props: any) => <CodeBlock {...props} />,

    // ── Blockquote ────────────────────────────────────────────────────────────
    blockquote: ({ children, ...props }) => (
        <blockquote
            className="my-6 border-l-4 border-accent/50 pl-5 py-0.5 italic text-muted-foreground [&>p]:my-1"
            {...props}
        >
            {children}
        </blockquote>
    ),

    // ── Tables ────────────────────────────────────────────────────────────────
    table: ({ children, ...props }) => (
        <div className="my-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm text-left" {...props}>{children}</table>
        </div>
    ),
    thead: ({ children, ...props }) => (
        <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground" {...props}>
            {children}
        </thead>
    ),
    th: ({ children, ...props }) => (
        <th className="px-4 py-3 font-semibold" {...props}>{children}</th>
    ),
    td: ({ children, ...props }) => (
        <td className="px-4 py-3 border-t border-border/40 text-foreground/85" {...props}>{children}</td>
    ),
    tr: ({ children, ...props }) => (
        <tr className="hover:bg-muted/30 transition-colors" {...props}>{children}</tr>
    ),

    // ── Images (plain markdown ![alt](src)) ───────────────────────────────────
    img: ({ src, alt, ...props }) => (
        <figure className="not-prose my-8">
            <div className="overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt ?? ''}
                    className="w-full object-cover"
                    loading="lazy"
                    {...props}
                />
            </div>
            {alt && (
                <figcaption className="mt-2.5 text-center text-xs text-muted-foreground italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    ),

    // ── HR ────────────────────────────────────────────────────────────────────
    hr: () => <hr className="my-10 border-border/40" />,

    // ── Custom MDX-only components ────────────────────────────────────────────
    BlogImage,
};