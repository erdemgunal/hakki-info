import React, { useCallback, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
    ChartPoint,
    UmamiTimeRangeKey,
    HOURLY_RANGES,
    getTickFormat,
    getTooltipFormat,
} from './PageAnalyticsCommon';

interface LineChartProps {
    points: ChartPoint[];
    range: UmamiTimeRangeKey;
    loading: boolean;
}

export function LineChart({ points, range, loading }: LineChartProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const draw = useCallback(
        (width: number) => {
            if (!svgRef.current || width === 0) return;

            const svg = d3.select(svgRef.current);
            svg.selectAll('*').remove();

            const height = 180;
            const margin = { top: 16, right: 12, bottom: 32, left: 36 };

            svg.attr('width', width).attr('height', height);

            if (points.length === 0) {
                svg.append('text')
                    .attr('x', width / 2)
                    .attr('y', height / 2)
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#9ca3af')
                    .attr('font-size', '13px')
                    .attr('font-family', 'inherit')
                    .text('No data for this period');
                return;
            }

            const xDomain = d3.extent(points, (d) => d.date) as [Date, Date];
            const x = d3.scaleTime().domain(xDomain).range([margin.left, width - margin.right]);

            const maxVal = Math.max(
                d3.max(points, (d) => d.pageviews) ?? 0,
                d3.max(points, (d) => d.sessions) ?? 0
            );
            const y = d3
                .scaleLinear()
                .domain([0, maxVal * 1.2])
                .nice()
                .range([height - margin.bottom, margin.top]);

            svg.append('g')
                .selectAll('line')
                .data(y.ticks(4))
                .join('line')
                .attr('x1', margin.left)
                .attr('x2', width - margin.right)
                .attr('y1', (d) => y(d))
                .attr('y2', (d) => y(d))
                .attr('stroke', '#f3f4f6')
                .attr('stroke-width', 1);

            const tickCount = Math.min(points.length, width < 400 ? 3 : 5);
            svg.append('g')
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(
                    d3
                        .axisBottom(x)
                        .ticks(tickCount)
                        .tickFormat((d) => getTickFormat(range)(d as Date))
                        .tickSize(0)
                )
                .call((g) => g.select('.domain').remove())
                .selectAll('text')
                .attr('fill', '#9ca3af')
                .attr('font-size', '11px')
                .attr('font-family', 'inherit')
                .attr('dy', '1.6em');

            svg.append('g')
                .attr('transform', `translate(${margin.left},0)`)
                .call(
                    d3
                        .axisLeft(y)
                        .ticks(4)
                        .tickSize(0)
                        .tickFormat((d) => {
                            const n = d as number;
                            return n >= 1000 ? `${n / 1000}k` : String(n);
                        })
                )
                .call((g) => g.select('.domain').remove())
                .selectAll('text')
                .attr('fill', '#9ca3af')
                .attr('font-size', '11px')
                .attr('font-family', 'inherit')
                .attr('dx', '-0.3em');

            const defs = svg.append('defs');
            const pvGrad = defs
                .append('linearGradient')
                .attr('id', 'pv-fill')
                .attr('x1', '0')
                .attr('x2', '0')
                .attr('y1', '0')
                .attr('y2', '1');
            pvGrad.append('stop').attr('offset', '0%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0.12);
            pvGrad.append('stop').attr('offset', '100%').attr('stop-color', '#3b82f6').attr('stop-opacity', 0);

            const curve = HOURLY_RANGES.includes(range)
                ? d3.curveStepAfter
                : d3.curveCatmullRom.alpha(0.5);

            const area = d3
                .area<ChartPoint>()
                .x((d) => x(d.date))
                .y0(height - margin.bottom)
                .y1((d) => y(d.pageviews))
                .curve(curve);
            svg.append('path').datum(points).attr('fill', 'url(#pv-fill)').attr('d', area);

            const linePV = d3
                .line<ChartPoint>()
                .x((d) => x(d.date))
                .y((d) => y(d.pageviews))
                .curve(curve);
            svg.append('path')
                .datum(points)
                .attr('fill', 'none')
                .attr('stroke', '#3b82f6')
                .attr('stroke-width', 1.5)
                .attr('d', linePV);

            const lineSess = d3
                .line<ChartPoint>()
                .x((d) => x(d.date))
                .y((d) => y(d.sessions))
                .curve(curve);
            svg.append('path')
                .datum(points)
                .attr('fill', 'none')
                .attr('stroke', '#93c5fd')
                .attr('stroke-width', 1.5)
                .attr('stroke-dasharray', '4,3')
                .attr('d', lineSess);

            if (points.length <= 7) {
                svg
                    .selectAll('.dot-pv')
                    .data(points)
                    .join('circle')
                    .attr('cx', (d) => x(d.date))
                    .attr('cy', (d) => y(d.pageviews))
                    .attr('r', 3)
                    .attr('fill', '#3b82f6')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 1.5);
                svg
                    .selectAll('.dot-sess')
                    .data(points)
                    .join('circle')
                    .attr('cx', (d) => x(d.date))
                    .attr('cy', (d) => y(d.sessions))
                    .attr('r', 2.5)
                    .attr('fill', '#93c5fd')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 1.5);
            }

            const focusLine = svg
                .append('line')
                .attr('stroke', '#e5e7eb')
                .attr('stroke-width', 1)
                .attr('y1', margin.top)
                .attr('y2', height - margin.bottom)
                .style('display', 'none');
            const focusDotPV = svg
                .append('circle')
                .attr('r', 4)
                .attr('fill', '#3b82f6')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .style('display', 'none');
            const focusDotSess = svg
                .append('circle')
                .attr('r', 3)
                .attr('fill', '#93c5fd')
                .attr('stroke', '#fff')
                .attr('stroke-width', 2)
                .style('display', 'none');

            if (tooltipRef.current) tooltipRef.current.remove();
            const tip = document.createElement('div');
            Object.assign(tip.style, {
                position: 'fixed',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px',
                fontFamily: 'inherit',
                color: '#111827',
                pointerEvents: 'none',
                opacity: '0',
                zIndex: '9999',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'opacity 0.1s',
            });
            document.body.appendChild(tip);
            tooltipRef.current = tip;

            const bisect = d3.bisector((d: ChartPoint) => d.date).left;

            svg.append('rect')
                .attr('x', margin.left)
                .attr('y', margin.top)
                .attr('width', width - margin.left - margin.right)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', 'transparent')
                .on('mousemove', function (event: MouseEvent) {
                    const [mx] = d3.pointer(event, this);
                    const hov = x.invert(mx);
                    const i = Math.min(bisect(points, hov, 1), points.length - 1);
                    const d0 = points[i - 1],
                        d1 = points[i];
                    if (!d0 && !d1) return;
                    const pt = !d0
                        ? d1
                        : !d1
                            ? d0
                            : hov.getTime() - d0.date.getTime() < d1.date.getTime() - hov.getTime()
                                ? d0
                                : d1;

                    const px = x(pt.date);
                    focusLine.style('display', null).attr('x1', px).attr('x2', px);
                    focusDotPV.style('display', null).attr('cx', px).attr('cy', y(pt.pageviews));
                    focusDotSess.style('display', null).attr('cx', px).attr('cy', y(pt.sessions));

                    tip.innerHTML =
                        `<div style="color:#6b7280;margin-bottom:4px;font-size:11px">${getTooltipFormat(range)(
                            pt.date
                        )}</div>` +
                        `<div style="display:flex;flex-direction:column;gap:2px">` +
                        `<span><span style="color:#3b82f6">●</span> ${pt.pageviews.toLocaleString()} pageviews</span>` +
                        `<span><span style="color:#93c5fd">●</span> ${pt.sessions.toLocaleString()} sessions</span>` +
                        `</div>`;
                    tip.style.opacity = '1';
                    tip.style.left = event.clientX + 14 + 'px';
                    tip.style.top = event.clientY - 52 + 'px';
                })
                .on('mouseleave', () => {
                    focusLine.style('display', 'none');
                    focusDotPV.style('display', 'none');
                    focusDotSess.style('display', 'none');
                    tip.style.opacity = '0';
                });
        },
        [points, range]
    );

    useEffect(() => {
        if (!containerRef.current) return;
        const w = containerRef.current.getBoundingClientRect().width;
        if (w > 0) draw(w);
        const ro = new ResizeObserver((e) => draw(e[0].contentRect.width));
        ro.observe(containerRef.current);
        return () => {
            ro.disconnect();
            tooltipRef.current?.remove();
            tooltipRef.current = null;
        };
    }, [draw]);

    return (
        <div ref={containerRef} className="w-full relative" style={{ minHeight: 180 }}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                    <span style={{ color: '#9ca3af', fontSize: 13 }}>Loading…</span>
                </div>
            )}
            <svg
                ref={svgRef}
                style={{ display: 'block', width: '100%', opacity: loading ? 0.3 : 1, transition: 'opacity 0.2s' }}
            />
        </div>
    );
}