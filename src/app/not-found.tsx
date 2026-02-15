import Link from 'next/link';

export const metadata = {
    title: '404 - Not Found',
    description: 'The page you are looking for does not exist.',
};

export default async function NotFound() {
    return (
        <div className="min-h-screen bg-background">
            <h1 className="text-9xl font-bold text-foreground p-8">
                404
            </h1>
            <Link href="/" className="text-primary hover:underline">Go back to the home page</Link>
        </div>
    );
}