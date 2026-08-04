import Link from 'next/link';
import { PageShell } from '@/components/layout';

export const metadata = {
    title: 'Project not found',
    description: 'The project you are looking for could not be found.',
};

export default function ProjectNotFound() {
    return (
        <main id="main-content" className="min-h-screen bg-background">
            <PageShell className="pb-20">
                <div className="flex flex-col items-start text-left py-16 sm:py-24">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Project not found
                    </h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link
                            href="/projects"
                            className="min-h-11 inline-flex items-center text-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                        >
                            View all projects
                        </Link>
                        <Link
                            href="/"
                            className="min-h-11 inline-flex items-center text-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </PageShell>
        </main>
    );
}
