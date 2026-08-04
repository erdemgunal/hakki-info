import { getBlogPosts } from '@/lib/blog';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { PageShell, PageHeader } from '@/components/layout';

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
        <main id="main-content" className="min-h-screen bg-background">
            <PageShell>
                <PageHeader
                    title="Blog"
                    description="Notes on physics, research and software development."
                />

                <BlogGrid posts={posts} allTags={allTags} selectedTag={selectedTag} />

                <PageAnalyticsSection path={path} />
            </PageShell>
        </main>
    );
}
