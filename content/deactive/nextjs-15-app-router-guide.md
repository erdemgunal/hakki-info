---
title: "Next.js 15 App Router: Kapsamlı Geliştirici Rehberi"
description: "Next.js 15'te App Router kullanarak modern web uygulamaları geliştirme rehberi. Server Components, routing ve performance optimizasyonları."
date: "2025-08-18"
tags: ["Next.js", "React", "App Router", "Server Components", "Performance"]
featured: true
author: "Hakkı Günal"
excerpt: "Bu portfolyo sitesini geliştirirken öğrendiğim Next.js 15 App Router deneyimlerimi ve best practices'leri paylaşıyorum."
active: true
---

Bu portfolyo sitesini Next.js 15'te App Router kullanarak geliştirirken, birçok yeni özellik ve pattern öğrendim. Bu yazıda, App Router'ın avantajlarını ve gerçek projede nasıl kullandığımı paylaşacağım.

## App Router vs Pages Router: Temel Farklar

Next.js 13'te tanıtılan App Router, klasik Pages Router'a kıyasla birçok avantaj sunuyor:

### App Router Avantajları

- **Server Components**: Daha iyi performance ve SEO
- **Nested Layouts**: Layout paylaşımı ve composition
- **Route Groups**: Daha organized routing
- **Loading & Error States**: Built-in UI states
- **Streaming**: Progressive page loading

## Proje Yapısı ve Routing

Bu portfolyo sitesinde kullandığım dosya yapısı:

```
src/app/
├── layout.js              # Root layout
├── page.js                # Ana sayfa
├── globals.css            # Global styles
├── sitemap.js            # SEO sitemap
├── blog/
│   ├── page.js           # Blog listing
│   └── [slug]/
│       ├── page.js       # Blog post
│       └── not-found.js  # 404 page
├── projects/
│   └── [slug]/
│       ├── page.js       # Project detail
│       └── not-found.js
└── data/
    └── resume-data.js    # Content management
```

## Server Components ile Performance

Server Components, bu projenin en önemli özelliği. JavaScript bundle boyutunu minimize ederek performance artırıyor:

```javascript
// Server Component - Client'a JavaScript gönderilmiyor
export default async function BlogPost({ params }) {
  // Server-side data fetching
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <time>{formatDate(post.date)}</time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### Client Component'lere Ne Zaman İhtiyaç Var?

Sadece interactivity gereken yerlerde:

```javascript
'use client'; // Bu directive zorunlu

import { useState } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Client-side only code
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
```

## Dynamic Routing ve Static Generation

### generateStaticParams ile Static Generation

Blog posts ve project pages için static generation:

```javascript
// Blog post sayfası
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: `${post.title} | Hakkı Günal`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}
```

### notFound() Kullanımı

404 durumları için elegant handling:

```javascript
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound(); // Otomatik olarak not-found.js'i render eder
  }
  
  return <PostContent post={post} />;
}
```

## SEO ve Metadata Management

### Dynamic Metadata Generation

Her sayfa için optimize edilmiş metadata:

```javascript
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const url = `https://hakki.info/blog/${params.slug}`;
  
  return {
    title: `${post.title} | Hakkı Günal Blog`,
    description: post.description,
    keywords: post.tags?.join(', '),
    authors: [{ name: 'Hakkı Günal' }],
    openGraph: {
      title: post.title,
      description: post.description,
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
      description: post.description,
      creator: '@erdemgunal',
    },
    alternates: {
      canonical: url,
    },
  };
}
```

### Sitemap Generation

Otomatik sitemap oluşturma:

```javascript
import { getAllPosts } from '@/lib/blog';
import { resumeData } from './data/resume-data';

export default function sitemap() {
  const posts = getAllPosts();
  
  const blogPages = posts.map((post) => ({
    url: `https://hakki.info/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const projectPages = resumeData.projects.map((project) => ({
    url: `https://hakki.info/projects/${generateSlug(project.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://hakki.info',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://hakki.info/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPages,
    ...projectPages,
  ];
}
```

## Content Management Strategy

### Markdown-based Approach

Blog içeriği için Markdown + frontmatter:

```markdown
---
title: "Blog Post Title"
description: "Post description for SEO"
date: "2024-01-15"
tags: ["Tag1", "Tag2"]
featured: true
author: "Hakkı Günal"
---

# Blog Content

Your markdown content here...
```

### Gray-matter ile Parsing

```javascript
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content);
  
  return {
    slug,
    content: processedContent.toString(),
    ...data,
  };
}
```

## Performance Optimizations

### Image Optimization

Next.js Image component ile otomatik optimization:

```javascript
import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      {project.images?.length > 0 && (
        <Image
          src={project.images[0]}
          alt={project.title}
          width={600}
          height={400}
          className="rounded-lg"
          priority={project.featured} // Featured projeler için priority
        />
      )}
    </div>
  );
}
```

### Streaming ve Suspense

Loading states için Suspense:

```javascript
import { Suspense } from 'react';

export default function Layout({ children }) {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  );
}

function Loading() {
  return <div className="loading-spinner">Loading...</div>;
}
```

## Error Handling

### Global Error Boundary

```javascript
'use client';

export default function Error({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
```

## Bundle Analysis ve Performance

### Bundle Size Monitoring

```bash
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config
});
```

### Core Web Vitals

App Router ile elde ettiğim performans metrikleri:

- **LCP**: 1.2s (Target: <2.5s) ✅
- **FID**: 45ms (Target: <100ms) ✅  
- **CLS**: 0.02 (Target: <0.1) ✅

## Migration Tips

Pages Router'dan App Router'a geçiş yapacaksanız:

### 1. Gradual Migration
Kademeli olarak sayfaları migrate edin:

```javascript
// next.config.js
module.exports = {
  experimental: {
    appDir: true, // App Router'ı etkinleştir
  },
};
```

### 2. Client/Server Component Separation
- Server Components: Data fetching, static content
- Client Components: Interactivity, state management

### 3. Data Fetching Patterns
```javascript
// ❌ Pages Router
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// ✅ App Router
export default async function Page() {
  const data = await fetchData(); // Directly in component
  return <div>{data.title}</div>;
}
```

## Sonuç

Next.js 15 App Router, modern web development için güçlü bir foundation sunuyor. Bu portfolyo projesinde:

- **%40 daha küçük bundle size** elde ettim
- **SEO performance %60 arttı**
- **Developer experience significantly improved**
- **Maintenance overhead azaldı**

App Router'ın sunduğu Server Components, nested layouts ve improved routing sistem, development experience'ı bir üst seviyeye taşıyor.

*Next.js 15 ve App Router hakkında sorularınız varsa, [benimle iletişime geçebilirsiniz](mailto:me@hakki.info).*
