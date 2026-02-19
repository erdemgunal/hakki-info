// src/app/(main)/blog/page.tsx
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">
                <div className="text-left mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Notes on projects, physics, and software.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="text-base text-muted-foreground">No posts yet.</p>
                ) : (
                    <ul className="space-y-0">
                        {posts.map((post) => (
                            <li key={post.slug}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="group flex items-start justify-between gap-6 py-4 hover:bg-muted/30 -mx-3 px-3 rounded-lg transition-colors"
                                >
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-base sm:text-lg font-medium text-foreground group-hover:text-accent transition-colors truncate">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <time className="text-sm text-muted-foreground whitespace-nowrap shrink-0 pt-0.5">
                                        {post.date
                                            ? new Date(post.date).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric',
                                              })
                                            : ''}
                                    </time>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}