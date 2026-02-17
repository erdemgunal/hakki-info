import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { PostSidebar } from '@/components/blog/PostSidebar';
import seo from '@/config/seo.json';
import { formatBlogDate } from '@/lib/date-utils';
import 'katex/dist/katex.min.css';

/** remark-math sadece $ ve $$ kullanır; \( \) ve \[ \] desteklenmez. LaTeX sözdizimini dönüştürüyoruz. */
function normalizeMathDelimiters(content: string): string {
    return content
        .replace(/\\\[/g, '$$')
        .replace(/\\\]/g, '$$')
        .replace(/\\\(/g, '$')
        .replace(/\\\)/g, '$');
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageParams {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: BlogPostPageParams
): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {};
    }

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

    if (!post) {
        notFound();
    }

    const shareUrl = new URL(`/blog/${slug}`, seo.url).toString();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                    <article className="min-w-0">
                        <header className="mb-12 border-b border-border pb-8">
                            {/* Başlık için font-serif kullanarak görseldeki ağırlığı yakalıyoruz */}
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
                        </header>

                        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
                            prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
                            prose-p:leading-relaxed prose-p:text-foreground/90
                            prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border
                            prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
                            [&_.katex]:text-foreground [&_.katex-display]:my-8 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            >
                                {normalizeMathDelimiters(post.content)}
                            </ReactMarkdown>
                        </div>

                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-8 justify-start">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium tracking-wide border border-border/60"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mt-16 lg:hidden border-t pt-8">
                            <PostSidebar title={post.title} shareUrl={shareUrl} />
                        </div>
                    </article>

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