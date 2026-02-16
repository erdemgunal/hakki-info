import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { fetchPrivacyContent } from '@/lib/fetch-privacy-content';

export default async function PrivacyPage() {
    const { frontmatter, content } = await fetchPrivacyContent();

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold text-foreground">{frontmatter.title}</h1>
                        <p className="text-secondary text-lg">
                            Last updated: {frontmatter.updated ? new Date(frontmatter.updated).toLocaleDateString('en-US') : new Date().toLocaleDateString('en-US')}
                        </p>
                    </div>

                    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-headings:border-b prose-headings:border-border prose-headings:pb-2 prose-p:text-secondary prose-li:text-secondary prose-a:text-accent hover:prose-a:text-accent/80">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </article>

                    <div className="text-center pt-8">
                        <Button variant="primary" asChild>
                            <Link href="/">
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
