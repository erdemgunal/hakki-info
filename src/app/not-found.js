import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
    const t = await getTranslations('NotFound');
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
                <p className="text-xl text-muted-foreground mb-4">{t('title')}</p>
                <Button variant="default" asChild>
                    <Link href="/">
                        {t('button')}
                    </Link>
            </Button>
            </div>
        </div>
    );
}