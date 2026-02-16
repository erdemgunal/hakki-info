'use client';

import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function About() {
    const resumeData = useResumeData();
    const { about } = resumeData;

    return (
        <Section id="about">
            <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    About
                </h2>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-secondary max-w-3xl">
                    {about.description}
                </p>
            </div>
        </Section>
    );
}