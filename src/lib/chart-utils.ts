/**
 * Pure helpers for chart Y-axis and scaling. Used by PageAnalyticsChart (D3).
 */

/**
 * Computes a clean Y-axis maximum that avoids excessive whitespace above the data.
 *
 * Strategy:
 *  - Round up to the nearest "nice" step that adds at most ~10% headroom
 *  - Guarantee at least 3 distinct tick levels (0, mid, max) so the chart isn't flat
 *  - Never let the domain max be more than 1.25× the actual data max
 */
export function niceMax(rawMax: number): number {
    if (rawMax <= 0) return 5;

    const roughStep = rawMax / 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalized = roughStep / magnitude;
    const niceStep =
        normalized <= 1 ? magnitude
            : normalized <= 2 ? 2 * magnitude
                : normalized <= 2.5 ? 2.5 * magnitude
                    : normalized <= 5 ? 5 * magnitude
                        : 10 * magnitude;

    const ceiling = Math.ceil(rawMax / niceStep) * niceStep;
    return Math.min(ceiling, Math.ceil(rawMax * 1.25));
}
