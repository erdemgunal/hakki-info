import Link from 'next/link';

interface BreadcrumbsProps {
    section: string;
}

export default function Breadcrumbs({ section }: BreadcrumbsProps) {
    const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://hakki.info"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": section,
                "item": `https://hakki.info#${section.toLowerCase()}`
            }
        ]
    };

    return (
        <>
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <li><Link href="/">Home</Link></li>
                    <li>/</li>
                    <li>{section}</li>
                </ol>
            </nav>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
            />
        </>
    );
}