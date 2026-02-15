'use client';

import { renderBadges } from '@/lib/badge-utils';

import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Languages() {
    const resumeData = useResumeData();
    const { languages } = resumeData;

    return (
        <Section id="languages">
            <div className="text-left mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{languages.title}</h2>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
                {languages.items.map((language, index) => (
                    <div
                        key={index}
                        className="bg-surface p-4 sm:p-6 rounded-lg border border-border/50"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="text-base sm:text-xl font-semibold text-foreground">
                                {language.name}
                            </h3>
                            <div className="flex shrink-0">
                                {renderBadges([language.level], 'default', 'text-sm')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
} 