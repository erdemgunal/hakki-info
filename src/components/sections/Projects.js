'use client';

import { motion } from 'framer-motion';
import { resumeData } from "@/app/data/resume-data"

import { Button } from "@/components/ui/button"
import { 
    renderTechStackBadges, 
    renderBadges } 
from "@/lib/badge-utils"
import { generateSlug } from '@/lib/slug-utils';
import Image from "next/image"
import Link from "next/link"
import { 
    ExternalLink
} from "lucide-react"
import { whileInViewAnimation } from '@/lib/animations';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Projects() {
  const { projects } = resumeData
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Tema bazlı placeholder seçimi
  const getPlaceholderImage = () => {
    if (!mounted) {
      return "/placeholder-light.svg"; // Default placeholder for SSR
    }
    if (resolvedTheme === 'dark') {
      return "/placeholder-dark.svg";
    }
    return "/placeholder-light.svg";
  };

  // Optimized stagger container for faster loading
  const optimizedStaggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05 // Reduced from 0.1 to 0.05 for faster loading
      }
    }
  };

  // Optimized animation for individual projects
  const optimizedProjectAnimation = (index) => ({
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-50px" }, // Reduced margin for earlier loading
    transition: { 
      duration: 0.4, // Reduced from 0.6 to 0.4
      delay: index * 0.03 // Reduced delay for faster loading
    }
  });

  return (
    <section className="mt-12 bg-transparent" id="projects">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-left mb-12"
          {...whileInViewAnimation()}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Projeler</h2>
        </motion.div>
        <motion.div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          {...optimizedStaggerContainer}
        >
          {projects.map((project, index) => {
            const projectSlug = generateSlug(project.title);
            
            return (
              <motion.div
                key={index}
                {...optimizedProjectAnimation(index)}
              >
                <Link href={`/projects/${projectSlug}`}>
                  <div className="bg-surface rounded-lg border border-border overflow-hidden hover:border-foreground/30 cursor-pointer hover:shadow-lg group flex flex-col h-full transition-all duration-200">
                    <div className="h-40 bg-background relative overflow-hidden">
                      <Image
                        src={project.images[0] || getPlaceholderImage()}
                        alt={`${project.title} - Full Stack Development Project by Hakkı Günal`}
                        fill
                        className="object-cover transition-all duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
                      
                      {/* Label positioned at top-left */}
                      <div className="absolute top-4 left-4">
                        {renderBadges([project.label], "outline", "text-xs bg-background/80 backdrop-blur-sm")}
                      </div>
                      
                      {/* Year positioned at bottom-right */}
                      <div className="absolute bottom-4 right-4">
                        <span className="text-sm text-white font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>

                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {renderTechStackBadges(project.techStack.slice(0, 3), 3, "outline", "text-xs")}
                          {project.techStack.length > 3 && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              +{project.techStack.length - 3} daha
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-accent font-medium text-center mt-auto pt-4 border-t border-border/50 group-hover:text-foreground transition-colors duration-200">
                        Detayları görmek için tıklayın
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* View More Projects Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }} // Reduced margin for earlier loading
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }} // Reduced duration and delay
        >
          <Button variant="outline" size="lg" asChild>
            <Link
              href={resumeData.hero.contact.social.find(social => social.name === "GitHub")?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mx-auto text-accent"
            >
              Daha Fazla Proje Görüntüle
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}