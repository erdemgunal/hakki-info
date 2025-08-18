import { resumeData } from './data/resume-data';
import { generateSlug } from '@/lib/slug-utils';
import { getAllPosts } from '@/lib/blog';

export default function sitemap() {
  // Generate individual project pages
  const projectPages = resumeData.projects.map((project) => {
    const slug = generateSlug(project.title);
    
    return {
      url: `https://hakki.info/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  // Generate blog pages
  const blogPosts = getAllPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `https://hakki.info/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
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
    {
      url: 'https://hakki.info#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://hakki.info#projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://hakki.info#skills',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Add individual project pages
    ...projectPages,
    // Add blog post pages
    ...blogPages,
  ];
}