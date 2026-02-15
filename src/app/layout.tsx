import { Crimson_Text, Oxygen, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Script from "next/script";
import { consoleArtScript } from "@/lib/console-art";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Header, Footer } from "@/components/layout";
import { fetchResumeData } from '@/lib/fetch-resume-data';
import { ResumeDataProvider } from '@/contexts/ResumeDataContext';

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

const monoFont = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const resumeData = await fetchResumeData();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <GoogleAnalytics />
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
            <body className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}>
                <ThemeProvider>
                    <ResumeDataProvider resumeData={resumeData}>
                        <Header />
                        {children}
                        <Footer />
                    </ResumeDataProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
