'use client';

import Section from './Section';
import SectionHeading from '@/components/layout/SectionHeading';
import { renderBadges } from '@/lib/badge-utils';
import { useResumeData } from '@/contexts/ResumeDataContext';

export default function Background() {
    const resumeData = useResumeData();
    const { education, languages } = resumeData;
    const community = resumeData.community;

    return (
        <Section id="background" aria-labelledby="background-heading">
            <div className="space-y-8 sm:space-y-10">
                <SectionHeading id="background-heading">Background</SectionHeading>

                <div className="space-y-8 sm:space-y-10">
                    <div>
                        <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Education
                        </h3>
                        <ul className="divide-y divide-border border-y border-border">
                            {education.items.map((edu, index) => (
                                <li key={index} className="py-4 sm:py-5">
                                    <p className="text-base sm:text-lg font-semibold text-foreground">
                                        {edu.degree}
                                    </p>
                                    <p className="mt-0.5 text-sm sm:text-base text-muted-foreground">
                                        {edu.school}
                                    </p>
                                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground/80">
                                        {edu.start} – {edu.end}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            Languages
                        </h3>
                        <ul className="divide-y divide-border border-y border-border">
                            {languages.items.map((language, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between gap-3 py-4 sm:py-5"
                                >
                                    <p className="text-base sm:text-lg font-semibold text-foreground">
                                        {language.name}
                                    </p>
                                    <div className="shrink-0">
                                        {renderBadges([language.level], 'default', 'text-xs sm:text-sm')}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {community?.items?.length ? (
                        <div>
                            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                                Community
                            </h3>
                            <ul className="divide-y divide-border border-y border-border">
                                {community.items.map((item, index) => (
                                    <li key={index} className="py-4 sm:py-5">
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <p className="text-base sm:text-lg font-semibold text-foreground">
                                                {item.title}
                                            </p>
                                            {item.period && (
                                                <span className="text-xs sm:text-sm text-muted-foreground/80">
                                                    {item.period}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </Section>
    );
}
