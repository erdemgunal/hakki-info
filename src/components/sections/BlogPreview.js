import React from 'react';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/date-utils';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

function BlogPostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group bg-background border border-border rounded-xl p-6 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-black/10 cursor-pointer">
        <div className="space-y-4">
          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Title and description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {post.title}
            </h3>
            {post.description && (
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {post.description}
              </p>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read more indicator */}
          <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:text-accent-foreground transition-colors">
            <span>Devamını oku</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPreview() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3); // Show only latest 3 posts
  
  if (latestPosts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Son Blog Yazıları
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-foreground font-medium transition-colors group"
          >
            Tümünü gör
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Web development, automation ve teknoloji üzerine deneyimlerimi ve öğrendiklerimi paylaşıyorum.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* View All Link for Mobile */}
      <div className="text-center md:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background border border-border rounded-lg font-medium hover:bg-foreground/90 transition-colors"
        >
          Tüm yazıları gör
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
