import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Crimson_Text, Oxygen } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Script from "next/script";
import { consoleArtScript } from "@/lib/console-art";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Header, Footer } from "@/components/layout";
import { fetchResumeData, type Locale } from '@/lib/fetch-resume-data';
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

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const validLocale = (routing.locales as readonly string[]).includes(locale)
        ? locale
        : 'en';

    const messages = await getMessages();
    const resumeData = await fetchResumeData(validLocale as Locale);

    return (
        <html lang={validLocale} suppressHydrationWarning>
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
            <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        <ResumeDataProvider resumeData={resumeData}>
                            <Header />
                            {children}
                            <Footer />
                        </ResumeDataProvider>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

