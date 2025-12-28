export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string; locale: string }>
}) {
    const { slug } = await params;
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-16 py-8">
                <h1>{slug}</h1>
            </div>
        </main>
    );
}

