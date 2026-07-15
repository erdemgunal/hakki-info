import ReactMarkdown from 'react-markdown';
import { fetchPrivacyContent } from '@/lib/fetch-privacy-content';

export default async function PrivacyPage() {
    const { frontmatter, content } = await fetchPrivacyContent();

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
                <div className="space-y-8">
                    <article className="prose prose-neutral max-w-none prose-headings:text-foreground prose-headings:border-b prose-headings:border-border prose-headings:pb-2 prose-p:text-secondary prose-li:text-secondary prose-a:text-accent hover:prose-a:text-accent/80">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}
