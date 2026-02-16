export default function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://hakki.info/#person",
                "name": "Hakkı Günal",
                "givenName": "Hakkı",
                "familyName": "Günal",
                "url": "https://hakki.info",
                "image": "https://hakki.info/images/profile.jpg",
                "description": "Full Stack Developer specializing in React, Node.js, Python and modern web technologies",
                "jobTitle": "Full Stack Developer",
                "worksFor": {
                    "@type": "Organization",
                    "name": "Freelance"
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Istanbul",
                    "addressCountry": "TR"
                },
                "sameAs": [
                    "https://github.com/erdemgunal",
                    "https://linkedin.com/in/erdemgunal",
                    "https://x.com/erdemgunal"
                ],
                "knowsAbout": [
                    "React", "Next.js", "JavaScript", "Python", "Node.js",
                    "Full Stack Development", "Web Development", "Software Development"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://hakki.info/#website",
                "url": "https://hakki.info",
                "name": "Hakkı Günal - Full Stack Developer Portfolio",
                "description": "Professional portfolio of Hakkı Günal, a Full Stack Developer from Istanbul, Türkiye",
                "publisher": {
                    "@id": "https://hakki.info/#person"
                },
                "inLanguage": "tr-TR"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}