import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageShellProps {
    children: ReactNode;
    className?: string;
    /** Extra bottom padding when analytics widget follows */
    as?: 'div' | 'main';
    id?: string;
}

export default function PageShell({
    children,
    className,
    as: Tag = 'div',
    id,
}: PageShellProps) {
    return (
        <Tag
            id={id}
            className={cn(
                'mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16',
                className,
            )}
        >
            {children}
        </Tag>
    );
}
