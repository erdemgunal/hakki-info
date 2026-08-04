import { ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    'aria-labelledby'?: string;
}

export default function Section({
    id,
    children,
    className = '',
    containerClassName = '',
    'aria-labelledby': ariaLabelledby,
}: SectionProps) {
    return (
        <section
            id={id}
            aria-labelledby={ariaLabelledby}
            className={`scroll-mt-24 ${className}`}
        >
            <div className={containerClassName || 'w-full'}>
                {children}
            </div>
        </section>
    );
}
