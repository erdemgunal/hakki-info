import {
    Hero,
    About,
    Education,
    Languages,
    Skills,
    Projects,
    BlogPreview
} from '@/components/sections';
import {
    ActiveSectionIndicator,
    Footer,
    MobileNavigation
} from '@/components/layout';

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <ActiveSectionIndicator />
            <MobileNavigation />
            <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-16 py-8">
                <div className="bg-surface border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
                    <div className="p-6 sm:p-10 lg:p-16 space-y-20">
                        <section id="hero"><Hero /></section>
                        <section id="about"><About /></section>
                        <section id="education"><Education /></section>
                        <section id="languages"><Languages /></section>
                        <section id="skills"><Skills /></section>
                        <section id="projects"><Projects /></section>
                        <section id="blog"><BlogPreview /></section>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}