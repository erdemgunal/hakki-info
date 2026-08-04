import {
    Hero,
    About,
    Background,
    Skills,
    Projects,
} from '@/features/home';
import ActiveSectionIndicator from '@/components/ActiveSectionIndicator';
import { PageAnalyticsSection } from '@/components/analytics/PageAnalyticsSection';
import { PageShell } from '@/components/layout';

export default async function Home() {
    const path = '/';

    return (
        <main id="main-content" className="min-h-screen bg-background relative">
            <ActiveSectionIndicator />
            <PageShell>
                <Hero />
                <div className="flex flex-col gap-14 sm:gap-16 md:gap-20 lg:gap-24 border-t border-border pt-12 sm:pt-14 md:pt-16 pb-4">
                    <About />
                    <Background />
                    <Skills />
                    <Projects />
                </div>
                <PageAnalyticsSection path={path} />
            </PageShell>
        </main>
    );
}
