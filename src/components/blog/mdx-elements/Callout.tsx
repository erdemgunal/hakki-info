import React from 'react';
import InfoIcon from '@/components/icon/InfoIcon';
import WarningIcon from '@/components/icon/WarningIcon';
import ErrorIcon from '@/components/icon/ErrorIcon';

export interface CalloutProps {
    type?: 'info' | 'warning' | 'error';
    children: React.ReactNode;
}

const STYLES = {
    info: 'bg-muted text-foreground/80',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    error: 'bg-destructive/10 text-destructive',
} as const;

const ICONS = {
    info: InfoIcon,
    warning: WarningIcon,
    error: ErrorIcon,
} as const;

export function Callout({ type = 'info', children }: CalloutProps) {
    const IconComponent = ICONS[type];
    return (
        <div className={`not-prose my-4 flex gap-3 rounded-lg px-4 py-2.5 text-sm leading-relaxed ${STYLES[type]}`}>
            <IconComponent className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
            <div>{children}</div>
        </div>
    );
}
