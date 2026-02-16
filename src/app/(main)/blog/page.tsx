import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-12 font-sans">
                <header className="text-left mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Short notes on projects, automation ideas, and things I am learning.
                    </p>
                </header>

                <section>
                    {posts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No posts yet.</p>
                    ) : (
                        <ul className="space-y-6">
                            {posts.map((post) => (
                                <li key={post.slug}>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="block group border-b border-border/60 pb-5"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-baseline justify-between gap-3">
                                                <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                                                    {post.title}
                                                </h2>
                                                {post.date && (
                                                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap">
                                                        {new Date(post.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                )}
                                            </div>
                                            {post.excerpt && (
                                                <p className="text-sm text-secondary">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}
