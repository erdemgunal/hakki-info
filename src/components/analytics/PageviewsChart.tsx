'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

export type DataPoint = { x: string; y: number };

interface PageviewsChartProps {
    /** Pageviews over time (e.g. last 30 days) */
    pageviews: DataPoint[];
    /** Sessions over same time range (optional; second line) */
    sessions?: DataPoint[];
    /** Chart label shown above */
    label?: string;
    /** Height of the chart area in pixels */
    height?: number;
}

const MARGIN = { top: 16, right: 16, bottom: 28, left: 36 };

export function PageviewsChart({
    pageviews,
    sessions = [],
    label = 'Pageviews (last 30 days)',
    height = 200,
}: PageviewsChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const draw = useCallback(() => {
        if (!containerRef.current || pageviews.length === 0) return;

        const width = containerRef.current.clientWidth;
        if (width <= 0) return;

        d3.select(containerRef.current).selectAll('svg').remove();

        const innerWidth = width - MARGIN.left - MARGIN.right;
        const innerHeight = height - MARGIN.top - MARGIN.bottom;

        const data = pageviews.map((d) => ({ date: new Date(d.x), value: d.y }));
        const sessionData = sessions.length === pageviews.length
            ? sessions.map((d) => ({ date: new Date(d.x), value: d.y }))
            : sessions.length > 0
                ? sessions.map((d) => ({ date: new Date(d.x), value: d.y }))
                : [];

        const xExtent = d3.extent(data, (d) => d.date) as [Date, Date];
        const xScale = d3.scaleTime().domain(xExtent).range([0, innerWidth]);

        const maxY = Math.max(
            d3.max(data, (d) => d.value) ?? 1,
            sessionData.length ? (d3.max(sessionData, (d) => d.value) ?? 1) : 1,
            1
        );
        const yScale = d3.scaleLinear().domain([0, maxY]).range([innerHeight, 0]).nice();

        const area = d3.area<{ date: Date; value: number }>()
            .x((d) => xScale(d.date))
            .y0(innerHeight)
            .y1((d) => yScale(d.value))
            .curve(d3.curveMonotoneX);

        const line = d3.line<{ date: Date; value: number }>()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value))
            .curve(d3.curveMonotoneX);

        const xAxis = d3.axisBottom(xScale)
            .ticks(6)
            .tickFormat((d) => d3.timeFormat('%b %d')(d as Date));

        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(-innerWidth);

        const svg = d3.select(containerRef.current).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; overflow: visible;');

        const g = svg.append('g').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

        g.append('path')
            .datum(data)
            .attr('fill', 'currentColor')
            .attr('fill-opacity', 0.12)
            .attr('d', area);

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'hsl(var(--accent))')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .attr('d', line);

        if (sessionData.length > 0) {
            const sessionLine = d3.line<{ date: Date; value: number }>()
                .x((d) => xScale(d.date))
                .y((d) => yScale(d.value))
                .curve(d3.curveMonotoneX);
            g.append('path')
                .datum(sessionData)
                .attr('fill', 'none')
                .attr('stroke', 'hsl(var(--muted-foreground))')
                .attr('stroke-width', 1.5)
                .attr('stroke-linecap', 'round')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-dasharray', '4,3')
                .attr('d', sessionLine);
        }

        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis)
            .attr('color', 'hsl(var(--muted-foreground))')
            .attr('font-size', '11px')
            .selectAll('.domain, .tick line')
            .attr('stroke', 'hsl(var(--border))');

        g.append('g')
            .call(yAxis)
            .attr('color', 'hsl(var(--muted-foreground))')
            .attr('font-size', '11px')
            .selectAll('.domain')
            .attr('stroke', 'hsl(var(--border))');

        g.selectAll('.tick line')
            .attr('stroke-opacity', 0.3);
    }, [pageviews, sessions, height]);

    useEffect(() => {
        draw();
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => { draw(); });
        ro.observe(el);
        return () => ro.disconnect();
    }, [draw]);

    if (pageviews.length === 0) return null;

    return (
        <div className="mt-4">
            {label && (
                <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
            )}
            <div ref={containerRef} className="w-full" style={{ height }} />
            {sessions.length > 0 && (
                <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="inline-block w-3 h-0.5 rounded-full bg-accent" aria-hidden />
                        Pageviews
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="inline-block w-3 h-0.5 rounded-full border border-dashed border-muted-foreground/60" aria-hidden style={{ borderWidth: 1.5 }} />
                        Sessions
                    </span>
                </div>
            )}
        </div>
    );
}
