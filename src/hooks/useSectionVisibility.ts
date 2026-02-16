'use client';

import { useEffect, useState } from 'react';

const SECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
    rootMargin: '-10% 0px -60% 0px',
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
};

export function useSectionVisibility(sectionIds: readonly string[], defaultId = 'hero'): string {
    const [activeId, setActiveId] = useState<string>(defaultId);

    useEffect(() => {
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el != null);

        if (elements.length === 0) return;

        const visibility = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibility.set(entry.target.id, entry.intersectionRatio);
                });

                const visibleSections = sectionIds.filter((id) => {
                    const ratio = visibility.get(id) ?? 0;
                    return ratio > 0;
                });

                if (visibleSections.length > 0) {
                    const mostVisible = visibleSections.reduce((a, b) =>
                        (visibility.get(a) ?? 0) >= (visibility.get(b) ?? 0) ? a : b
                    );
                    setActiveId(mostVisible);
                }
            },
            SECTION_OBSERVER_OPTIONS
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sectionIds]);

    return activeId;
}
