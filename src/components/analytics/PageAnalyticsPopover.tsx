'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ChartBarIcon from '@/components/icon/ChartBarIcon';
import { PageviewsChart } from '@/components/analytics/PageviewsChart';

export type PageAnalyticsData = {
    stats7: { pageviews: number; visitors: number; totaltime: number } | null;
    stats30: { pageviews: number; visitors: number; totaltime: number } | null;
    country: { x: string; y: number }[];
    referrer: { x: string; y: number }[];
    device: { x: string; y: number }[];
    pageviews7: { x: string; y: number }[];
    pageviews30: { x: string; y: number }[];
    sessions30: { x: string; y: number }[];
};

function formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) return '0m';
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    if (m >= 1) return s > 0 ? `${m}m ${s}s` : `${m}m`;
    return `${s}s`;
}

interface PageAnalyticsPopoverProps {
    pagePath: string;
    title?: string;
    data: PageAnalyticsData | null;
    publicShareUrl?: string;
}

export function PageAnalyticsPopover({
    pagePath,
    title = 'Page analytics',
    data,
    publicShareUrl,
}: PageAnalyticsPopoverProps) {
    const [open, setOpen] = useState(false);

    const path = pagePath || '/';
    const hasData = data && (data.stats7 || data.stats30);
    const hasIframe = publicShareUrl && !hasData;

    if (!hasData && !hasIframe) return null;

    if (hasIframe) {
        const iframeSrc = new URL(publicShareUrl);
        iframeSrc.searchParams.set('path', path);
        return (
            <Dialog open={true} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <iframe
                        src={iframeSrc.toString()}
                        title={`Analytics for ${path}`}
                        className="w-full border-0 rounded-lg bg-muted/30"
                        height={280}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    const s = data!.stats30 || data!.stats7;
    const avgDurationSec = s && s.pageviews > 0 ? s.totaltime / s.pageviews : 0;
    const trend7 = data!.stats7?.pageviews ?? 0;
    const trend30 = data!.stats30?.pageviews ?? 0;
    const { country, referrer, device, pageviews30, sessions30 } = data!;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <ChartBarIcon className="size-4" />
                    Analytics
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                            <p className="text-xl font-bold text-foreground tabular-nums">{s?.pageviews.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Pageviews (30d)</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-foreground tabular-nums">{s?.visitors.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Visitors (30d)</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-foreground tabular-nums">{formatDuration(avgDurationSec)}</p>
                            <p className="text-xs text-muted-foreground">Avg. time</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-foreground tabular-nums">{trend7} / {trend30}</p>
                            <p className="text-xs text-muted-foreground">Views 7d / 30d</p>
                        </div>
                    </div>

                    <PageviewsChart
                        pageviews={pageviews30}
                        sessions={sessions30}
                        label="Views & sessions (last 30 days)"
                        height={200}
                    />

                    <div className="grid gap-4 sm:grid-cols-3 text-sm border-t border-border pt-4">
                        {country.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Top countries</p>
                                <ul className="space-y-0.5">
                                    {country.slice(0, 5).map(({ x, y }) => (
                                        <li key={x} className="flex justify-between gap-2">
                                            <span className="text-foreground/90">{x}</span>
                                            <span className="tabular-nums text-muted-foreground">{y}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {referrer.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Traffic sources</p>
                                <ul className="space-y-0.5">
                                    {referrer.slice(0, 5).map(({ x, y }) => (
                                        <li key={x} className="flex justify-between gap-2 truncate">
                                            <span className="text-foreground/90 truncate" title={x}>{x || 'Direct'}</span>
                                            <span className="shrink-0 tabular-nums text-muted-foreground">{y}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {device.length > 0 && (
                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Devices</p>
                                <ul className="space-y-0.5">
                                    {device.slice(0, 5).map(({ x, y }) => (
                                        <li key={x} className="flex justify-between gap-2">
                                            <span className="text-foreground/90">{x}</span>
                                            <span className="tabular-nums text-muted-foreground">{y}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
