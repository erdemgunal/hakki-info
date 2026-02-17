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
