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
      content: "Web sitemiz, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için çerezler kullanır. Kullandığımız çerezler şunlardır:",
      hasList: true,
      listItems: [
        "Google Analytics çerezleri (_ga, _gid, _gat): Kullanıcı davranışlarını analiz etmek ve site istatistiklerini toplamak için kullanılır",
        "Microsoft Clarity çerezleri (_clck, _clsk, CLID): Kullanıcı etkileşimlerini kaydetmek ve site kullanılabilirliğini iyileştirmek için kullanılır",
        "Tercih çerezleri: Tema seçiminiz gibi tercihlerinizi hatırlamak için kullanılır",
        "Güvenlik çerezleri: Site güvenliğini sağlamak için kullanılır"
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
      title: "Üçüncü Taraf Analitik Servisleri",
      content: "Web sitemizde aşağıdaki üçüncü taraf analitik servisleri kullanmaktayız:",
      hasList: true,
      listItems: [
        "Google Analytics: Web sitesi kullanım istatistiklerini toplar ve analiz eder. IP adresleri anonimleştirilir.",
        "Microsoft Clarity: Kullanıcı etkileşimlerini kaydeder (fare hareketleri, tıklamalar, sayfa kaydırmaları). Kişisel veriler maskelenir.",
        "Bu servislerin gizlilik politikaları: Google Privacy Policy ve Microsoft Privacy Statement"
      ]
    },
    {
      id: 6,
      title: "Çerez Detayları",
      content: "Kullandığımız çerezlerin detaylı bilgileri:",
      hasList: true,
      listItems: [
        "_ga: Kullanıcıları ayırt eder (2 yıl saklanır)",
        "_gid: Site kullanım istatistikleri oluşturur (1 gün saklanır)", 
        "_gat: İstek oranını sınırlar (1 dakika saklanır)",
        "_clck: Kullanıcı davranışlarını izler (1 yıl saklanır)",
        "_clsk: Sayfa görüntülemelerini bağlar (1 gün saklanır)",
        "CLID: İlk ziyaret kaydı (1 yıl saklanır)"
      ]
    },
    {
      id: 7,
      title: "Bilgi Paylaşımı",
      content: "Kişisel verilerinizi üçüncü taraflarla paylaşmayız. Ancak, yukarıda belirtilen analitik servislere anonim veriler gönderilir ve yasal zorunluluk durumunda yetkili makamlarla paylaşmak zorunda kalabiliriz."
    },
    {
      id: 8,
      title: "Veri Güvenliği",
      content: "Kişisel verilerinizi korumak için uygun teknik ve organizasyonel önlemler alıyoruz. Analitik servislerimiz de endüstri standartlarında güvenlik önlemleri kullanmaktadır. Ancak, internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın."
    },
    {
      id: 9,
      title: "Haklarınız",
      content: "Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:",
      hasList: true,
      listItems: [
        "Verilerinize erişim hakkı",
        "Verilerinizin düzeltilmesi hakkı",
        "Verilerinizin silinmesi hakkı",
        "Veri işlemeye itiraz hakkı",
        "Çerezleri devre dışı bırakma hakkı (tarayıcı ayarlarından)"
      ]
    },
    {
      id: 10,
      title: "Çerez Yönetimi",
      content: "Çerezleri tarayıcınızın ayarlar menüsünden kontrol edebilir ve devre dışı bırakabilirsiniz. Ancak, bazı çerezleri devre dışı bırakmanız durumunda web sitesinin bazı özellikleri düzgün çalışmayabilir."
    },
    {
      id: 11,
      title: "Değişiklikler",
      content: "Bu gizlilik politikası, önceden haber verilmeksizin değiştirilebilir. Değişiklikler bu sayfada yayınlanacak ve yayınlandığı tarihten itibaren geçerli olacaktır."
    },
    {
      id: 12,
      title: "İletişim",
      content: "Bu gizlilik politikası hakkında sorularınız için lütfen iletişim bilgilerimden bana ulaşın."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="space-y-8">
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
