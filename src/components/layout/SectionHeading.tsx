import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
    id?: string;
    children: ReactNode;
    className?: string;
    as?: 'h2' | 'h3';
}

export default function SectionHeading({
    id,
    children,
    className,
    as: Tag = 'h2',
}: SectionHeadingProps) {
    return (
        <Tag
            id={id}
            className={cn(
                Tag === 'h2'
                    ? 'text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight'
                    : 'text-base sm:text-lg font-semibold text-foreground',
                className,
            )}
        >
            {children}
        </Tag>
    );
}
