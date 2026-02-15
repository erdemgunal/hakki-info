import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
    const privacySections = [
        {
            id: 1,
            title: "Introduction",
            content: "As Hakkı Günal, I value the privacy of your personal data. This privacy policy explains what information is collected on our website and how it is used."
        },
        {
            id: 2,
            title: "Information Collected",
            content: "When you visit our website, your browser automatically sends the following information:",
            hasList: true,
            listItems: [
                "Your IP address",
                "Browser type and version",
                "Operating system",
                "Pages you visited",
                "Visit duration"
            ]
        },
        {
            id: 3,
            title: "Cookies",
            content: "Our website uses cookies to improve user experience and analyze site performance. The cookies we use include:",
            hasList: true,
            listItems: [
                "Google Analytics cookies (_ga, _gid, _gat): Used to analyze user behavior and collect site statistics",
                "Microsoft Clarity cookies (_clck, _clsk, CLID): Used to record user interactions and improve site usability",
                "Preference cookies: Used to remember your preferences such as theme selection",
                "Security cookies: Used to ensure site security"
            ]
        },
        {
            id: 4,
            title: "Use of Information",
            content: "We use the information we collect for the following purposes:",
            hasList: true,
            listItems: [
                "To improve website performance",
                "To enhance user experience",
                "To resolve technical issues",
                "To ensure security"
            ]
        },
        {
            id: 5,
            title: "Third-Party Analytics",
            content: "We use the following third-party analytics services on our website:",
            hasList: true,
            listItems: [
                "Google Analytics: Collects and analyzes website usage statistics. IP addresses are anonymized.",
                "Microsoft Clarity: Records user interactions (mouse movements, clicks, page scrolls). Personal data is masked.",
                "Privacy policies: Google Privacy Policy and Microsoft Privacy Statement"
            ]
        },
        {
            id: 6,
            title: "Cookie Details",
            content: "Details of the cookies we use:",
            hasList: true,
            listItems: [
                "_ga: Distinguishes users (stored for 2 years)",
                "_gid: Generates site usage statistics (stored for 1 day)",
                "_gat: Limits request rate (stored for 1 minute)",
                "_clck: Tracks user behavior (stored for 1 year)",
                "_clsk: Links page views (stored for 1 day)",
                "CLID: First visit record (stored for 1 year)"
            ]
        },
        {
            id: 7,
            title: "Information Sharing",
            content: "We do not share your personal data with third parties. However, anonymized data may be sent to the analytics services mentioned above, and we may be required to share with authorities in case of legal obligation."
        },
        {
            id: 8,
            title: "Data Security",
            content: "We take appropriate technical and organizational measures to protect your personal data. Our analytics services also use industry-standard security measures. However, please note that no data transmission over the internet is 100% secure."
        },
        {
            id: 9,
            title: "Your Rights",
            content: "You have the following rights regarding your personal data:",
            hasList: true,
            listItems: [
                "Right to access your data",
                "Right to rectification of your data",
                "Right to erasure of your data",
                "Right to object to data processing",
                "Right to disable cookies (via browser settings)"
            ]
        },
        {
            id: 10,
            title: "Cookie Management",
            content: "You can control and disable cookies through your browser's settings menu. However, some website features may not work properly if you disable certain cookies."
        },
        {
            id: 11,
            title: "Changes",
            content: "This privacy policy may be changed without prior notice. Changes will be published on this page and will be effective from the date of publication."
        },
        {
            id: 12,
            title: "Contact",
            content: "Please contact me through my contact information if you have any questions about this privacy policy."
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
                        <p className="text-secondary text-lg">Last updated: {new Date().toLocaleDateString('en-US')}</p>
                    </div>

                    <div className="space-y-8 text-foreground">
                        {privacySections.map((section) => (
                            <section key={section.id} className="space-y-4">
                                <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
                                    {section.id}. {section.title}
                                </h2>
                                <div className="text-secondary leading-relaxed">
                                    {section.content}
                                </div>
                                {section.hasList && (
                                    <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                                        {section.listItems!.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>

                    <div className="text-center pt-8">
                        <Button variant="primary" asChild>
                            <Link href="/">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
