import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    className?: string;
    children?: ReactNode;
}

export default function PageHeader({
    title,
    description,
    className,
    children,
}: PageHeaderProps) {
    return (
        <header className={cn('mb-8 sm:mb-10 text-left', className)}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {title}
            </h1>
            {description && (
                <p className="mt-2 sm:mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
                    {description}
                </p>
            )}
            {children}
        </header>
    );
}
