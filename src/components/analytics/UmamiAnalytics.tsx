"use client";

import Script from "next/script";

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "5f7b8fe7-0c96-463c-9e9e-9ab30fcc360d";
const UMAMI_SCRIPT_SRC = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC || "https://analytics.hakki.info/script.js";

export default function UmamiAnalytics() {
    if (typeof window === "undefined") {
        return null;
    }

    return (
        <Script
            defer
            id="umami-analytics"
            src={UMAMI_SCRIPT_SRC}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
        />
    );
}
