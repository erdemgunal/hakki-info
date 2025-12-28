'use client';

import GraduationCapIcon from '@/components/icon/GraduationCapIcon';
import Section from './Section';
import type { ResumeData } from '@/lib/fetch-resume-data';

interface EducationProps {
    resumeData: ResumeData;
}

export default function Education({ resumeData }: EducationProps) {
    const { education } = resumeData;

    return (
        <Section id="education">
            <div className="text-left mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{education.title}</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="bg-surface p-4 sm:p-6 rounded-lg border border-border/50"
                    >
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                                <GraduationCapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
                                    {edu.degree}
                                </h3>
                                <p className="text-base sm:text-lg text-secondary mb-1 sm:mb-2">
                                    {edu.school}
                                </p>
                                <div className="text-sm text-secondary">
                                    {edu.start} - {edu.end}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
} 