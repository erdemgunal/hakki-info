import { Crimson_Text, Oxygen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Script from "next/script";
import { consoleArtScript } from "@/lib/console-art";

const headingFont = Crimson_Text({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "700"],
});

const bodyFont = Oxygen({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata = {
    metadataBase: new URL('https://hakki.info'),
    title: "Hakkı Günal - Full Stack Developer Portfolio",
    description:
        "Hakkı Günal'ın kişisel portfolyo sitesi. Full Stack Developer olarak React, Node.js, Python ve modern web teknolojileri konusunda uzmanlaşmış yazılım geliştiricisi.",
    keywords: [
        "Full Stack Developer",
        "React",
        "Node.js",
        "Python",
        "Web Development",
        "Portfolio",
        "JavaScript",
        "TypeScript",
        "Next.js",
        "Frontend",
        "Backend",
        "Software Engineer",
        "Web Developer",
        "Türkiye",
    ],
    authors: [{ name: "Hakkı Günal" }],
    creator: "Hakkı Günal",
    publisher: "Hakkı Günal",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://hakki.info",
    },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        url: "https://hakki.info",
        siteName: "Hakkı Günal Portfolio",
        title: "Hakkı Günal - Full Stack Developer Portfolio",
        description: "Hakkı Günal'ın kişisel portfolyo sitesi. Full Stack Developer olarak React, Node.js, Python ve modern web teknolojileri konusunda uzmanlaşmış yazılım geliştiricisi.",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Hakkı Günal - Full Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@erdmegunal",
        creator: "@erdmegun",
        title: "Hakkı Günal - Full Stack Developer Portfolio",
        description: "Hakkı Günal'ın kişisel portfolyo sitesi. Full Stack Developer olarak React, Node.js, Python ve modern web teknolojileri konusunda uzmanlaşmış yazılım geliştiricisi.",
        images: ["/images/twitter-image.jpg"],
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
    },
    category: "technology",
    classification: "portfolio",
    manifest: '/manifest.json',
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
};


export default async function RootLayout({ children }) {
    return (
        <html
            lang="tr"
            suppressHydrationWarning
        >
            <head>
                <Script
                    id="microsoft-clarity"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ns98caktal");
            `,
                    }}
                />
                <Script
                    id="console-art"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: consoleArtScript,
                    }}
                />
            </head>
            <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
