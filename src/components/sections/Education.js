'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { GraduationCap } from 'lucide-react';
import { whileInViewAnimation, staggerContainer } from '@/lib/animations';

export default function Education() {
    const { education } = resumeData;

    return (
        <section className="py-16 min-h-[50vh]" id="education">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    {...whileInViewAnimation()}
                >
                    <h2 className="text-4xl font-bold mb-4">Eğitim</h2>
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto"
                    {...whileInViewAnimation(0.2)}
                >
                    <motion.div 
                        className="space-y-6"
                        {...staggerContainer}
                    >
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="bg-surface p-6"
                                {...whileInViewAnimation(index * 0.1)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-lg text-secondary mb-2">
                                            {edu.school}
                                        </p>
                                        <div className="text-sm text-secondary">
                                            {edu.start} - {edu.end}
                                        </div>
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