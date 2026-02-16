'use client';

import { renderBadges } from '@/lib/badge-utils';
import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Languages() {
    const resumeData = useResumeData();
    const { languages } = resumeData;

    return (
        <Section id="languages">
            <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Languages
                </h2>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                    {languages.items.map((language, index) => (
                        <div
                            key={index}
                            className="bg-surface/50 p-4 sm:p-5 rounded-xl border border-border hover:border-border transition-colors"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
                                    {language.name}
                                </h3>
                                <div className="shrink-0">
                                    {renderBadges([language.level], 'default', 'text-xs sm:text-sm')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}