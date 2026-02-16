'use client';

import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Education() {
    const resumeData = useResumeData();
    const { education } = resumeData;

    return (
        <Section id="education">
            <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    Education
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                    {education.items.map((edu, index) => (
                        <div
                            key={index}
                            className="bg-surface/50 p-4 sm:p-5 md:p-6 rounded-xl border border-border hover:border-border transition-colors"
                        >
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-1.5">
                                        {edu.school}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground/80">
                                        {edu.start} - {edu.end}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}