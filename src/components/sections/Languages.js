'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { renderBadges } from '@/lib/badge-utils';

export default function Languages() {
  const { languages } = resumeData;

  return (
    <section className="py-16 min-h-[35vh]" id="languages">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Dil Becerileri</h2>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            {languages.map((language, index) => (
              <motion.div 
                key={index} 
                className="bg-surface p-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1
                }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
} 