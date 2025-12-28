"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-6CBB2M6CTJ";

declare global {
    interface Window {
        gtag?: (
            command: string,
            targetId: string,
            config?: {
                page_path?: string;
            }
        ) => void;
        dataLayer?: unknown[];
    }
}

export default function GoogleAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window.gtag === "function") {
            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return (
        <>
            <Script
                id="google-analytics-gtag"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });
                `,
                }}
            />
        </>
    )
}