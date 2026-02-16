export function getCurrentYear() {
    return new Date().getFullYear();
}

export function formatDateRange(start: string, end: string) {
    if (!start) return '';

    if (!end || end === 'Present') {
        return `${start} - Günümüz`;
    }

    return `${start} - ${end}`;
}

export function formatDuration(start: string, end: string) {
    if (!start) return '';

    const startDate = new Date(start);
    const endDate = end && end !== 'Present' ? new Date(end) : new Date();

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    if (diffYears > 0) {
        return diffMonths > 0 ? `${diffYears} yıl ${diffMonths} ay` : `${diffYears} yıl`;
    }

    return `${diffMonths} ay`;
}

export function formatDate(dateString: string) {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
} 