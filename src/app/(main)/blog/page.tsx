// src/app/(main)/blog/page.tsx
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 pb-16">

                {/* Header */}
                <div className="mb-12">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/50 mb-3">
                        Writing
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-base leading-relaxed max-w-md">
                        Notes on physics, research, and software development.
                    </p>
                </div>

                {/* Post list */}
                {posts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No posts yet.</p>
                ) : (
                    <ul className="divide-y divide-border/40">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex items-start justify-between gap-8 py-5
                                               -mx-3 px-3 rounded-lg hover:bg-muted/20 transition-colors duration-150"
                                >
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <h2 className="text-base font-medium text-foreground
                                                       group-hover:text-accent transition-colors duration-150 leading-snug">
                                            {post.title}
                                        </h2>
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
            </div>
        </main>
    );
}