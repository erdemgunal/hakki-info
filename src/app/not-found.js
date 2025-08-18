import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function NotFound() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-muted-foreground">
              Sayfa bulunamadı
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
          </div>
        </div>
        
        <Button variant="default" asChild>
          <Link href="/">
            Ana sayfaya dön
          </Link>
        </Button>
      </div>
    </div>
  );
}