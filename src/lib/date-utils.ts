export function formatBlogDate(dateString: string, locale = 'en-US'): string {
    return new Date(dateString).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function getCurrentYear(): number {
    return new Date().getFullYear();
}

export function formatDateShort(date: string, locale = 'en-US'): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
