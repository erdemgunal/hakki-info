import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-4 sm:px-5 md:px-6 lg:px-8 pt-24 sm:pt-24 md:pt-28 pb-16 font-sans">
                <article className="space-y-6">
                    <header className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
                            {post.title}
                        </h1>
                        {post.date && (
                            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        )}
                    </header>

                    {post.excerpt && (
                        <p className="text-sm sm:text-base text-secondary">
                            {post.excerpt}
                        </p>
                    )}

                    {post.content && (
                        <div className="text-sm sm:text-base leading-relaxed text-foreground/90 space-y-3">
                            {post.content.split(/\n{2,}/).map((paragraph, index) => (
                                <p key={index}>{paragraph.trim()}</p>
                            ))}
                        </div>
                    )}
                </article>
            </div>
        </main>
    );
}
