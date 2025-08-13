import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  const termsSections = [
    {
      id: 1,
      title: "Kabul ve Onay",
      content: "Bu web sitesini kullanarak, aşağıdaki şartları kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız, lütfen bu siteyi kullanmayınız."
    },
    {
      id: 2,
      title: "Hizmet Kullanımı",
      content: "Bu web sitesi, Hakkı Günal'ın kişisel portfolyo ve profesyonel bilgilerini sunmak amacıyla oluşturulmuştur. Site içeriği bilgilendirme amaçlıdır ve ticari kullanım için tasarlanmamıştır."
    },
    {
      id: 3,
      title: "Fikri Mülkiyet Hakları",
      content: "Bu web sitesindeki tüm içerik, tasarım, kod ve materyaller Hakkı Günal'a aittir ve telif hakkı ile korunmaktadır. İçeriğin kopyalanması, dağıtılması veya değiştirilmesi yasaktır."
    },
    {
      id: 4,
      title: "Sorumluluk Reddi",
      content: "Bu web sitesi \"olduğu gibi\" sunulmaktadır. Hakkı Günal, sitenin kesintisiz çalışması veya hatasız olması konusunda garanti vermez. Site kullanımından doğabilecek herhangi bir zarardan sorumlu değildir."
    },
    {
      id: 5,
      title: "Gizlilik",
      content: "Kişisel verilerinizin nasıl toplandığı ve kullanıldığı hakkında bilgi almak için ",
      hasLink: true,
      linkText: "Gizlilik Politikası",
      linkHref: "/privacy"
    },
    {
      id: 6,
      title: "Değişiklikler",
      content: "Bu şartlar, önceden haber verilmeksizin değiştirilebilir. Değişiklikler bu sayfada yayınlanacak ve yayınlandığı tarihten itibaren geçerli olacaktır."
    },
    {
      id: 7,
      title: "İletişim",
      content: "Bu şartlar hakkında sorularınız için lütfen iletişim bilgilerimden bana ulaşın."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-secondary text-lg">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-foreground">
            {termsSections.map((section) => (
              <section key={section.id} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
                  {section.id}. {section.title}
                </h2>
                <div className="text-secondary leading-relaxed">
                  {section.content}
                  {section.hasLink && (
                    <a href={section.linkHref} className="text-primary hover:underline">
                      {section.linkText}
                    </a>
                  )}
                  {section.hasLink && " sayfamızı inceleyebilirsiniz."}
                </div>
              </section>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center pt-8">
            <Button variant="primary" asChild>
              <Link href="/">
                Ana Sayfaya Dön
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
