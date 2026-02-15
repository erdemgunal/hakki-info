'use client';

import { useEffect, useState } from 'react';

const FOOTER_OBSERVER_OPTIONS: IntersectionObserverInit = {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0,
};

export function useFooterInView(footerId: string): boolean {
    const [footerInView, setFooterInView] = useState(false);

    useEffect(() => {
        const footer = document.getElementById(footerId);
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setFooterInView(entry.isIntersecting),
            FOOTER_OBSERVER_OPTIONS
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, [footerId]);

    return footerInView;
}
