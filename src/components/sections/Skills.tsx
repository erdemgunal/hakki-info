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
            <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    Skills
                </h2>

                {/* Technical Skills Grid */}
                <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    {technical.map((category, index) => (
                        <div
                            key={index}
                            className="bg-surface/50 p-4 sm:p-5 md:p-6 rounded-xl border border-border hover:border-border transition-colors"
                        >
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                                {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {renderBadges(
                                    category.skills.map(skill => skill.name),
                                    'default',
                                    'text-xs sm:text-sm'
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Soft Skills */}
                <div className="bg-surface/50 p-4 sm:p-5 md:p-6 rounded-xl border border-border hover:border-border transition-colors">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                        Soft Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {renderBadges(
                            soft.map(skill => skill.name),
                            'default',
                            'text-xs sm:text-sm'
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}