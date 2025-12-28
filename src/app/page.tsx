import {
    Hero,
    About,
    Education,
    Languages,
    Skills,
    Projects,
} from '@/components/sections';
import {
    Footer
} from '@/components/layout';

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
                <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10">
                        <Hero />
                        <div className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16 pb-10 sm:pb-12 md:pb-14 lg:pb-16">
                            <About />
                            <Education />
                            <Languages />
                            <Skills />
                            <Projects />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}