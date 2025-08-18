import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/date-utils';
import Link from 'next/link';
import { Clock, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Blog | Hakkı Günal',
  description: 'Full-stack development, automation, and web technologies insights from Hakkı Günal.',
  openGraph: {
    title: 'Blog | Hakkı Günal',
    description: 'Full-stack development, automation, and web technologies insights from Hakkı Günal.',
    url: 'https://hakki.info/blog',
    siteName: 'Hakkı Günal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Hakkı Günal',
    description: 'Full-stack development, automation, and web technologies insights from Hakkı Günal.',
  },
};

function BlogPostCard({ post }) {
  return (
    <article className="group bg-surface border border-border rounded-xl p-6 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-black/10">
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
          <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-accent hover:text-accent-foreground font-medium transition-colors group/link"
        >
          Devamını oku
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-16 py-8">
        {/* Header */}
        <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
          <div className="p-6 sm:p-10 lg:p-16">
            <div className="space-y-6 mb-12">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Blog
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl">
                  Full-stack development, automation süreçleri ve modern web teknolojileri hakkında deneyimlerimi ve öğrendiklerimi paylaşıyorum.
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{posts.length}</span>
                  <span>yazı</span>
                </div>
              </div>
            </div>

            {/* Blog posts */}
            {posts.length > 0 ? (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    Henüz blog yazısı bulunmuyor
                  </h3>
                  <p className="text-muted-foreground">
                    Yakında ilginç içeriklerle burada olacağım!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Back to home */}
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
  );
}
