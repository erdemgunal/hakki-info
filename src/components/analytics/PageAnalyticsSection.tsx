import { HomeAnalyticsTrigger } from '@/components/analytics/HomeAnalyticsTrigger';
import { PageAnalyticsWidget } from '@/components/analytics/PageAnalyticsWidget';
import { fetchUmamiStatsForPeriod, isUmamiApiConfigured } from '@/lib/umami-api';
import { cn } from '@/lib/utils';

interface PageAnalyticsSectionProps {
    path: string;
    showViews?: boolean;
    className?: string;
}

export async function PageAnalyticsSection({
    path,
    showViews = true,
    className,
}: PageAnalyticsSectionProps) {
    const analyticsEnabled = isUmamiApiConfigured();

    if (!analyticsEnabled) {
        return null;
    }

    const viewsAllTime = showViews
        ? (await fetchUmamiStatsForPeriod(path, 'allTime', { revalidate: 300 }))?.pageviews ?? null
        : null;

    return (
        <div className={cn('mt-8 flex justify-start', className)}>
            <HomeAnalyticsTrigger pagePath={path} views={viewsAllTime}>
                <PageAnalyticsWidget pagePath={path} />
            </HomeAnalyticsTrigger>
        </div>
    );
}

