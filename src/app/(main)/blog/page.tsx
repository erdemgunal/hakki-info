// src/app/(main)/blog/page.tsx
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';

const DAYS_CONSIDERED_NEW = 14;

function isNewPost(date: string): boolean {
    if (!date) return false;
    const postDate = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - postDate.getTime();
    const diffDays = diffMs / (24 * 60 * 60 * 1000);
    return diffDays <= DAYS_CONSIDERED_NEW;
}

export default async function BlogPage() {
    const posts = await getBlogPosts({ sortBy: 'score', promoteLowViews: 2 });
    const path = '/blog';

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">

                {/* Header */}
                <div className="text-left mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-foreground mb-3">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-base">
                        Notes on physics, research and software development.
                    </p>
                </div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No posts yet.</p>
                ) : (
                    <ul className="divide-y divide-border/30">
                        {posts.map((post) => (
                            <li key={post.slug} className="py-6 sm:py-8 first:pt-0 last:pb-0">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group block space-y-3"
                                >
                                    {/* 1. Üst Bilgi (Meta) */}
                                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                                        <time dateTime={post.date}>
                                            {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }) : ''}
                                        </time>
                                        <span className="opacity-30">/</span>
                                        <span>{post.readTimeMinutes} min read</span>
                                    </div>

                                    {/* 2. Başlık Katmanı */}
                                    <div className="space-y-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300 leading-tight tracking-tight">
                                                {post.title}
                                            </h2>
                                            {isNewPost(post.date) && (
                                                <span className="shrink-0 mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-full">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        {/* 3. Özet ve Tagler */}
                                        <div className="space-y-2">
                                            {post.excerpt && (
                                                <p className="text-sm text-muted-foreground/70 line-clamp-2 leading-relaxed font-serif italic">
                                                    {post.excerpt}
                                                </p>
                                            )}

                                            {post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-x-3 text-[10px] sm:text-[11px] font-mono text-muted-foreground/30">
                                                    {post.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="hover:text-accent/50 transition-colors">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <PageAnalyticsSection path={path} />
            </div>
        </main>
    );
}