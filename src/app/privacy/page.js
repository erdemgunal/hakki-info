import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  const privacySections = [
    {
      id: 1,
      title: "Giriş",
      content: "Hakkı Günal olarak, kişisel verilerinizin gizliliğini korumaya önem veriyoruz. Bu gizlilik politikası, web sitemizde hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar."
    },
    {
      id: 2,
      title: "Toplanan Bilgiler",
      content: "Web sitemizi ziyaret ettiğinizde, tarayıcınız otomatik olarak aşağıdaki bilgileri gönderir:",
      hasList: true,
      listItems: [
        "IP adresiniz",
        "Tarayıcı türü ve versiyonu",
        "İşletim sistemi",
        "Ziyaret ettiğiniz sayfalar",
        "Ziyaret süresi"
      ]
    },
    {
      id: 3,
      title: "Çerezler (Cookies)",
      content: "Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanabilir. Bu çerezler:",
      hasList: true,
      listItems: [
        "Site performansını analiz etmek için kullanılır",
        "Tercihlerinizi hatırlamak için kullanılır",
        "Güvenlik amaçlı kullanılır"
      ]
    },
    {
      id: 4,
      title: "Bilgilerin Kullanımı",
      content: "Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:",
      hasList: true,
      listItems: [
        "Web sitesinin performansını iyileştirmek",
        "Kullanıcı deneyimini geliştirmek",
        "Teknik sorunları çözmek",
        "Güvenliği sağlamak"
      ]
    },
    {
      id: 5,
      title: "Bilgi Paylaşımı",
      content: "Kişisel verilerinizi üçüncü taraflarla paylaşmayız. Ancak, yasal zorunluluk durumunda yetkili makamlarla paylaşmak zorunda kalabiliriz."
    },
    {
      id: 6,
      title: "Veri Güvenliği",
      content: "Kişisel verilerinizi korumak için uygun teknik ve organizasyonel önlemler alıyoruz. Ancak, internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın."
    },
    {
      id: 7,
      title: "Haklarınız",
      content: "Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:",
      hasList: true,
      listItems: [
        "Verilerinize erişim hakkı",
        "Verilerinizin düzeltilmesi hakkı",
        "Verilerinizin silinmesi hakkı",
        "Veri işlemeye itiraz hakkı"
      ]
    },
    {
      id: 8,
      title: "Değişiklikler",
      content: "Bu gizlilik politikası, önceden haber verilmeksizin değiştirilebilir. Değişiklikler bu sayfada yayınlanacak ve yayınlandığı tarihten itibaren geçerli olacaktır."
    },
    {
      id: 9,
      title: "İletişim",
      content: "Bu gizlilik politikası hakkında sorularınız için lütfen iletişim bilgilerimden bana ulaşın."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Gizlilik Politikası</h1>
            <p className="text-secondary text-lg">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-foreground">
            {privacySections.map((section) => (
              <section key={section.id} className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
                  {section.id}. {section.title}
                </h2>
                <div className="text-secondary leading-relaxed">
                  {section.content}
                </div>
                {section.hasList && (
                  <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                    {section.listItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
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
