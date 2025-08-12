'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { renderBadges } from '@/lib/badge-utils';

export default function WorkExperience() {
  const { workExperience } = resumeData;

  return (
    <section className="py-16 min-h-[50vh]" id="work-experience">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">İş Deneyimi</h2>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="space-y-8">
            {workExperience.map((experience, index) => (
              <motion.div 
                key={index} 
                className="bg-surface p-6 relative"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      <Link 
                        href={experience.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-primary transition-all duration-200 group"
                      >
                        {experience.company}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </h3>
                    <div className="flex items-center gap-4 text-secondary mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {experience.start} - {experience.end}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {experience.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <div className="flex flex-wrap gap-2">
                      {renderBadges(experience.badges, "blue")}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-secondary leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 