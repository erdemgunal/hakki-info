// src/app/(main)/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { PostSidebar } from '@/components/blog/PostSidebar';
import { mdxComponents } from '@/components/blog/MdxComponents';
import seo from '@/config/seo.json';
import { formatBlogDate } from '@/lib/date-utils';
import 'katex/dist/katex.min.css';

// ─── rehype-pretty-code config ────────────────────────────────────────────────

const prettyCodeOptions = {
    // Ships with Shiki — matches a dark code bg on both light & dark themes
    theme: 'github-dark-dimmed',
    // We control the background via our <pre> in MdxComponents, so keep it transparent
    keepBackground: false,
    // Prevent empty lines from collapsing
    onVisitLine(node: { children: { type: string; value?: string }[] }) {
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
    },
};

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageParams {
    params: Promise<{ slug: string }>;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
    { params }: BlogPostPageParams
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const canonicalUrl = new URL(`/blog/${slug}`, seo.url).toString();

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonicalUrl,
            siteName: seo.siteName,
            type: 'article',
            publishedTime: post.date,
        },
        twitter: {
            card: 'summary' as const,
            title: post.title,
            description: post.excerpt,
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: BlogPostPageParams) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) notFound();

    const shareUrl = new URL(`/blog/${slug}`, seo.url).toString();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">

                    {/* ── Article ───────────────────────────────────────────── */}
                    <article className="min-w-0">

                        {/* Header */}
                        <header className="mb-12 border-b border-border pb-8">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground mb-6">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 text-[15px] text-muted-foreground font-medium">
                                <time dateTime={post.date}>
                                    {formatBlogDate(post.date)}
                                </time>
                                <span className="opacity-40">•</span>
                                <span>{post.readTimeMinutes} min read</span>
                            </div>
                            {post.excerpt && (
                                <p className="mt-5 text-base text-muted-foreground leading-relaxed border-l-2 border-border/50 pl-4">
                                    {post.excerpt}
                                </p>
                            )}
                        </header>

                        {/* MDX body */}
                        <div
                            className="
                                prose prose-lg prose-neutral dark:prose-invert max-w-none

                                /* Headings — font-serif to match the page title */
                                prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight

                                /* Body copy */
                                prose-p:leading-[1.85] prose-p:text-foreground/85

                                /* Links — use accent colour */
                                prose-a:text-accent prose-a:no-underline hover:prose-a:underline

                                /* Inline code — pill style (MdxComponents overrides fenced blocks) */
                                prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
                                prose-code:text-accent prose-code:font-mono prose-code:text-[0.84em]
                                prose-code:before:content-none prose-code:after:content-none

                                /* Fenced code blocks */
                                prose-pre:rounded-xl prose-pre:border prose-pre:border-border
                                prose-pre:bg-[#0d1117] prose-pre:shadow-md

                                /* Blockquote */
                                prose-blockquote:border-l-accent/60 prose-blockquote:text-muted-foreground
                                prose-blockquote:not-italic

                                /* HR */
                                prose-hr:border-border/40

                                /* Lists */
                                prose-ul:marker:text-accent prose-ol:marker:text-muted-foreground

                                /* Tables */
                                prose-table:border prose-table:border-border
                                prose-th:bg-muted prose-th:text-muted-foreground
                                prose-td:border-border/40

                                /* KaTeX */
                                [&_.katex]:text-foreground
                                [&_.katex-display]:my-8
                                [&_.katex-display]:overflow-x-auto
                                [&_.katex-display]:overflow-y-hidden
                                [&_.katex-display]:py-1
                            "
                        >
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm, remarkMath],
                                        rehypePlugins: [
                                            rehypeKatex,
                                            [rehypePrettyCode, prettyCodeOptions],
                                        ],
                                    },
                                }}
                                components={mdxComponents}
                            />
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border/40">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium tracking-wide border border-border/60"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Sidebar — mobile (below content) */}
                        <div className="mt-16 lg:hidden border-t pt-8">
                            <PostSidebar title={post.title} shareUrl={shareUrl} />
                        </div>
                    </article>

                    {/* ── Sidebar — desktop ─────────────────────────────────── */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-32">
                            <PostSidebar title={post.title} shareUrl={shareUrl} />
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}