import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">
              Blog yazısı bulunamadı
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Aradığınız blog yazısı mevcut değil veya taşınmış olabilir.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="default" asChild>
            <Link href="/blog" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Blog&apos;a dön
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Ana sayfaya dön
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
