import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">   
        <div className="mb-8 ">
          <Search className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          
          <h1 className="text-4xl font-bold text-foreground mb-4">Proje Bulunamadı</h1>
          <p className="text-muted-foreground leading-relaxed">
            Aradığınız proje mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Link href="/#projects">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Tüm Projeleri Görüntüle
            </Button>
          </Link>
          
          <div>
            <Link href="/">
              <Button variant="outline">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Proje Bulunamadı | Hakkı Günal',
  description: 'Aradığınız proje bulunamadı. Diğer projelerimi görmek için portfolyoma göz atın.',
};
