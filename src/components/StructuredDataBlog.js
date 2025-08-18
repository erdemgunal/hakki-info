export default function StructuredDataBlog({ posts = [] }) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Hakkı Günal Blog',
    description: 'Full-stack development, automation, and web technologies insights from Hakkı Günal.',
    url: 'https://hakki.info/blog',
    author: {
      '@type': 'Person',
      name: 'Hakkı Günal',
      url: 'https://hakki.info',
      sameAs: [
        'https://github.com/erdemgunal',
        'https://linkedin.com/in/erdemgunal',
        'https://x.com/erdemgunal'
      ]
    },
    publisher: {
      '@type': 'Person',
      name: 'Hakkı Günal',
      url: 'https://hakki.info',
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description || post.excerpt,
      url: `https://hakki.info/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: {
        '@type': 'Person',
        name: 'Hakkı Günal'
      },
      keywords: post.tags?.join(', '),
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
    />
  );
}
