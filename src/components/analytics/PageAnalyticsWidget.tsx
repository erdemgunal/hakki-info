import {
    fetchUmamiStats,
    fetchUmamiMetrics,
    fetchUmamiPageviews,
    isUmamiApiConfigured,
} from '@/lib/umami-api';
import { PageAnalyticsPopover } from '@/components/analytics/PageAnalyticsPopover';

const PUBLIC_SHARE_URL = process.env.NEXT_PUBLIC_UMAMI_PUBLIC_SHARE_URL || '';

interface PageAnalyticsWidgetProps {
    /** Current page path for filtering, e.g. "/", "/blog", "/blog/my-post", "/projects", "/projects/my-project", "/contact" */
    pagePath: string;
    /** Optional title for the section (e.g. "Page stats") */
    title?: string;
    /** Revalidate interval in seconds for server cache (default 300) */
    revalidate?: number;
}

/**
 * Public analytics widget: a popover trigger that opens a dialog with page stats,
 * 30-day pageviews graph, and breakdowns (country, referrers, devices).
 * - If Umami API is configured: fetches server-side and passes data to PageAnalyticsPopover.
 * - Else if public share URL is set: popover with iframe only.
 * - Otherwise renders nothing.
 */
export async function PageAnalyticsWidget({
    pagePath,
    title = 'Page analytics',
    revalidate = 300,
}: PageAnalyticsWidgetProps) {
    const path = pagePath || '/';

    if (isUmamiApiConfigured()) {
        const [statsResult, country, referrer, device, pageviews7, pageviews30] = await Promise.all([
            fetchUmamiStats(path, { revalidate }),
            fetchUmamiMetrics(path, 'country', { revalidate, limit: 5 }),
            fetchUmamiMetrics(path, 'referrer', { revalidate, limit: 5 }),
            fetchUmamiMetrics(path, 'device', { revalidate, limit: 5 }),
            fetchUmamiPageviews(path, 7, { revalidate }),
            fetchUmamiPageviews(path, 30, { revalidate }),
        ]);

        const { stats7, stats30 } = statsResult;
        if (!stats7 && !stats30) {
            return null;
        }

        const data = {
            stats7: stats7 ? { pageviews: stats7.pageviews, visitors: stats7.visitors, totaltime: stats7.totaltime } : null,
            stats30: stats30 ? { pageviews: stats30.pageviews, visitors: stats30.visitors, totaltime: stats30.totaltime } : null,
            country,
            referrer,
            device,
            pageviews7: pageviews7?.pageviews?.slice(-7) ?? [],
            pageviews30: pageviews30?.pageviews ?? [],
            sessions30: pageviews30?.sessions ?? [],
        };

        return (
            <PageAnalyticsPopover
                pagePath={path}
                title={title}
                data={data}
            />
        );
    }

    if (PUBLIC_SHARE_URL) {
        return (
            <PageAnalyticsPopover
                pagePath={path}
                title={title}
                data={null}
                publicShareUrl={PUBLIC_SHARE_URL}
            />
        );
    }

    return null;
}
