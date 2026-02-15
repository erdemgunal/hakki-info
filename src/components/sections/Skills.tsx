'use client';

import { renderBadges } from '@/lib/badge-utils';
import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Skills() {
    const resumeData = useResumeData();
    const { skills } = resumeData;
    const { technical, soft } = skills;

    return (
        <Section id="skills">
            <div className="text-left mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{skills.title}</h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <div className="flex flex-wrap gap-4 sm:gap-6">
                    {technical.map((category, index) => (
                        <div
                            key={index}
                            className="bg-surface p-4 sm:p-6 rounded-lg border border-border/50 flex-1 min-w-[280px]"
                        >
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <h3 className="text-base sm:text-xl font-semibold text-foreground">{category.name}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {renderBadges(category.skills.map(skill => skill.name), 'blue', 'text-sm')}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface p-4 sm:p-6 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-xl font-semibold text-foreground">Soft Skills</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {renderBadges(soft.map(skill => skill.name), 'blue', 'text-sm')}
                    </div>
                </div>
            </div>
        </Section>
    );
} 