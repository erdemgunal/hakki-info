import { NextRequest, NextResponse } from 'next/server';
import {
    fetchUmamiPageviewsForPeriod,
    isUmamiApiConfigured,
    UMAMI_TIME_RANGE_KEYS,
    type UmamiTimeRangeKey,
} from '@/lib/umami-api';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const rawPeriod = searchParams.get('period');
    const period: UmamiTimeRangeKey | null =
        rawPeriod && UMAMI_TIME_RANGE_KEYS.includes(rawPeriod as UmamiTimeRangeKey)
            ? (rawPeriod as UmamiTimeRangeKey)
            : null;

    if (!period) {
        return NextResponse.json(
            { error: 'Missing or invalid period' },
            { status: 400 }
        );
    }

    if (!isUmamiApiConfigured()) {
        return NextResponse.json({ error: 'Umami not configured' }, { status: 503 });
    }

    const data = await fetchUmamiPageviewsForPeriod(path, period, { revalidate: 300 });
    return NextResponse.json(data ?? { pageviews: [], sessions: [] });
}