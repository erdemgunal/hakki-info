import * as d3 from 'd3';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type UmamiTimeRangeKey =
    | 'today'
    | 'yesterday'
    | 'thisWeek'
    | 'last7Days'
    | 'last30Days'
    | 'thisMonth'
    | 'lastMonth'
    | 'thisYear'
    | 'lastYear'
    | 'allTime';

export interface RangeStat {
    pageviews: number;
    visitors: number;
}

export interface DeviceSummary {
    total: number;
    mobile: { visits: number; share: number };
    desktop: { visits: number; share: number };
    other: { visits: number; share: number };
    breakdown: { device: string; visits: number; share: number }[];
}

export interface AnalyticsData {
    title: string;
    path: string;
    ranges: Record<UmamiTimeRangeKey, RangeStat | null>;
    deviceSummary: DeviceSummary | null;
    referrersSummary: { source: string; visits: number; share: number }[];
    countriesSummary: { country: string; visits: number; share: number }[];
}

export interface UmamiPageviewsResponse {
    pageviews: { x: string; y: number }[];
    sessions: { x: string; y: number }[];
}

export interface ChartPoint {
    date: Date;
    pageviews: number;
    sessions: number;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

export const DATE_RANGES: { key: UmamiTimeRangeKey; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'thisWeek', label: 'This Week' },
    { key: 'last7Days', label: 'Last 7 Days' },
    { key: 'last30Days', label: 'Last 30 Days' },
    { key: 'thisMonth', label: 'This Month' },
    { key: 'lastMonth', label: 'Last Month' },
    { key: 'thisYear', label: 'This Year' },
    { key: 'lastYear', label: 'Last Year' },
    { key: 'allTime', label: 'All Time' },
];

export const HOURLY_RANGES: UmamiTimeRangeKey[] = ['today', 'yesterday'];
export const MONTHLY_RANGES: UmamiTimeRangeKey[] = ['thisYear', 'lastYear', 'allTime'];

// ─── Formatting helpers ────────────────────────────────────────────────────────

export function getTickFormat(range: UmamiTimeRangeKey): (d: Date) => string {
    if (HOURLY_RANGES.includes(range)) return d3.timeFormat('%H:%M');
    if (MONTHLY_RANGES.includes(range)) return d3.timeFormat('%b %Y');
    return d3.timeFormat('%b %d');
}

export function getTooltipFormat(range: UmamiTimeRangeKey): (d: Date) => string {
    if (HOURLY_RANGES.includes(range)) return d3.timeFormat('%b %d, %H:%M');
    if (MONTHLY_RANGES.includes(range)) return d3.timeFormat('%b %Y');
    return d3.timeFormat('%b %d, %Y');
}