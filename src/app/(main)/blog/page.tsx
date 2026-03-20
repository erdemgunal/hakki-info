import { getBlogPosts } from '@/lib/blog';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';
import { BlogGrid } from '@/components/blog/BlogGrid';

interface BlogPageProps {
    searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { tag } = await searchParams;
    const selectedTag = tag ?? null;

    const allPosts = await getBlogPosts({ sortBy: 'score', promoteLowViews: 2 });
    const posts = selectedTag
        ? allPosts.filter((p) => p.tags.includes(selectedTag))
        : allPosts;

    const allTags = [...new Set(allPosts.flatMap((p) => p.tags))].sort();

    const path = '/blog';

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12">
                <div className="text-left mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                        Blog
                    </h1>
                    <p className="text-muted-foreground text-base">
                        Notes on physics, research and software development.
                    </p>
                </div>

                <BlogGrid posts={posts} allTags={allTags} selectedTag={selectedTag} />

                <PageAnalyticsSection path={path} />
            </div>
        </main>
    );
}
