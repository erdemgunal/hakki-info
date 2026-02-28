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
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';
import seo from '@/config/seo.json';
import { formatBlogDate } from '@/lib/date-utils';
import DotIcon from '@/components/icon/DotIcon';
import 'katex/dist/katex.min.css';
import Image from 'next/image';

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
    const imageUrl =
        post.images?.length > 0
            ? post.images[0].startsWith('http')
                ? post.images[0]
                : new URL(post.images[0], seo.url).toString()
            : seo.image;
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
            ...(post.lastUpdated && post.lastUpdated !== post.date && { modifiedTime: post.lastUpdated }),
            images: [{ url: imageUrl }],
        },
        twitter: {
            card: 'summary_large_image' as const,
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
    const { slug } = await params;
    const path = `/blog/${slug}`;
    const post = await getBlogPostBySlug(slug);
    if (!post) notFound();

    const shareUrl = new URL(`/blog/${slug}`, seo.url).toString();

    return (
        <main className="min-h-screen bg-background">
            <ScrollProgressIndicator />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-16">
                    {/* ── Article ─────────────────────────────────────────── */}
                    <article className="min-w-0 lg:col-start-1">

                        {/* Header */}
                        <header className="mb-10">
                            {post.images && post.images.length > 0 && (
                                <Image
                                    src={post.images[0]}
                                    alt={post.title}
                                    width={1000}
                                    height={1000}
                                    className="w-full rounded-lg mb-6"
                                />
                            )}
                            <h1 className="mt-10 mb-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                                {post.lastUpdated && post.lastUpdated !== post.date && (
                                    <>
                                        <DotIcon className="w-1.5 h-1.5 shrink-0 opacity-60" />
                                        <time dateTime={post.lastUpdated} className="text-foreground/20">
                                            Updated {formatBlogDate(post.lastUpdated)}
                                        </time>
                                    </>
                                )}
                                <DotIcon className="w-1.5 h-1.5 shrink-0 opacity-60" />
                                <span>{post.readTimeMinutes} min read</span>
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

                    {/* ── Tags: mobilde article ile sidebar arasında ── */}
                    {post.tags.length > 0 && (
                        <div
                            className="flex flex-wrap gap-2 text-sm text-muted-foreground order-2 lg:hidden pt-6"
                            aria-label="Tags"
                        >
                            {post.tags.map((tag) => (
                                <span key={tag} className="font-mono">#{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* ── Sidebar ───────────────────────────────────────────── */}
                    <aside className="max-lg:order-3 max-lg:mt-8 max-lg:pt-6 max-lg:border-t max-lg:border-border/50 lg:col-start-2 lg:row-span-1">
                        <div className="sticky top-32">
                            <PostSidebar title={post.title} shareUrl={shareUrl} slug={slug} />
                        </div>
                    </aside>
                </div>
                {/* ── Tags: masaüstünde grid ile analytics arasında, tam genişlik ── */}
                {post.tags.length > 0 && (
                    <div
                        className="hidden lg:flex flex-wrap gap-2 text-sm text-muted-foreground pt-6 mt-6"
                        aria-label="Tags"
                    >
                        {post.tags.map((tag) => (
                            <span key={tag} className="font-mono">#{tag}</span>
                        ))}
                    </div>
                )}
                <PageAnalyticsSection path={path} />
            </div>
        </main>
    );
}