import Link from 'next/link';
import { fetchResumeData } from '@/lib/fetch-resume-data';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';

export default async function ContactPage() {
    const resumeData = await fetchResumeData();
    const { hero, social } = resumeData;
    const path = '/contact';

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
                <div className="py-4 sm:py-6 md:py-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Contact
                    </h1>

                    <div className="space-y-4 text-sm sm:text-base">
                        <div className="flex flex-col">
                            <Link
                                href={`mailto:${hero.email}`}
                                className="text-accent hover:text-foreground break-all"
                            >
                                {hero.email}
                            </Link>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-secondary">{hero.location}</span>
                        </div>

                        <div className="pt-4">
                            <p className="text-secondary mb-3">Social</p>
                            <ul className="flex flex-col gap-2">
                                {(social || []).map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.url}
                                            className="text-accent hover:text-foreground"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <PageAnalyticsSection path={path} />
            </div>
        </main>
    )
}
