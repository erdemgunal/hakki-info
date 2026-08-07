'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import { isNewPost } from '@/lib/blog-utils';
import { formatDateShort } from '@/lib/date-utils';
import ArrowRightIcon from '@/components/icon/ArrowRightIcon';
import ArrowUpIcon from '@/components/icon/ArrowUpIcon';

// ─── Sub-components ──────────────────────────────────────────────────────────

function TagChip({ tag, small = false }: { tag: string; small?: boolean }) {
    return (
        <span
            className={`inline-flex items-center rounded-md border border-border bg-muted text-muted-foreground font-mono font-medium tracking-wide ${small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5'}`}
        >
            {tag}
        </span>
    );
}

function Thumbnail({
    images,
    title,
    className = '',
    priority = false,
}: {
    images: string[];
    title: string;
    className?: string;
    priority?: boolean;
}) {
    const src = images[0];

    if (src) {
        return (
            <div className={`relative overflow-hidden bg-muted ${className}`}>
                <Image
                    src={src}
                    alt={title}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden bg-muted ${className}`}>
            <div className="absolute inset-0 bg-linear-to-br from-border/30 to-muted" />
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}
            />
        </div>
    );
}

function FeaturedCard({ post }: { post: BlogPostMeta }) {
    const newPost = isNewPost(post.date);
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            <article className="overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 motion-reduce:transition-none hover:border-foreground/30 hover:shadow-lg">
                <Thumbnail
                    images={post.images}
                    title={post.title}
                    className="aspect-3/2 sm:aspect-5/2 w-full"
                    priority
                />

                <div className="space-y-4 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                            <TagChip key={tag} tag={tag} />
                        ))}
                        {newPost && (
                            <span className="inline-flex items-center rounded-md border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-accent">
                                New
                            </span>
                        )}
                        {post.isPromoted && (
                            <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold tracking-wide text-muted-foreground">
                                <ArrowUpIcon /> Underdog
                            </span>
                        )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-accent">
                        {post.title}
                    </h2>

                    {post.excerpt && (
                        <p className="line-clamp-2 text-base leading-relaxed text-muted-foreground">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                            <time dateTime={post.date}>{formatDateShort(post.date)}</time>
                            <span className="opacity-40">·</span>
                            <span>{post.readTimeMinutes} min read</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                            Read <ArrowRightIcon />
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

function PostCard({ post }: { post: BlogPostMeta }) {
    const newPost = isNewPost(post.date);
    const primaryTag = post.tags[0];

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
            <article className="flex h-full min-h-[148px] flex-row overflow-hidden rounded-lg border border-border bg-surface transition-all duration-200 motion-reduce:transition-none hover:border-foreground/30 hover:shadow-lg sm:min-h-0 sm:flex-col">
                <div className="relative w-2/5 shrink-0 sm:w-full">
                    <Thumbnail
                        images={post.images}
                        title={post.title}
                        className="h-full w-full sm:h-auto sm:aspect-video"
                    />
                    {(newPost || post.isPromoted) && (
                        <div className="absolute top-2 left-2 flex gap-1">
                            {newPost && (
                                <span className="rounded-md bg-accent/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                                    New
                                </span>
                            )}
                            {post.isPromoted && (
                                <span className="rounded-md bg-foreground/80 p-1 text-background shadow">
                                    <ArrowUpIcon />
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
                    {primaryTag && <TagChip tag={primaryTag} small />}

                    <h3 className="line-clamp-3 text-sm sm:text-base font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 motion-reduce:transition-none group-hover:text-accent sm:line-clamp-2">
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground/70">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="mt-auto flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50">
                        <time dateTime={post.date}>{formatDateShort(post.date)}</time>
                        <span className="opacity-40">·</span>
                        <span>{post.readTimeMinutes} min read</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface BlogGridProps {
    posts: BlogPostMeta[];
    allTags: string[];
    selectedTag: string | null;
}

export function BlogGrid({ posts, allTags, selectedTag }: BlogGridProps) {
    const router = useRouter();

    const featuredPost = posts[0] ?? null;
    const gridPosts = posts.slice(1);

    function navigate(tag: string | null) {
        router.push(tag ? `/blog?tag=${encodeURIComponent(tag)}` : '/blog');
    }

    const filterRow = allTags.length > 0 && (
        <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
                Filter by topic
            </p>
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => navigate(null)}
                    className={`min-h-11 rounded-md border px-3.5 py-2 text-xs font-medium transition-all duration-200 motion-reduce:transition-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        selectedTag === null
                            ? 'bg-foreground text-background border-foreground'
                            : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                    }`}
                >
                    All
                </button>
                {allTags.map((tag) => {
                    const active = selectedTag === tag;
                    return (
                        <button
                            type="button"
                            key={tag}
                            onClick={() => navigate(active ? null : tag)}
                            className={`min-h-11 rounded-md border px-3.5 py-2 text-xs font-medium transition-all duration-200 motion-reduce:transition-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                                active
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Empty state */}
            {!featuredPost && (
                <p className="text-sm text-muted-foreground py-12 text-center">
                    No posts found for this topic.
                </p>
            )}

            {/* Featured post */}
            {featuredPost && <FeaturedCard post={featuredPost} />}

            {/* Grid */}
            {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}

            {/* Filter row — bottom */}
            {filterRow && (
                <div className="pt-4 border-t border-border/30">
                    {filterRow}
                </div>
            )}
        </div>
    );
}
