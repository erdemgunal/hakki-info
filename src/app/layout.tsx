import { Crimson_Text, Oxygen } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Script from "next/script";
import { consoleArtScript } from "@/lib/console-art";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="tr"
            suppressHydrationWarning
        >
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
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
