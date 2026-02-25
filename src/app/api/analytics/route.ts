import { NextRequest, NextResponse } from 'next/server';
import { fetchUmamiPageviewsForPeriod, isUmamiApiConfigured } from '@/lib/umami-api';
import { UmamiTimeRangeKey } from '@/lib/umami-api';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    const period = searchParams.get('period') as UmamiTimeRangeKey | null;

    if (!period) {
        return NextResponse.json({ error: 'Missing period' }, { status: 400 });
    }

    if (!isUmamiApiConfigured()) {
        return NextResponse.json({ error: 'Umami not configured' }, { status: 503 });
    }

    const data = await fetchUmamiPageviewsForPeriod(path, period, { revalidate: 300 });
    return NextResponse.json(data ?? { pageviews: [], sessions: [] });
}