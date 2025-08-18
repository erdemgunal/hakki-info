import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog';
import { formatDate } from '@/lib/date-utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Tag, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const url = `https://hakki.info/blog/${slug}`;
  
  return {
    title: `${post.title} | Hakkı Günal Blog`,
    description: post.description || post.excerpt || `${post.title} - Hakkı Günal&apos;ın blog yazısı`,
    keywords: post.tags?.join(', '),
    authors: [{ name: 'Hakkı Günal' }],
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      url,
      siteName: 'Hakkı Günal',
      type: 'article',
      publishedTime: post.date,
      authors: ['Hakkı Günal'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
      creator: '@erdemgunal',
    },
    alternates: {
      canonical: url,
    },
  };
}

function RelatedPostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-4 bg-surface border border-border rounded-lg hover:border-accent transition-all duration-300 hover:shadow-md"
    >
      <div className="space-y-2">
        <h4 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h4>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Hakkı Günal',
      url: 'https://hakki.info',
    },
    publisher: {
      '@type': 'Person',
      name: 'Hakkı Günal',
      url: 'https://hakki.info',
    },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    url: `https://hakki.info/blog/${slug}`,
    keywords: post.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hakki.info/blog/${slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-16 py-8">
          {/* Back navigation */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-foreground font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog&apos;a geri dön
            </Link>
          </div>

          {/* Article */}
          <article className="bg-surface border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
            <div className="p-6 sm:p-10 lg:p-16">
              {/* Article header */}
              <header className="space-y-6 mb-12">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                    {post.title}
                  </h1>
                  
                  {post.description && (
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </div>

                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border pt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime}</span>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </header>

              {/* Article content */}
              <div 
                className="
                  max-w-none text-foreground leading-relaxed
                  [&>h1]:text-2xl [&>h1]:font-semibold [&>h1]:text-foreground [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:first:mt-0
                  [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:first:mt-0
                  [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3
                  [&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-foreground [&>h4]:mt-6 [&>h4]:mb-3
                  [&>p]:text-muted-foreground [&>p]:mb-4 [&>p]:leading-relaxed
                  [&>ul]:mb-4 [&>ul]:pl-6 [&>ul]:space-y-2
                  [&>ol]:mb-4 [&>ol]:pl-6 [&>ol]:space-y-2
                  [&>li]:text-muted-foreground [&>li]:leading-relaxed
                  [&>blockquote]:border-l-4 [&>blockquote]:border-accent [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground [&>blockquote]:my-6
                  [&>pre]:bg-muted [&>pre]:border [&>pre]:border-border [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:my-6
                  [&>code]:text-accent [&>code]:bg-accent/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                  [&>pre_code]:text-foreground [&>pre_code]:bg-transparent [&>pre_code]:p-0
                  [&>a]:text-accent [&>a]:no-underline hover:[&>a]:underline [&>a]:font-medium
                  [&>strong]:text-foreground [&>strong]:font-semibold
                  [&>em]:italic
                  [&>hr]:border-border [&>hr]:my-8
                  [&>table]:w-full [&>table]:border-collapse [&>table]:my-6
                  [&>thead]:border-b [&>thead]:border-border
                  [&>th]:text-left [&>th]:p-3 [&>th]:font-semibold [&>th]:text-foreground
                  [&>td]:p-3 [&>td]:text-muted-foreground [&>td]:border-b [&>td]:border-border/50
                  [&>img]:rounded-lg [&>img]:my-6 [&>img]:shadow-md
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
                <div className="p-6 sm:p-10 lg:p-16">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    İlgili Yazılar
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-foreground font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
