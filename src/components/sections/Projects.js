'use client';

import { motion } from 'framer-motion';
import { resumeData } from "@/app/data/resume-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { renderTechStackBadges, renderBadges } from "@/lib/badge-utils"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { whileInViewAnimation, staggerContainer } from '@/lib/animations';
import { useTheme } from 'next-themes';

export default function Projects() {
  const { projects } = resumeData
  const { resolvedTheme } = useTheme();
  
  // Tema bazlı placeholder seçimi
  const getPlaceholderImage = () => {
    if (resolvedTheme === 'dark') {
      return "/placeholder-dark.svg";
    }
    return "/placeholder-light.svg";
  };

  return (
    <section className="mt-12 bg-transparent" id="projects">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          {...whileInViewAnimation()}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Projeler</h2>
        </motion.div>
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          {...staggerContainer}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              {...whileInViewAnimation(0.3 + (index * 0.1))}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-surface rounded-lg border border-border overflow-hidden hover:border-foreground/30 cursor-pointer hover:shadow-lg group flex flex-col h-full">
                    <div className="h-48 bg-background relative overflow-hidden">
                      <Image
                        src={project.images[0] || getPlaceholderImage()}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-300 filter blur-[2px] group-hover:blur-0"
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

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>

                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

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
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">{project.title}</DialogTitle>
                    <div className="flex items-center gap-4 mt-2">
                      {renderBadges([project.label], "outline")}
                      <span className="text-muted-foreground">{project.year}</span>
                    </div>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Project Images */}
                    {project.images && project.images.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Proje Görselleri</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.images.map((image, index) => (
                            <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                              <Image
                                src={image || getPlaceholderImage()}
                                alt={`${project.title} - ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Problem Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        Problem
                      </h4>
                      <p className="text-muted-foreground leading-relaxed p-4 rounded-lg bg-card border-l-4 border-red-500 shadow-sm">
                        {project.problem}
                      </p>
                    </div>

                    {/* Solution Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        Çözüm
                      </h4>
                      <p className="text-muted-foreground leading-relaxed p-4 rounded-lg bg-card border-l-4 border-blue-500 shadow-sm">
                        {project.solution}
                      </p>
                    </div>

                    {/* Result Section */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        Sonuç
                      </h4>
                      <p className="text-muted-foreground leading-relaxed p-4 rounded-lg bg-card border-l-4 border-green-500 shadow-sm">
                        {project.result}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Kullanılan Teknolojiler</h4>
                      <div className="flex flex-wrap gap-2">
                        {renderTechStackBadges(project.techStack, project.techStack.length, "outline")}
                      </div>
                    </div>

                    {/* Links */}
                    {(project.links.live || project.links.github) && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Proje Linkleri</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.links.live && (
                            <Button variant="default" asChild>
                              <Link
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Canlı Demo
                              </Link>
                            </Button>
                          )}
                          {project.links.github && (
                            <Button variant="outline" asChild>
                              <Link
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Github className="w-4 h-4" />
                                GitHub
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View More Projects Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
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