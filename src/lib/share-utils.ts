export interface ShareLinks {
    facebook: string;
    linkedin: string;
    twitter: string;
}

export function generateShareLinks(shareUrl: string, title: string): ShareLinks {
    return {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    };
}
