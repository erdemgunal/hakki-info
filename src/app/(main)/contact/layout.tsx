import type { Metadata } from "next";
import seo from "@/config/seo.json";
import routeSeo from "@/config/seo-routes.json";

export const metadata: Metadata = {
  title: routeSeo.contact.title,
  description: routeSeo.contact.description,
  openGraph: {
    title: routeSeo.contact.title,
    description: routeSeo.contact.description,
    url: new URL(routeSeo.contact.url, seo.url).toString(),
    siteName: seo.siteName,
    images: [
      {
        url: seo.image,
        width: 1200,
        height: 630,
        alt: seo.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: seo.twitterCard as "summary_large_image",
    title: routeSeo.contact.title,
    description: routeSeo.contact.description,
    images: [seo.image],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

