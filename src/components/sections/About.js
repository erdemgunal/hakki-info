'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/app/data/resume-data';
import { whileInViewAnimation } from '@/lib/animations';

export default function About() {
    const { about } = resumeData;

    return (
        <section className="py-16 min-h-[50vh] scroll-mt-20" id="about">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="text-left mb-12"
                    {...whileInViewAnimation()}
                >
                    <h2 className="text-4xl font-bold mb-4">Hakkımda</h2>
                </motion.div>

                <motion.div
                    className="space-y-6 text-lg leading-relaxed text-foreground/80"
                    {...whileInViewAnimation(0.3)}
                >
                    <p className="text-lg leading-relaxed text-secondary">
                        {about.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
} 