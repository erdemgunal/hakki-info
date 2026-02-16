'use client';

import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function About() {
    const resumeData = useResumeData();
    const { about } = resumeData;

    return (
        <Section id="about">
            <div className="text-left mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{about.title}</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-lg leading-relaxed text-secondary">
                    {about.description}
                </p>
            </div>
        </Section>
    );
} 