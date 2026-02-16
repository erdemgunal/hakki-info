'use client';

import { ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
}

export default function Section({ id, children, className = '', containerClassName = 'max-w-4xl mx-auto' }: SectionProps) {
    return (
        <section
            id={id}
            className={`py-8 sm:py-12 md:py-16 lg:py-20 scroll-mt-20 ${className}`}
        >
            <div className={containerClassName}>
                {children}
            </div>
        </section>
    );
}