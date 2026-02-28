/**
 * Server-only Umami API client for fetching website stats.
 * Used by PageAnalyticsWidget to show per-page analytics (privacy-safe, server-side).
 *
 * Requires: UMAMI_APP_URL, UMAMI_WEBSITE_ID, UMAMI_API_TOKEN in env.
 */

const UMAMI_APP_URL =
    process.env.UMAMI_APP_URL ||
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC?.replace(/\/script\.js$/, '') ||
    '';
const UMAMI_WEBSITE_ID =
    process.env.UMAMI_WEBSITE_ID || process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '';
const UMAMI_API_TOKEN = process.env.UMAMI_API_TOKEN;

export type UmamiStats = {
    pageviews: number;
    visitors: number;
    visits: number;
    bounces: number;
    totaltime: number;
    comparison?: {
        pageviews: number;
        visitors: number;
        visits: number;
        bounces: number;
        totaltime: number;
    };
};

export type UmamiMetricRow = { x: string; y: number };
export type UmamiPageviewsResponse = {
    pageviews: { x: string; y: number }[];
    sessions: { x: string; y: number }[];
};

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

function getAuthHeaders(): HeadersInit {
    if (!UMAMI_API_TOKEN) return {};
    return {
        Authorization: `Bearer ${UMAMI_API_TOKEN}`,
        Accept: 'application/json',
    };
}

function buildUrl(
    path: string,
    params: Record<string, string | number | undefined>
): string {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') search.set(k, String(v));
    });
    const q = search.toString();
    return `${UMAMI_APP_URL.replace(/\/$/, '')}${path}${q ? `?${q}` : ''}`;
}

/** Last 7 days and 30 days timestamps (ms) for Umami API */
function getTimeRanges(): { startAt7: number; endAt: number; startAt30: number } {
    const endAt = Date.now();
    const startAt7 = endAt - 7 * 24 * 60 * 60 * 1000;
    const startAt30 = endAt - 30 * 24 * 60 * 60 * 1000;
    return { startAt7, endAt, startAt30 };
}

function getStartOfDay(d: Date): Date {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
}

function getCustomTimeRange(period: UmamiTimeRangeKey): { startAt: number; endAt: number } {
    const now = new Date();
    const nowMs = now.getTime();
    const dayMs = 24 * 60 * 60 * 1000;

    switch (period) {
        case 'today': {
            const start = getStartOfDay(now);
            return { startAt: start.getTime(), endAt: nowMs };
        }
        case 'yesterday': {
            const startOfToday = getStartOfDay(now);
            const end = startOfToday.getTime();
            const start = new Date(startOfToday);
            start.setDate(start.getDate() - 1);
            return { startAt: start.getTime(), endAt: end };
        }
        case 'thisWeek': {
            // ISO-like: week starts Monday
            const start = getStartOfDay(now);
            const day = (start.getDay() + 6) % 7; // 0 = Monday
            start.setDate(start.getDate() - day);
            return { startAt: start.getTime(), endAt: nowMs };
        }
        case 'last7Days': {
            return { startAt: nowMs - 7 * dayMs, endAt: nowMs };
        }
        case 'last30Days': {
            return { startAt: nowMs - 30 * dayMs, endAt: nowMs };
        }
        case 'thisMonth': {
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            return { startAt: start.getTime(), endAt: nowMs };
        }
        case 'lastMonth': {
            const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const end = new Date(now.getFullYear(), now.getMonth(), 1);
            return { startAt: start.getTime(), endAt: end.getTime() };
        }
        case 'thisYear': {
            const start = new Date(now.getFullYear(), 0, 1);
            return { startAt: start.getTime(), endAt: nowMs };
        }
        case 'lastYear': {
            const start = new Date(now.getFullYear() - 1, 0, 1);
            const end = new Date(now.getFullYear(), 0, 1);
            return { startAt: start.getTime(), endAt: end.getTime() };
        }
        case 'allTime':
        default: {
            return { startAt: 0, endAt: nowMs };
        }
    }
}

/**
 * Fetches summarized stats for a path (optionally with comparison period).
 */
