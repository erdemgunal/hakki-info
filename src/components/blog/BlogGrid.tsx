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
            className={`inline-flex items-center rounded-full border border-border bg-muted text-muted-foreground font-mono font-medium tracking-wide ${small ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-0.5'}`}
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
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="rounded-3xl border border-border/30 bg-card overflow-hidden hover:shadow-2xl transition-all duration-200">
                {/* Image */}
                <Thumbnail
                    images={post.images}
                    title={post.title}
                    className="aspect-3/2 sm:aspect-5/2 w-full"
                    priority
                />

                {/* Body */}
                <div className="p-6 sm:p-8 space-y-4">
                    {/* Tags row */}
                    <div className="flex flex-wrap items-center gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                            <TagChip key={tag} tag={tag} />
                        ))}
                        {newPost && (
                            <span className="inline-flex items-center rounded-full bg-accent/10 border border-accent/25 px-2.5 py-0.5 text-xs font-semibold text-accent tracking-wide">
                                New
                            </span>
                        )}
                        {post.isPromoted && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground tracking-wide">
                                <ArrowUpIcon /> Underdog
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                        {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="text-muted-foreground leading-relaxed line-clamp-2 text-base">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                            <time dateTime={post.date}>{formatDateShort(post.date)}</time>
                            <span className="opacity-40">·</span>
                            <span>{post.readTimeMinutes} min read</span>
                        </div>
                        <span className="text-sm font-medium text-accent inline-flex items-center gap-1.5">
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
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <article className="rounded-md border border-border/30 bg-card overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-row sm:flex-col min-h-[148px] sm:min-h-0">
                {/* Mobile: image side (left) — Desktop: thumbnail (top) */}
                <div className="relative w-2/5 shrink-0 sm:w-full">
                    <Thumbnail
                        images={post.images}
                        title={post.title}
                        className="h-full sm:h-auto sm:aspect-video w-full"
                    />
                    {/* Badges overlay */}
                    {(newPost || post.isPromoted) && (
                        <div className="absolute top-2 left-2 flex gap-1">
                            {newPost && (
                                <span className="rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-white tracking-wide uppercase shadow">
                                    New
                                </span>
                            )}
                            {post.isPromoted && (
                                <span className="rounded-full bg-foreground/80 p-1 text-background shadow">
                                    <ArrowUpIcon />
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile: content side (right) — Desktop: body (bottom) */}
                <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1 min-w-0">
                    {primaryTag && <TagChip tag={primaryTag} small />}

                    <h3 className="font-bold text-sm sm:text-base leading-snug tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-3 sm:line-clamp-2">
                        {post.title}
                    </h3>

                    {post.excerpt && (
                        <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2 flex-1">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 mt-auto font-mono">
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
                    onClick={() => navigate(null)}
                    className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
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
                            key={tag}
                            onClick={() => navigate(active ? null : tag)}
                            className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
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
