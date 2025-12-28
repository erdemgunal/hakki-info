import { resumeData } from './data/resume-data';
import { generateSlug } from '@/lib/slug-utils';

export default function sitemap() {
  const projectPages = resumeData.projects.map((project) => {
    const slug = generateSlug(project.title);
    
    return {
      url: `https://hakki.info/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [
    {
      url: 'https://hakki.info',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
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
    ...projectPages,
  ];
}