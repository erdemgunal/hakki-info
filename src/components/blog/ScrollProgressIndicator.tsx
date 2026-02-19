'use client';

import { useEffect, useState } from 'react';

export function ScrollProgressIndicator() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const value = docHeight <= 0 ? 0 : Math.min(1, scrollTop / docHeight);
            setProgress(value);
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className="fixed left-0 top-0 z-50 h-1 w-full bg-muted/30"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
        >
            <div
                className="h-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    );
}
