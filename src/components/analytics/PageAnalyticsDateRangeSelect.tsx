import React, { useEffect, useRef, useState } from 'react';
import { DATE_RANGES, UmamiTimeRangeKey } from './PageAnalyticsCommon';

interface DateRangeSelectProps {
    value: UmamiTimeRangeKey;
    onChange: (value: UmamiTimeRangeKey) => void;
}

export function DateRangeSelect({ value, onChange }: DateRangeSelectProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const activeLabel = DATE_RANGES.find((r) => r.key === value)?.label ?? value;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative" style={{ minWidth: 130 }}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between gap-2 w-full px-3 py-1.5 rounded-md text-xs"
                style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    color: '#374151',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                }}
            >
                <span>{activeLabel}</span>
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}
                >
                    <path
                        d="M1.5 3.5l3.5 3.5 3.5-3.5"
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className="absolute right-0 top-full mt-1 rounded-lg overflow-hidden z-50"
                    style={{
                        background: '#fff',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        minWidth: 130,
                    }}
                >
                    {DATE_RANGES.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => {
                                onChange(key);
                                setOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left"
                            style={{
                                background: key === value ? '#eff6ff' : 'transparent',
                                color: key === value ? '#3b82f6' : '#374151',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                fontWeight: key === value ? 500 : 400,
                            }}
                            onMouseEnter={(e) => {
                                if (key !== value) (e.currentTarget as HTMLElement).style.background = '#f9fafb';
                            }}
                            onMouseLeave={(e) => {
                                if (key !== value) (e.currentTarget as HTMLElement).style.background = 'transparent';
                            }}
                        >
                            <span style={{ width: 14, flexShrink: 0 }}>
                                {key === value && (
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M1.5 5l2.5 2.5 4.5-5"
                                            stroke="#3b82f6"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

