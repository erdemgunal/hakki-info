'use client';
import React, { useEffect, useState } from 'react';
import {
    AnalyticsData,
    ChartPoint,
    DATE_RANGES,
    UmamiPageviewsResponse,
    UmamiTimeRangeKey,
} from './PageAnalyticsCommon';
import { LineChart } from './PageAnalyticsChart';
import { DateRangeSelect } from './PageAnalyticsDateRangeSelect';
import { BarRow, Divider, SectionTitle, StatCard } from './PageAnalyticsSubcomponents';

interface PageAnalyticsWidgetClientProps {
    data: AnalyticsData;
}

export function PageAnalyticsWidgetClient({ data }: PageAnalyticsWidgetClientProps) {
    const [activeRange, setActiveRange] = useState<UmamiTimeRangeKey>('allTime');
    const [tsData, setTsData] = useState<UmamiPageviewsResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetch(`/api/analytics?path=${encodeURIComponent(data.path)}&period=${activeRange}`)
            .then((r) => r.json())
            .then((json: UmamiPageviewsResponse) => {
                if (!cancelled) { setTsData(json); setLoading(false); }
            })
            .catch(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [activeRange, data.path]);

    const chartPoints: ChartPoint[] = tsData
        ? tsData.pageviews.map((pv, i) => ({
            date: new Date(pv.x),
            pageviews: pv.y,
            sessions: tsData.sessions[i]?.y ?? 0,
        }))
        : [];

    const currentStat = data.ranges[activeRange];
    const activeLabel = DATE_RANGES.find((r) => r.key === activeRange)?.label ?? '';

    return (
        <div className="w-full" style={{ background: '#fff' }}>

            {/* ── Top bar ── */}
            <div
                className="flex items-center justify-between gap-3 flex-wrap px-6 py-4"
                style={{ borderBottom: '1px solid #f3f4f6' }}
            >
                <div className="flex items-center gap-4 flex-wrap min-w-0">
                    <span className="text-sm font-medium" style={{ color: '#374151' }}>
                        Page Analytics
                        <span className="mx-1.5 font-normal" style={{ color: '#d1d5db' }}>/</span>
                        <span style={{ color: '#6b7280', fontWeight: 400 }}>{data.path}</span>
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
                            <svg width="16" height="2" viewBox="0 0 16 2">
                                <line x1="0" y1="1" x2="16" y2="1" stroke="#3b82f6" strokeWidth="2" />
                            </svg>
                            Pageviews
                        </span>
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
                            <svg width="16" height="2" viewBox="0 0 16 2">
                                <line x1="0" y1="1" x2="16" y2="1" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4,3" />
                            </svg>
                            Sessions
                        </span>
                    </div>
                </div>
                <DateRangeSelect value={activeRange} onChange={setActiveRange} />
            </div>

            {/* ── Chart ── */}
            <div className="px-6 pt-4 pb-3">
                <LineChart points={chartPoints} range={activeRange} loading={loading} />
            </div>

            {/* ── Stat cards ── */}
            <div
                className="grid grid-cols-2 mx-6 mb-5 rounded-lg overflow-hidden"
                style={{ border: '1px solid #e5e7eb', gap: 1, background: '#e5e7eb' }}
            >
                <div style={{ background: '#fff' }}>
                    <StatCard label="Page Views" value={currentStat?.pageviews ?? 0} sub={activeLabel} />
                </div>
                <div style={{ background: '#fff' }}>
                    <StatCard label="Unique Visitors" value={currentStat?.visitors ?? 0} sub={activeLabel} />
                </div>
            </div>

            {/* ── Device ── */}
            {data.deviceSummary && (
                <div className="px-6">
                    <Divider />
                    <SectionTitle>Device · last 30 days</SectionTitle>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                            { label: 'Desktop', val: data.deviceSummary.desktop },
                            { label: 'Mobile', val: data.deviceSummary.mobile },
                            { label: 'Other', val: data.deviceSummary.other },
                        ].map(({ label, val }) => (
                            <div key={label} className="rounded-lg p-3 text-center"
                                style={{ border: '1px solid #e5e7eb', background: '#f9fafb' }}>
                                <div className="text-base font-semibold tabular-nums" style={{ color: '#111827' }}>
                                    {Math.round(val.share * 100)}%
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{label}</div>
                                <div className="text-xs tabular-nums" style={{ color: '#d1d5db' }}>
                                    {val.visits.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-0.5 mb-2">
                        {data.deviceSummary.breakdown.map((row) => (
                            <BarRow key={row.device} label={row.device} value={row.visits} share={row.share} color="#3b82f6" />
                        ))}
                    </div>
                </div>
            )}

            {/* ── Referrers ── */}
            {data.referrersSummary.length > 0 && (
                <div className="px-6">
                    <Divider />
                    <SectionTitle>Referrers · last 30 days</SectionTitle>
                    <div className="space-y-0.5 mb-2">
                        {data.referrersSummary.map((row) => (
                            <BarRow key={row.source} label={row.source} value={row.visits} share={row.share} color="#6366f1" />
                        ))}
                    </div>
                </div>
            )}

            {/* ── Countries ── */}
            {data.countriesSummary.length > 0 && (
                <div className="px-6">
                    <Divider />
                    <SectionTitle>Countries · last 30 days</SectionTitle>
                    <div className="space-y-0.5 mb-2">
                        {data.countriesSummary.map((row) => (
                            <BarRow key={row.country} label={row.country} value={row.visits} share={row.share} color="#f59e0b" />
                        ))}
                    </div>
                </div>
            )}

            {/* Spacer before Close button row */}
            <div style={{ height: 4 }} />
        </div>
    );
}