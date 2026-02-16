export default async function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className="min-h-screen bg-background">
            <body className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">
                {children}
            </body>
        </html>
    )
}