export async function fetchUmamiStats(
    path: string,
    options?: { revalidate?: number }
): Promise<{ stats7: UmamiStats | null; stats30: UmamiStats | null }> {
    if (!UMAMI_APP_URL || !UMAMI_WEBSITE_ID || !UMAMI_API_TOKEN) {
        return { stats7: null, stats30: null };
    }
    const { startAt7, endAt, startAt30 } = getTimeRanges();
    const pathFilter = path || '/';

    const fetchOpts: RequestInit = {
        headers: getAuthHeaders(),
        next: { revalidate: options?.revalidate ?? 300 },
    };

    const url7 = buildUrl(`/api/websites/${UMAMI_WEBSITE_ID}/stats`, {
        startAt: startAt7,
        endAt,
        path: pathFilter,
    });
    const url30 = buildUrl(`/api/websites/${UMAMI_WEBSITE_ID}/stats`, {
        startAt: startAt30,
        endAt,
        path: pathFilter,
    });

    try {
        const [res7, res30] = await Promise.all([
            fetch(url7, fetchOpts),
            fetch(url30, fetchOpts),
        ]);
        const stats7: UmamiStats | null = res7.ok ? await res7.json() : null;
        const stats30: UmamiStats | null = res30.ok ? await res30.json() : null;
        return { stats7, stats30 };
    } catch {
        return { stats7: null, stats30: null };
    }
}

export async function fetchUmamiStatsForPeriod(
    path: string,
    period: UmamiTimeRangeKey,
    options?: { revalidate?: number }
): Promise<UmamiStats | null> {
    if (!UMAMI_APP_URL || !UMAMI_WEBSITE_ID || !UMAMI_API_TOKEN) {
        return null;
    }

    const { startAt, endAt } = getCustomTimeRange(period);
    const pathFilter = path || '/';

    const url = buildUrl(`/api/websites/${UMAMI_WEBSITE_ID}/stats`, {
        startAt,
        endAt,
        path: pathFilter,
    });

    try {
        const res = await fetch(url, {
            headers: getAuthHeaders(),
            next: { revalidate: options?.revalidate ?? 300 },
        });
        if (!res.ok) return null;
        const data: UmamiStats = await res.json();
        return data;
    } catch {
        return null;
    }
}

/**
 * Fetches pageviews time series for trend (e.g. last N days).
 */
export async function fetchUmamiPageviews(
    path: string,
    days: number = 30,
    options?: { revalidate?: number }
): Promise<UmamiPageviewsResponse | null> {
    if (!UMAMI_APP_URL || !UMAMI_WEBSITE_ID || !UMAMI_API_TOKEN) return null;
    const endAt = Date.now();
    const startAt = endAt - days * 24 * 60 * 60 * 1000;
    const pathFilter = path || '/';

    const url = buildUrl(`/api/websites/${UMAMI_WEBSITE_ID}/pageviews`, {
        startAt,
        endAt,
        unit: 'day',
        path: pathFilter,
    });

    try {
        const res = await fetch(url, {
            headers: getAuthHeaders(),
            next: { revalidate: options?.revalidate ?? 300 },
        });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

/**
 * Fetches metrics breakdown (country, referrer, device).
 */
export async function fetchUmamiMetrics(
    path: string,
    type: 'country' | 'referrer' | 'device',
    options?: { revalidate?: number; limit?: number }
): Promise<UmamiMetricRow[]> {
    if (!UMAMI_APP_URL || !UMAMI_WEBSITE_ID || !UMAMI_API_TOKEN) return [];
    const { startAt30, endAt } = getTimeRanges();
    const pathFilter = path || '/';

    const url = buildUrl(`/api/websites/${UMAMI_WEBSITE_ID}/metrics`, {
        startAt: startAt30,
        endAt,
        type,
        path: pathFilter,
        limit: options?.limit ?? 10,
    });

    try {
        const res = await fetch(url, {
            headers: getAuthHeaders(),
            next: { revalidate: options?.revalidate ?? 300 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

/**
 * Fetches pageviews timeseries for a specific UmamiTimeRangeKey period.
 * Uses hourly units for short ranges (today/yesterday), daily for everything else.
 */

export async function fetchUmamiPageviewsForPeriod(
    path: string,
    period: UmamiTimeRangeKey,
    options?: { revalidate?: number }
): Promise<UmamiPageviewsResponse | null> {
    if (!UMAMI_APP_URL || !UMAMI_WEBSITE_ID || !UMAMI_API_TOKEN) return null;

    const { startAt, endAt } = getCustomTimeRange(period);
    const pathFilter = path || '/';

    const unit: 'hour' | 'day' | 'month' =
        period === 'today' || period === 'yesterday' ? 'hour'
            : period === 'thisYear' || period === 'lastYear' || period === 'allTime' ? 'month'
                : 'day';

    const url = buildUrl(`/api/websites/${UMAMI_WEBSITE_ID}/pageviews`, {
        startAt,
        endAt,
        unit,
        path: pathFilter,
    });

    try {
        const res = await fetch(url, {
            headers: getAuthHeaders(),
            next: { revalidate: options?.revalidate ?? 300 },
        });
        return res.ok ? await res.json() : null;
    } catch {
        return null;
    }
}

export function isUmamiApiConfigured(): boolean {
    return Boolean(UMAMI_APP_URL && UMAMI_WEBSITE_ID && UMAMI_API_TOKEN);
}