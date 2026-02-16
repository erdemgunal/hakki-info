import Link from 'next/link';
import { fetchResumeData } from '@/lib/fetch-resume-data';

export default async function ContactPage() {
    const resumeData = await fetchResumeData();
    const { hero, footer } = resumeData;

    const contactTitle = footer.contact?.title || 'Contact';

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
                <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {contactTitle}
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
                                <Link
                                    href={`tel:+${hero.contact.phone}`}
                                    className="text-accent hover:text-foreground"
                                >
                                    +{hero.contact.phone}
                                </Link>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-secondary">{hero.location}</span>
                            </div>

                            <div className="pt-4 border-t border-border/60">
                                <ul className="space-y-1.5">
                                    {(hero.contact?.social || []).map((social) => (
                                        <li key={social.name}>
                                            <Link
                                                href={social.url}
                                                className="text-accent hover:text-foreground"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {social.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
