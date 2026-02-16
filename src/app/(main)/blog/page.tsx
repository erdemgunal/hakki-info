import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-12 font-sans">
                <header className="mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Short notes on projects, automation ideas, and things I am learning.
                    </p>
                </header>

                {posts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No posts yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link 
                                    href={`/blog/${post.slug}`} 
                                    className="block group border border-border/40 rounded-lg p-4 sm:p-5 hover:border-border hover:bg-muted/30 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors flex-1 min-w-0">
                                            {post.title}
                                        </h2>
                                        {post.date && (
                                            <time className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap shrink-0">
                                                {new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </time>
                                        )}
                                    </div>
                                    
                                    {post.excerpt && (
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                                        <span>{post.readTimeMinutes} min read</span>
                                        {post.tags.length > 0 && (
                                            <>
                                                <span>•</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags.slice(0, 3).map((tag) => (
                                                        <span 
                                                            key={tag} 
                                                            className="inline-block rounded-md bg-muted px-2 py-0.5 text-[10px] sm:text-xs font-medium"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
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