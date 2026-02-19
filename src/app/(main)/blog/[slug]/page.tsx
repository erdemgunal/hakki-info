// src/app/(main)/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { mdxComponents } from '@/components/blog/MdxComponents';
import { PostSidebar } from '@/components/blog/PostSidebar';
import { ScrollProgressIndicator } from '@/components/blog/ScrollProgressIndicator';
import seo from '@/config/seo.json';
import { formatBlogDate } from '@/lib/date-utils';
import 'katex/dist/katex.min.css';

const prettyCodeOptions = {
    theme: 'github-dark-dimmed',
    keepBackground: false,
    onVisitLine(node: { children: { type: string; value?: string }[] }) {
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
    },
};

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageParams {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageParams): Promise<Metadata> {
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

export default async function BlogPostPage({ params }: BlogPostPageParams) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) notFound();

    const shareUrl = new URL(`/blog/${slug}`, seo.url).toString();

    return (
        <main className="min-h-screen bg-background">
            <ScrollProgressIndicator />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-16">

                    {/* ── Article ─────────────────────────────────────────── */}
                    <article className="min-w-0">

                        {/* Header */}
                        <header className="mb-10">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                                <span>·</span>
                                <span>{post.readTimeMinutes} min read</span>
                                {post.tags.length > 0 && (
                                    <>
                                        <span>·</span>
                                        {post.tags.map((tag) => (
                                            <span key={tag}>#{tag}</span>
                                        ))}
                                    </>
                                )}
                            </div>
                            {post.excerpt && (
                                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                                    {post.excerpt}
                                </p>
                            )}
                        </header>

                        {/* MDX body */}
                        <div className="
                            prose prose-neutral dark:prose-invert max-w-none
                            prose-p:leading-[1.8] prose-p:text-foreground/85 prose-p:my-4
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-2
                            prose-h4:text-base prose-h4:mt-6 prose-h4:mb-1
                            prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-normal
                            prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
                            prose-code:text-accent prose-code:font-mono prose-code:text-[0.84em]
                            prose-code:before:content-none prose-code:after:content-none
                            prose-pre:my-5 prose-pre:rounded-xl prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0
                            prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:text-muted-foreground
                            prose-blockquote:not-italic prose-blockquote:pl-4 prose-blockquote:my-5
                            prose-blockquote:[&>p]:my-0
                            prose-hr:border-border/30 prose-hr:my-8
                            prose-ul:my-4 prose-ul:marker:text-muted-foreground
                            prose-ol:my-4 prose-ol:marker:text-muted-foreground
                            prose-li:my-1
                            prose-img:rounded-lg prose-img:my-6
                            prose-table:text-sm
                            [&_.katex]:text-foreground
                            [&_.katex-display]:my-6 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-1
                        ">
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm, remarkBreaks, remarkMath],
                                        rehypePlugins: [
                                            rehypeKatex,
                                            [rehypePrettyCode, prettyCodeOptions],
                                        ],
                                    },
                                }}
                                components={mdxComponents}
                            />
                        </div>
                    </article>

                    {/* ── Sidebar (visible on desktop and mobile) ───────────────── */}
                    <aside className="max-lg:mt-8 max-lg:pt-6 max-lg:border-t max-lg:border-border/50">
                        <div className="sticky top-32">
                            <PostSidebar title={post.title} shareUrl={shareUrl} />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}