import React from 'react';

interface StatCardProps {
    label: string;
    value: number;
    sub?: string;
}

// Note: StatCard has no outer border/background — the parent joined-grid wrapper
// in PageAnalyticsWidgetClient provides the container and the 1px divider between cells.
export function StatCard({ label, value, sub }: StatCardProps) {
    return (
        <div className="p-4">
            <div className="text-xs mb-1" style={{ color: '#9ca3af' }}>
                {label}
            </div>
            <div
                className="text-2xl font-semibold tabular-nums"
                style={{ color: '#111827', fontVariantNumeric: 'tabular-nums' }}
            >
                {value.toLocaleString()}
            </div>
            {sub && (
                <div className="text-xs mt-0.5" style={{ color: '#d1d5db' }}>
                    {sub}
                </div>
            )}
        </div>
    );
}

interface BarRowProps {
    label: string;
    value: number;
    share: number;
    color: string;
}

export function BarRow({ label, value, share, color }: BarRowProps) {
    return (
        <div className="flex items-center gap-3 py-1.5">
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs truncate" style={{ color: '#374151' }}>
                        {label || '(direct)'}
                    </span>
                    <span className="text-xs ml-2 shrink-0 tabular-nums" style={{ color: '#9ca3af' }}>
                        {value.toLocaleString()}
                    </span>
                </div>
                <div className="h-0.5 rounded-full" style={{ background: '#f3f4f6' }}>
                    <div
                        className="h-0.5 rounded-full"
                        style={{ width: `${Math.round(share * 100)}%`, background: color }}
                    />
                </div>
            </div>
            <span className="text-xs w-8 text-right shrink-0 tabular-nums" style={{ color: '#9ca3af' }}>
                {Math.round(share * 100)}%
            </span>
        </div>
    );
}

interface SectionTitleProps {
    children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
    return (
        <h3 className="text-sm font-medium mb-3" style={{ color: '#111827' }}>
            {children}
        </h3>
    );
}

export function Divider() {
    return <div style={{ borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />;
}