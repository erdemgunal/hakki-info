import GitHubIcon from "@/components/icon/GitHubIcon";
import LinkedInIcon from "@/components/icon/LinkedInIcon";
import TwitterIcon from "@/components/icon/TwitterIcon";
import WhatsAppIcon from "@/components/icon/WhatsAppIcon";
import { Mail } from "lucide-react";

export const resumeData = {
    hero: {
        name: "<Hakkı />",
        title: "Otomasyona Odaklı Full Stack Developer",
        email: "me@hakki.info",
        location: "İstanbul, Türkiye",
        profileImage: "https://avatars.githubusercontent.com/u/65365648?v=4",
        summary: "Full-stack developer olarak, analitik düşünme yeteneğimle karmaşık süreçleri otomatize ederek, ölçeklenebilir ve kullanıcı dostu yazılım çözümleri geliştiriyorum.",
        contact: {
            phone: "905551234567",
            social: [
                { name: "Email", url: "mailto:me@hakki.info", icon: Mail },
                { name: "WhatsApp", url: "https://wa.me/905551234567", icon: WhatsAppIcon },
                { name: "GitHub", url: "https://github.com/erdemgunal", icon: GitHubIcon },
                { name: "LinkedIn", url: "https://linkedin.com/in/erdemgunal", icon: LinkedInIcon },
                { name: "Twitter", url: "https://x.com/erdemgunal", icon: TwitterIcon }
            ]
        }
    },

    footer: {
        brand: {
            name: "Hakkı Günal",
            description: "Modern web teknolojileri ve otomasyon alanında uzmanlaşmış bir yazılım geliştiricisinin kişisel portfolyosu."
        },
        quickLinks: {
            title: "Hızlı Linkler",
            links: [
                { href: "#hero", text: "Ana Sayfa" },
                { href: "#about", text: "Hakkımda" },
                { href: "#projects", text: "Projeler" }
            ]
        },
        contact: {
            title: "İletişim"
        }
    },

    about: {
        description: "Yazılım dünyasına olan tutkum, full-stack developer olmaya olan yolculuğumun başlangıcı oldu. Son 5 yıldır Python ile, son 2 yıldır JavaScript ve son 1 yıldır da React ile projeler geliştiriyorum. Fizik eğitimimden gelen analitik düşünme yeteneğim, her soruna mantıksal bir yaklaşımla bakmamı sağlarken, vakit nakittir felsefemle manuel süreçleri otomatize etmeye odaklanıyorum. Bu sayede, yalnızca kod yazmakla kalmayıp, kullanıcı ve iş odaklı çözümler üretiyorum. Güçlü ekip çalışması, liderlik içgüdüsü ve sürekli öğrenme becerisiyle her projede değer yaratmayı hedefliyorum."
    },

    education: [
        {
            degree: "Fizik",
            school: "Marmara Üniversitesi",
            start: "2024",
            end: "Devam Ediyor"
        }
    ],

    languages: [
        { name: "Türkçe", level: "Ana Dil" },
        { name: "İngilizce", level: "B2-C1" }
    ],

    skills: {
        technical: [
            {
                name: "Frontend",
                skills: [
                    { name: "React" }, 
                    { name: "Next.js" }, 
                    { name: "JavaScript" }, 
                    { name: "Tailwind CSS" },
                    { name: "HTML/CSS" },
                    { name: "Shadcn UI" },
                ]
            },
            {
                name: "Backend",
                skills: [
                    { name: "Python" },
                    { name: "Node.js" },
                    { name: "Express.js" },
                    { name: "FastAPI" },
                    
                ]
            },
            {
                name: "Veritabanı & Altyapı",
                skills: [
                    { name: "PostgreSQL" },
                    { name: "MongoDB" },
                    { name: "Docker" },
                    { name: "AWS" }

                ]
            },
            {
                name: "Araçlar & Metodolojiler",
                skills: [
                    { name: "Git" },
                    { name: "Jest" },
                    { name: "Framer Motion" },
                    { name: "REST API" },
                    { name: "Agile/Scrum" },
                    { name: "Clean Architecture" },
                    { name: "Microservices" },
                    { name: "Test Odaklı Geliştirme" }
                ]
            }
        ],
        soft: [
            { name: "Problem Çözme" },
            { name: "Ekip Çalışması" },
            { name: "Liderlik" },
            { name: "Analitik Düşünme" },
            { name: "Sürekli Gelişim" },
            { name: "Girişimci Düşünce Yapısı" },
            { name: "İletişim" },
            { name: "İş Dünyasında Yeni Teknolojilere Açık" }
        ]
    },

    projects: [
        {
            title: "Hakkınızla Uçun",
            description: "Türkiye ve Avrupa arası kısa süreli gidiş-dönüş uçuşlarını otomatize eden bir uçuş arama platformu.",
            problem: "Uygun fiyatlı, kısa süreli yurt dışı uçuşlarını bulmak manuel olarak zaman alıcı ve zahmetli bir süreçti. Özellikle kampanyalı biletler için hız çok kritikti.",
            solution: "Next.js ve Python kullanarak, gidiş-dönüş uçuş verilerini çeken ve bunları istenen kriterlere (2-7 gün, en ucuz fiyat) göre filtreleyen bir otomasyon sistemi geliştirdim. Bu sistem manuel arama sürecini tamamen ortadan kaldırdı.",
            result: "Bu sistem sayesinde, İsviçre, Hollanda ve Avusturya gibi destinasyonlara çok uygun fiyatlara biletler bulabildim. Bu kişisel başarı, otomasyonun zaman ve para tasarrufu sağladığının somut bir kanıtı oldu ve bir girişime dönüştü.",
            techStack: ["Next.js", "Python", "RESTful APIs", "Vercel"],
            label: "Otomasyon",
            year: "2024",
            images: [
                "/images/hakkinizlaucun/1.png"
            ],
            links: {
                live: "https://hakkinizlaucun.com",
                github: "https://github.com/erdemgunal/hakkinizla-ucun"
            }
        },
        {
            title: "Monitorist",
            description: "20'den fazla e-ticaret sitesinin envanterini takip eden gerçek zamanlı bir izleme platformu.",
            problem: "E-ticaret sitelerindeki sınırlı sayıdaki (hype) ürünlerin stok durumunu manuel takip etmek, büyük verim kaybına yol açıyordu. Stoklar haber verilmeden eklendiği için fırsatları kaçırmak işin doğasıydı.",
            solution: "Python ile 7/24 çalışan bir web scraping otomasyonu kurdum. Bu sistem, hype ürünlerini sürekli izleyerek stok durumundaki değişiklikleri SQLite veritabanına kaydetti ve anlık bildirimleri Discord webhook'ları aracılığıyla abonelere ulaştırdı.",
            result: "Bu otomasyon, bana ve reseller'lara anında bilgi akışı sağlayarak, stoklar eklendiği anda harekete geçme fırsatı sundu. Bu proje, bir fikri ticarileştirerek bir topluluk oluşturma ve aylık üyelik satışlarıyla somut bir gelir elde etme yeteneğimi gösterdi.",
            techStack: ["Python", "React", "MongoDB", "WebSocket"],
            label: "Otomasyon",
            year: "2021-2023",
            images: [
                "/images/monitorist/1.png",
                "/images/monitorist/2.png"
                ],
            links: {
                live: "https://monitorist.vercel.app",
                github: "https://github.com/erdemgunal/monitorist"
            }
        },
        {
            title: "SoliClub Güvenlik Analizi",
            description: "Marmara Üniversitesi'nin yemekhane ödeme sistemindeki kritik bir güvenlik açığının tespiti ve analizi.",
            problem: "SoliClub ödeme sisteminin, client-side'dan gönderilen ödeme miktarını doğrulama eksikliği nedeniyle bir güvenlik açığına sahip olduğunu tespit ettim.",
            solution: "API trafiğini reverse engineering ve request interception teknikleriyle analiz ederek açığı buldum. Bu açığı, modern web teknolojileriyle (Next.js, React, Tailwind) geliştirilmiş bir demo uygulama ile gösterdim.",
            result: "Güvenlik açığı, sorumlu ifşa prensibiyle üniversite IT ekibine bildirildi ve açık kapatıldı. Bu proje, web geliştirme becerilerimin yanı sıra, etik hacking, API analizi ve sistem güvenliği konularındaki yetkinliğimi de kanıtladı.",
            techStack: ["Next.js", "React", "Tailwind CSS", "API Security", "Ethical Hacking"],
            label: "Güvenlik",
            year: "2024",
            images: [
                "/images/soliclub/1.png",
                "/images/soliclub/2.png"
            ],
            links: {
                live: null,
                github: "https://github.com/erdemgunal/soliclub-security-poc"
            }
        },
        {
            title: "MarunGPT",
            description: "Marmara Üniversitesi verileriyle eğitilmiş, yapay zeka destekli bir öğrenci destek chatbotu.",
            problem: "Öğrencilerin sıkça sorduğu sorulara (ders, program, kampüs hizmetleri) hızlı ve kullanıcı dostu bir şekilde yanıt veren bir platform eksikti. Bu durum idari birimler üzerinde yük oluşturuyordu.",
            solution: "OpenAI API ve Elasticsearch ile entegre, okulun resmi belgeleriyle eğitilmiş bir chatbot geliştirdik. React ve Tailwind CSS ile sezgisel bir arayüz oluşturup, MongoDB'de verileri yöneterek Docker ile containerize ettik.",
            result: "Bu proje, öğrencilerin aradıkları bilgilere anında ulaşmasını sağladı ve idari süreçleri otomatize etti. Bir gelir modeli olmamasına rağmen, yapay zeka entegrasyonu ve kullanıcı odaklı bir ürün geliştirme becerilerimi sergilemek için önemli bir vaka çalışması oldu.",
            techStack: ["React", "Tailwind CSS", "OpenAI API", "MongoDB", "Elasticsearch", "Docker"],
            label: "Yapay Zeka",
            year: "2023",
            images: [
                "/images/marungpt/1.png",
                "/images/marungpt/2.png"
            ],
            links: {
                live: "https://marungpt.vercel.app",
                github: "https://github.com/erdemgunal/marungpt"
            }
        },
        {
            title: "TeknoPazar",
            description: "Modern ve kullanıcı dostu bir e-ticaret yönetim sistemi.",
            problem: "E-ticaret sektöründeki mevcut yönetim sistemleri, karmaşık ürün ekleme süreçleri ve yetersiz özellikler sunarak işletmelerin verimini düşürüyordu.",
            solution: "Next.js 15, PostgreSQL ve AWS S3 kullanarak; 7 adımlı ürün ekleme sihirbazı, sürükle-bırak görsel yönetimi ve güvenli kimlik doğrulama gibi özellikler içeren kapsamlı bir e-ticaret yönetim sistemi geliştirdim.",
            result: "Bu sistem, ürün ekleme süresini azaltırken, Zod ile yapılan validasyonlar sayesinde hata oranını düşürdü. İşletmelere daha verimli bir yönetim paneli sunarak, onların dijital varlıklarını güçlendirmelerine yardımcı oldu.",
            techStack: ["Next.js", "React", "PostgreSQL", "Tailwind CSS", "AWS", "Stripe", "Zod", "Radix UI"],
            label: "Full Stack",
            year: "2024",
            images: [
                "/images/teknopazar/1.png",
                "/images/teknopazar/2.png",
                "/images/teknopazar/3.png",
                "/images/teknopazar/4.png",
                "/images/teknopazar/5.png",
                "/images/teknopazar/6.png"
            ],
            links: {
                live: "https://ecommerce-demo.com",
                github: "https://github.com/erdemgunal/tekno-pazar"
            }
        },  
        {
            title: "ESN Pulse",
            description: "ESN Marmara için veri odaklı etkinlik planlaması ve rekabet analizi sağlayan bir platform.",
            problem: "ESN Marmara, etkinlik planlaması yaparken diğer şubelerin verilerinden habersizdi ve yaratıcılıktan uzak kalıyordu. Veri odaklı karar verme süreçleri eksikti.",
            solution: "Python ile web scraping araçları geliştirerek 40'tan fazla ESN şubesinin etkinlik ve istatistik verilerini topladım. Bu verileri analiz ederek, başarılı etkinlik modellerini ve mevsimsel trendleri belirleyen bir sistem oluşturdum.",
            result: "Bu proje, ESN Marmara'nın uluslararası öğrenci tercihlerine uygun, veri odaklı etkinlikler düzenlemesini sağlayarak rekabet avantajı elde etmesine yardımcı oldu. Web scraping, veri analizi ve sistem mimarisi becerilerimi sergiledi.",
            techStack: ["Python", "BeautifulSoup", "PostgreSQL", "Pandas", "Scraping"],
            label: "Veri Analizi",
            year: "2023",
            images: [],
            links: {
                live: null,
                github: "https://github.com/erdemgunal/esn-pulse"
            }
        },
        {
            title: "Hakkı Aranıyor",
            description: "Tek bir yerde 'evet/hayır' formatında bulmacalar sunan, SEO ve performans odaklı bir web uygulaması.",
            problem: "Kullanıcılar, çeşitli ‘durum bulmacalarını’ keşfetmek ve oynamak için tek bir merkezi platforma ihtiyaç duyuyordu. Mevcut siteler arama, filtreleme ve mobil performans konusunda yetersizdi.",
            solution: "Next.js 15 ve React 19 ile mobil öncelikli, SEO uyumlu bir bulmaca platformu geliştirdim. Client-side filtreleme, URL senkronizasyonlu sayfalama ve localStorage ile son görüntülenen oyunları hatırlama gibi özellikler ekledim. shadcn/ui ile tutarlı bir tasarım sistemi oluşturdum.",
            result: "Hafif, ölçeklenebilir ve hızlı bir uygulama ortaya çıktı. Kullanıcı deneyimini artıran arama ve filtreleme özellikleri ile keşif derinliği sağlandı. Bu proje, modern full-stack teknolojileriyle bir ürünü sıfırdan hayata geçirme becerimi gösteriyor.",
            techStack: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
            label: "Web Geliştirme",
            year: "2024",
            images: [
                "/images/hakki-araniyor/1.png",
                "/images/hakki-araniyor/2.png"
            ],
            links: {
                live: "https://hakki-araniyor.vercel.app/",
                github: "https://github.com/erdemgunal/hakki-araniyor"
            }
        },
        {
            title: "Spotify Friend Activity Analyzer",
            description: "Spotify arkadaşlarının dinleme aktivitelerini analiz eden ve görselleştiren bir veri analizi aracı.",
            problem: "Spotify'ın standart arayüzü, arkadaşların dinleme alışkanlıklarını derinlemesine inceleme ve görselleştirme olanağı sunmuyordu, bu da sosyal etkileşimi sınırlıyordu.",
            solution: "Python, Spotify Web API ve SQLite kullanarak arkadaşların dinleme verilerini toplayan ve analiz eden bir araç geliştirdim. Elde edilen verileri, Jinja2 ile oluşturulmuş bir web arayüzünde ısı haritaları ve kullanıcıya özel panolarla görselleştirdim.",
            result: "Bu eğitim projesi, veri toplama, ETL süreçleri ve veri görselleştirme becerilerimi sergilemek için etkili bir vaka çalışması oldu. Proje, sadece bir uygulama geliştirmekten öte, sistem tasarımı ve mimari konularındaki yetkinliğimi gösterdi.",
            techStack: ["Python", "SQLite", "Jinja2", "Spotify Web API", "Plotly", "Threading"],
            label: "Veri Analizi",
            year: "2022",
            images: [
                "/images/spotify-friend-activity-analyzer/1.png"
            ],
            links: {
                live: null,
                github: "https://github.com/erdemgunal/SpotifyFriendTracker"
            }
        },
        {
            title: "Hakkı Info (Portfolyo)",
            description: "Sizin için geliştirdiğim, modern tasarım ve performans odaklı kişisel portfolyo web sitesi.",
            problem: "Profesyonel kimliği, projeleri ve becerileri en etkili şekilde sergilemek için modern, özgün ve kişiselleştirilmiş bir portfolyo sitesi oluşturma ihtiyacı vardı.",
            solution: "Bu siteyi, Next.js 15, Tailwind CSS ve Framer Motion gibi en güncel teknolojileri kullanarak geliştirdim. Modüler bir yapı, merkezi veri yönetimi ve dark/light tema desteği gibi özellikler ekledim.",
            result: "Ortaya çıkan ürün, hem estetik hem de işlevsel açıdan güçlü bir portfolyo sitesi oldu. Bu proje, modern full-stack geliştirme yeteneklerimi ve bir ürünün tasarımından yayınına kadar olan tüm süreçleri yönetme becerimi kanıtlıyor.",
            techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
            label: "Full Stack",
            year: "2024",
            images: [],
            links: {
                live: "https://hakki.info",
                github: "https://github.com/erdemgunal/hakki.info"
            }
        },
        {
            title: "React Weather App",
            description: "Gerçek zamanlı tahminler ve konum tabanlı güncellemeler sunan modern hava durumu uygulaması.",
            problem: "Bir staj programı için, sezgisel bir arayüzle gerçek zamanlı hava durumu verilerini sunan modern bir uygulama geliştirme ihtiyacı vardı.",
            solution: "React tabanlı bir uygulama geliştirdim ve veri kaynağı olarak OpenWeatherMap API'yi kullandım. Verileri etkili bir şekilde görselleştirmek için `react-chartjs-2` kütüphanesini entegre ettim.",
            result: "Bu proje, React ve API entegrasyonu becerilerimi sergiledi. Modern bir arayüz ve kullanıcı dostu grafiklerle, hava durumu verilerine kolay erişim sağlayan bir uygulama ortaya çıktı.",
            techStack: ["React", "Tailwind CSS", "OpenWeather API", "react-chartjs-2"],
            label: "Frontend",
            year: "2022",
            images: [],
            links: {
                live: null,
                github: "https://github.com/erdemgunal/reactstaj-weather-app"
            }
        },
    ]
};