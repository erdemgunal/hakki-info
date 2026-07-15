"use client";

import Script from "next/script";

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const UMAMI_SCRIPT_SRC = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC

export default function UmamiAnalytics() {
    console.log("UMAMI_WEBSITE_ID:", UMAMI_WEBSITE_ID);
    console.log("UMAMI_SCRIPT_SRC:", UMAMI_SCRIPT_SRC);

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
