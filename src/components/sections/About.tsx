'use client';

import { resumeData } from '@/app/data/resume-data';
import Section from './Section';

export default function About() {
    const { about } = resumeData;

    return (
        <Section id="about">
            <div className="text-left mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Hakkımda</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg leading-relaxed text-secondary">
                    {about.description}
                </p>
            </div>
        </Section>
    );
} 