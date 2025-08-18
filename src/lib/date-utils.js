export function getCurrentYear() {
    return new Date().getFullYear();
}

export function formatDateRange(start, end) {
    if (!start) return '';
    
    if (!end || end === 'Present') {
        return `${start} - Günümüz`;
    }
    
    return `${start} - ${end}`;
}

export function formatDuration(start, end) {
    if (!start) return '';
    
    const startDate = new Date(start);
    const endDate = end && end !== 'Present' ? new Date(end) : new Date();
    
    const diffTime = Math.abs(endDate - startDate);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    if (diffYears > 0) {
        return diffMonths > 0 ? `${diffYears} yıl ${diffMonths} ay` : `${diffYears} yıl`;
    }
    
    return `${diffMonths} ay`;
}

export function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
} 