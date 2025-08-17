import { resumeData } from '@/app/data/resume-data';
import { notFound } from 'next/navigation';
import { generateSlug } from '@/lib/slug-utils';
import ProjectPageClient from './ProjectPageClient';

// Generate static params for all projects
export async function generateStaticParams() {
  return resumeData.projects.map((project) => ({
    slug: generateSlug(project.title),
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
  const project = resumeData.projects.find(p => 
    generateSlug(p.title) === params.slug
  );
  
  if (!project) {
    return {
      title: 'Proje Bulunamadı | Hakkı Günal',
    };
  }

  return {
    title: `${project.title} - Full Stack Development Projesi | Hakkı Günal`,
    description: `${project.description} Full Stack Developer Hakkı Günal tarafından ${project.techStack.join(', ')} teknolojileri kullanılarak geliştirilmiştir.`,
    keywords: [
      ...project.techStack,
      'Full Stack Developer',
      'Hakkı Günal',
      'Web Development',
      'İstanbul',
      project.label,
      'Portfolio',
      'Proje',
    ],
    openGraph: {
      title: `${project.title} - Full Stack Development Projesi`,
      description: project.description,
      images: project.images.length > 0 ? [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: `${project.title} - Hakkı Günal Projesi`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Full Stack Development Projesi`,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = resumeData.projects.find(p => 
    generateSlug(p.title) === params.slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
