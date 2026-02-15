import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
    const termsSections = [
        {
            id: 1,
            title: "Acceptance",
            content: "By using this website, you agree to the following terms. If you do not accept these terms, please do not use this site."
        },
        {
            id: 2,
            title: "Use of Service",
            content: "This website was created to present the personal portfolio and professional information of Hakkı Günal. The site content is for informational purposes and is not designed for commercial use."
        },
        {
            id: 3,
            title: "Intellectual Property",
            content: "All content, design, code, and materials on this website are owned by Hakkı Günal and are protected by copyright. Copying, distributing, or modifying the content is prohibited."
        },
        {
            id: 4,
            title: "Disclaimer",
            content: "This website is provided \"as is\". Hakkı Günal does not guarantee uninterrupted operation or that the site will be error-free. He is not responsible for any damage arising from the use of the site."
        },
        {
            id: 5,
            title: "Privacy",
            content: "To learn about how your personal data is collected and used, please see our ",
            hasLink: true,
            linkText: "Privacy Policy",
            linkHref: "/privacy"
        },
        {
            id: 6,
            title: "Changes",
            content: "These terms may be changed without prior notice. Changes will be published on this page and will be effective from the date of publication."
        },
        {
            id: 7,
            title: "Contact",
            content: "Please contact me through my contact information if you have any questions about these terms."
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
                        <p className="text-secondary text-lg">Last updated: {new Date().toLocaleDateString('en-US')}</p>
                    </div>

                    <div className="space-y-8 text-foreground">
                        {termsSections.map((section) => (
                            <section key={section.id} className="space-y-4">
                                <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
                                    {section.id}. {section.title}
                                </h2>
                                <div className="text-secondary leading-relaxed">
                                    {section.content}
                                    {section.hasLink && (
                                        <Link href={section.linkHref!} className="text-primary hover:underline">
                                            {section.linkText}
                                        </Link>
                                    )}
                                    {section.hasLink && " page."}
                                </div>
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
