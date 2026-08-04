'use client';

import Section from './Section';
import SectionHeading from '@/components/layout/SectionHeading';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function About() {
    const resumeData = useResumeData();
    const { about } = resumeData;

    return (
        <Section id="about" aria-labelledby="about-heading">
            <div className="space-y-4 sm:space-y-5">
                <SectionHeading id="about-heading">About</SectionHeading>
                <p className="max-w-prose text-sm sm:text-base md:text-lg leading-relaxed text-secondary">
                    {about.description}
                </p>
            </div>
        </Section>
    );
}
