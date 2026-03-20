export const DAYS_CONSIDERED_NEW = 14;

export function isNewPost(date: string): boolean {
    if (!date) return false;
    const diffMs = Date.now() - new Date(date).getTime();
    return diffMs / (24 * 60 * 60 * 1000) <= DAYS_CONSIDERED_NEW;
}
