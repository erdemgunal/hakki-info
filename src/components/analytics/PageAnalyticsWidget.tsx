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

    const [deviceMetrics, referrerMetrics, countryMetrics] = await Promise.all([
        fetchUmamiMetrics(path, 'device', { revalidate, limit: 10 }),
        fetchUmamiMetrics(path, 'referrer', { revalidate, limit: 10 }),
        fetchUmamiMetrics(path, 'country', { revalidate, limit: 20 }),
    ]);

    const totalDeviceVisits = deviceMetrics.reduce((sum: number, row: UmamiMetricRow) => sum + row.y, 0);
    let mobileVisits = 0, desktopVisits = 0, otherVisits = 0;

    deviceMetrics.forEach((row) => {
        const label = row.x.toLowerCase();
        if (label.includes('mobile')) mobileVisits += row.y;
        else if (label.includes('desktop')) desktopVisits += row.y;
        else otherVisits += row.y;
    });

    const deviceSummary =
        totalDeviceVisits > 0
            ? {
                  total: totalDeviceVisits,
                  mobile: { visits: mobileVisits, share: mobileVisits / totalDeviceVisits },
                  desktop: { visits: desktopVisits, share: desktopVisits / totalDeviceVisits },
                  other: { visits: otherVisits, share: otherVisits / totalDeviceVisits },
                  breakdown: deviceMetrics.map((row) => ({
                      device: row.x,
                      visits: row.y,
                      share: row.y / totalDeviceVisits,
                  })),
              }
            : null;

    const totalReferrerVisits = referrerMetrics.reduce((sum: number, row: UmamiMetricRow) => sum + row.y, 0);
    const referrersSummary =
        totalReferrerVisits > 0
            ? referrerMetrics.map((row) => ({ source: row.x, visits: row.y, share: row.y / totalReferrerVisits }))
            : [];

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
                deviceSummary,
                referrersSummary,
                countriesSummary,
            }}
        />
    );
}