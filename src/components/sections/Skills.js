'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { renderBadges } from '@/lib/badge-utils';
import { whileInViewAnimation, staggerContainer } from '@/lib/animations';

export default function Skills() {
  const { skills } = resumeData;
  const { technical, soft } = skills;

  return (
    <section className="py-16 min-h-[70vh]" id="skills">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-left mb-12"
          {...whileInViewAnimation()}
        >
          <h2 className="text-4xl font-bold mb-4">Teknik Beceriler</h2>
        </motion.div>
        
        <motion.div 
          className="max-w-6xl mx-auto space-y-8"
          {...whileInViewAnimation(0.2)}
        >
          {/* Technical Skills */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            {...staggerContainer}
          >
            {technical.map((category, index) => (
              <motion.div 
                key={index} 
                className="bg-surface p-6"
                {...whileInViewAnimation(index * 0.1)}
              >
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {renderBadges(category.skills.map(skill => skill.name), "blue", "text-sm")}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Soft Skills */}
          <motion.div 
            className="bg-surface p-6"
            {...whileInViewAnimation(0.5)}
          >
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-semibold text-foreground">Soft Skills</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {renderBadges(soft.map(skill => skill.name), "blue", "text-sm")}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 