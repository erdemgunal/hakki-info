'use client';

import { ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
}

export default function Section({ 
    id, 
    children, 
    className = '', 
    containerClassName = '' 
}: SectionProps) {
    return (
        <section
            id={id}
            className={`scroll-mt-24 ${className}`}
        >
            <div className={containerClassName || 'w-full'}>
                {children}
            </div>
        </section>
    );
}