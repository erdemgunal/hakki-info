import {
    fetchUmamiStatsForPeriod,
    fetchUmamiMetrics,
    isUmamiApiConfigured,
    UmamiTimeRangeKey,
    UmamiMetricRow,
} from '@/lib/umami-api';
import { PageAnalyticsWidgetClient } from './PageAnalyticsWidgetClient';

interface PageAnalyticsWidgetProps {
    pagePath: string;
    title?: string;
    revalidate?: number;
}

export async function PageAnalyticsWidget({
    pagePath,
    title = 'Page Analytics',
    revalidate = 300,
}: PageAnalyticsWidgetProps) {
    const path = pagePath || '/';

    if (!isUmamiApiConfigured()) {
        return null;
    }

    const periods: UmamiTimeRangeKey[] = [
        'today',
        'yesterday',
        'thisWeek',
        'last7Days',
        'last30Days',
        'thisMonth',
        'lastMonth',
        'thisYear',
        'lastYear',
        'allTime',
    ];

    const statsByPeriod = await Promise.all(
        periods.map((period) => fetchUmamiStatsForPeriod(path, period, { revalidate }))
    );

    const ranges = periods.reduce<
        Record<UmamiTimeRangeKey, { pageviews: number; visitors: number } | null>
    >(
        (acc, key, index) => {
            const stats = statsByPeriod[index];
            acc[key] = stats
                ? { pageviews: stats.pageviews, visitors: stats.visitors }
                : null;
            return acc;
        },
        {} as Record<UmamiTimeRangeKey, { pageviews: number; visitors: number } | null>
    );

    const countryMetrics = await fetchUmamiMetrics(path, 'country', { revalidate, limit: 20 });

    const totalCountryVisits = countryMetrics.reduce((sum: number, row: UmamiMetricRow) => sum + row.y, 0);
    const countriesSummary =
        totalCountryVisits > 0
            ? countryMetrics.map((row) => ({ country: row.x, visits: row.y, share: row.y / totalCountryVisits }))
            : [];

    return (
        <PageAnalyticsWidgetClient
            data={{
                title,
                path,
                ranges,
                countriesSummary,
            }}
        />
    );
}