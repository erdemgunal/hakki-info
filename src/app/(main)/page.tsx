import {
    Hero,
    About,
    Education,
    Languages,
    Skills,
    Projects,
} from '@/components/sections';
import ActiveSectionIndicator from '@/components/ActiveSectionIndicator';

export default async function Home() {
    return (
        <main className="min-h-screen bg-background relative">
            <ActiveSectionIndicator />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
                <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="px-6 sm:px-8 md:px-10 lg:px-12">
                        <Hero />
                        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                            <About />
                            <Education />
                            <Languages />
                            <Skills />
                            <Projects />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}