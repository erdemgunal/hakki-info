import Link from 'next/link';
import { fetchResumeData } from '@/lib/fetch-resume-data';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';
import { PageShell, PageHeader } from '@/components/layout';
import GlobeIcon from '@/components/icon/GlobeIcon';
import MailIcon from '@/components/icon/MailIcon';
import ExternalLinkIcon from '@/components/icon/ExternalLinkIcon';

export default async function ContactPage() {
    const resumeData = await fetchResumeData();
    const { hero, social } = resumeData;
    const path = '/contact';

    const socialLinks = (social || []).filter(
        (item) => !item.url.startsWith('mailto:') && item.iconKey?.toLowerCase() !== 'mail',
    );

    return (
        <main id="main-content" className="min-h-screen bg-background">
            <PageShell>
                <PageHeader
                    title="Contact"
                    description="Reach out for collaborations, questions, or just to say hello."
                />

                <div className="max-w-xl p-6 space-y-8">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Email
                        </p>

                        <a
                            href={`mailto:${hero.email}`}
                            data-umami-event="contact-email"
                            className="flex items-center justify-center gap-3 rounded-md bg-accent px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-accent-dark transition-all duration-200"
                        >
                                <MailIcon className="h-5 w-5" aria-hidden />
                            Send me an email
                        </a>
                    </div>

                    <div className="border-t border-border pt-8 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Location
                        </p>
                        <div className="flex items-center gap-2 text-secondary">
                            <GlobeIcon className="h-4 w-4 shrink-0" aria-hidden />
                            <span className="text-sm sm:text-base">{hero.location}</span>
                        </div>
                    </div>

                    {socialLinks.length > 0 && (
                        <div className="border-t border-border pt-8 space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Elsewhere
                            </p>
                            <ul className="divide-y divide-border border-y border-border">
                                {socialLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.url}
                                            className="flex items-center justify-between gap-4 p-3 text-base text-foreground transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-umami-event="social-click"
                                            data-umami-event-platform={item.name}
                                        >
                                            <span>{item.name}</span>
                                            <ExternalLinkIcon
                                                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                                                aria-hidden
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <PageAnalyticsSection path={path} />
            </PageShell>
        </main>
    );
}

