'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { renderBadges } from '@/lib/badge-utils';
import { whileInViewAnimation, staggerContainer, cardHover } from '@/lib/animations';

export default function Languages() {
  const { languages } = resumeData;

  return (
    <section className="py-16 min-h-[35vh]" id="languages">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          {...whileInViewAnimation()}
        >
          <h2 className="text-4xl font-bold mb-4">Dil Becerileri</h2>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          {...whileInViewAnimation(0.2)}
        >
          <motion.div 
            className="flex flex-col gap-4"
            {...staggerContainer}
          >
            {languages.map((language, index) => (
              <motion.div 
                key={index} 
                className="bg-surface p-6"
                {...whileInViewAnimation(index * 0.1)}
                {...cardHover}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    {language.name}
                  </h3>
                  <div className="flex">
                    {renderBadges([language.level], "blue", "text-sm")}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 