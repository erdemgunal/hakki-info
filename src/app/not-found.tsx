import Link from 'next/link';

export const metadata = {
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-start text-left max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 pt-24 py-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Page not found
            </h1>
            <Link href="/" className="text-accent hover:text-foreground text-sm">
                Back to home
            </Link>
        </main>
    );
}