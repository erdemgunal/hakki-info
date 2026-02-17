import Link from 'next/link';

export const metadata = {
    title: 'Project not found',
    description: 'The project you are looking for could not be found.',
};

export default function ProjectNotFound() {
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-24 pb-20">
                <div className="flex flex-col items-start text-left py-16 sm:py-24">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Project not found
                    </h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/projects" className="text-accent hover:text-foreground">
                            View all projects
                        </Link>
                        <Link href="/" className="text-accent hover:text-foreground">
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
