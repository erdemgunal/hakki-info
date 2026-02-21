'use client';

import Section from './Section';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Community() {
    const resumeData = useResumeData();
    const community = resumeData.community;

    if (!community?.items?.length) return null;

    return (
        <Section id="community">
            <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    Community Engagement
                </h2>

                <div className="space-y-3 sm:space-y-4">
                    {community.items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-surface/50 p-4 sm:p-5 md:p-6 rounded-xl border border-border hover:border-border transition-colors"
                        >
                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">
                                    {item.title}
                                </h3>
                                {item.period && (
                                    <span className="text-xs sm:text-sm text-muted-foreground/80">
                                        {item.period}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
