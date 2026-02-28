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
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">

                {/* Header */}
                <div className="text-left mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Notes on physics, research and software development.
                    </p>
                </div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No posts yet.</p>
                ) : (
                    <ul className="space-y-0">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex items-start justify-between gap-8 py-5
                                               -mx-3 px-3 rounded-lg hover:bg-muted/20 transition-colors duration-150"
                                >
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base font-medium text-foreground
                                                           group-hover:text-accent transition-colors duration-150 leading-snug">
                                                {post.title}
                                            </h2>
                                            {isNewPost(post.date) && (
                                                <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-accent/80">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        {post.excerpt && (
                                            <p className="text-sm text-muted-foreground line-clamp-1 leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        {post.tags.length > 0 && (
                                            <div className="flex gap-2 pt-0.5">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[11px] font-mono text-muted-foreground/50"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="shrink-0 pt-0.5 text-right space-y-1">
                                        <time
                                            dateTime={post.date}
                                            className="block text-xs text-muted-foreground whitespace-nowrap"
                                        >
                                            {post.date
                                                ? new Date(post.date).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'short',
                                                      day: 'numeric',
                                                  })
                                                : ''}
                                        </time>
                                        <span className="block text-[11px] text-muted-foreground/40 font-mono">
                                            {post.readTimeMinutes} min
                                        </span>
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