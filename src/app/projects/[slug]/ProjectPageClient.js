'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { renderTechStackBadges, renderBadges } from '@/lib/badge-utils';
import { generateSlug } from '@/lib/slug-utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import { resumeData } from '@/app/data/resume-data';

export default function ProjectPageClient({ project }) {
  const router = useRouter();

  const handleBackToPortfolio = () => {
    router.push('/');
    // Wait a bit for navigation to complete, then scroll to projects
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Also trigger focus for accessibility
        projectsSection.focus({ preventScroll: true });
      }
    }, 200);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-16 py-8">
        {/* Back to Portfolio Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={handleBackToPortfolio}
          >
            <ArrowLeft className="w-4 h-4" />
            Portfolyoya Dön
          </Button>
        </div>

        {/* Breadcrumbs */}
        <Breadcrumbs section="Projeler" />

        {/* Project Header */}
        <div className="mt-8 mb-12">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {renderBadges([project.label], "default", "text-sm")}
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                  {project.year}
                </span>
              </div>
            </div>
            
            {/* Project Links */}
            <div className="flex gap-3">
              {project.links.live && (
                <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Canlı
                  </Button>
                </Link>
              )}
              {project.links.github && (
                <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Project Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Kullanılan Teknolojiler</h2>
            <div className="flex flex-wrap gap-2">
              {renderTechStackBadges(project.techStack, project.techStack.length, "outline", "text-sm")}
            </div>
          </div>
        </div>

        {/* Project Images */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Proje Görselleri</h2>
            <div className="grid gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} - Görsel ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-8">
          {/* Problem */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Problem</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Çözüm</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Result */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sonuç</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>

        {/* Navigation to other projects */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-6">Diğer Projeler</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resumeData.projects
              .filter(p => p.title !== project.title)
              .slice(0, 2)
              .map((otherProject) => {
                const otherSlug = generateSlug(otherProject.title);
                
                return (
                  <Link key={otherProject.title} href={`/projects/${otherSlug}`}>
                    <div className="p-4 border border-border rounded-lg hover:border-foreground/30 transition-colors">
                      <h3 className="font-semibold mb-2">{otherProject.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {otherProject.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {otherProject.techStack.slice(0, 3).map(tech => (
                          <span key={tech} className="px-2 py-1 bg-muted text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
