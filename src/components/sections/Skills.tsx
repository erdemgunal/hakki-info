'use client';

import { renderBadges } from '@/lib/badge-utils';
import Section from './Section';
import SectionHeading from '@/components/layout/SectionHeading';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Skills() {
    const resumeData = useResumeData();
    const { skills } = resumeData;
    const { technical, soft } = skills;

    return (
        <Section id="skills" aria-labelledby="skills-heading">
            <div className="space-y-6 sm:space-y-8">
                <SectionHeading id="skills-heading">Skills</SectionHeading>

                <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
                    {technical.map((category, index) => (
                        <div
                            key={index}
                            className="border-t border-border pt-4 sm:pt-5"
                        >
                            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">
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

                <div className="border-t border-border pt-4 sm:pt-5">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">
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
