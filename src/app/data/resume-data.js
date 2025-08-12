import GitHubIcon from "@/components/icon/GitHubIcon";
import LinkedInIcon from "@/components/icon/LinkedInIcon";
import TwitterIcon from "@/components/icon/TwitterIcon";
import WhatsAppIcon from "@/components/icon/WhatsAppIcon";

export const resumeData = {
    // Hero Section Data
    hero: {
        name: "<Hakkı />",
        title: "Full Stack Developer & Software Engineer",
        email: "me@hakki.info",
        location: "İstanbul, Türkiye",
        profileImage: "https://avatars.githubusercontent.com/u/65365648?v=4",
        summary: "Ben Hakkı, otomasyon, problem çözme ve verimli, iyi yapılandırılmış çözümler oluşturmaya odaklanan tam zamanlı yazılım geliştirici ve fizik öğrencisi.",
        contact: {
            email: "me@hakki.info",
            phone: "905551234567",
            social: [
                { name: "WhatsApp", url: "https://wa.me/905551234567", icon: WhatsAppIcon },
                { name: "GitHub", url: "https://github.com/erdemgunal", icon: GitHubIcon },
                { name: "LinkedIn", url: "https://linkedin.com/in/erdemgunal", icon: LinkedInIcon },
                { name: "Twitter", url: "https://x.com/erdemgunal", icon: TwitterIcon }
            ]
        }
    },

    // Footer Content
    footer: {
        brand: {
            name: "Hakkı Günal",
            description: "Full Stack Developer & Software Engineer. Modern web teknolojileri konusunda uzmanlaşmış, kullanıcı deneyimi odaklı çözümler geliştiren tutkulu bir yazılım geliştiricisi."
        },
        quickLinks: {
            title: "Hızlı Linkler",
            links: [
                { href: "#hero", text: "Ana Sayfa" },
                { href: "#about", text: "Hakkımda" },
                { href: "#work-experience", text: "İş Deneyimi" },
                { href: "#projects", text: "Projeler" }
            ]
        },
        contact: {
            title: "İletişim"
        }
    },

    // About Section Data
    about: {
        description: "5+ yıllık deneyimimle modern web teknolojileri konusunda uzmanlaşmış bir Full Stack Developer'ım. React, Node.js, ve Python ekosistemlerinde güçlü bir temel oluşturdum ve sürekli olarak yeni teknolojiler öğrenmeye odaklanıyorum. Kullanıcı deneyimini ön planda tutan, performanslı ve ölçeklenebilir uygulamalar geliştirmeye tutkulu bir yaklaşımla çalışıyorum. Agile metodolojileri benimseyerek, ekip çalışmasına değer veren ve problem çözme becerileri güçlü bir geliştiriciyim."
    },

    // Work Experience Data
    workExperience: [
        {
            company: "Hakkınızla Uçun",
            link: "https://hakkinizlaucun.com/",
            badges: ["Founder & Developer"],
            start: "2024",
            end: "Günümüz",
            location: "İstanbul, Türkiye",
            description: "Türkiye ile Avrupa arasında kısa süreli gidiş-dönüş uçuşlarını optimize eden bir uçuş arama platformu geliştirdik. 2-7 gün süren seyahatler için maliyet etkinliği ve rahatlığa odaklanan akıllı filtreleme uyguladık."
        },
        {
            company: "Monitorist",
            link: "https://monitorist.vercel.app/",
            badges: ["Founder & Lead Developer"],
            start: "2021",
            end: "2023",
            location: "Ankara, Türkiye",
            description: "20'den fazla web sitesinde envanteri takip eden gerçek zamanlı bir e-ticaret izleme platformu oluşturdu. İş kararlarını desteklemek için otomatik bildirim sistemleri ve ölçeklenebilir altyapı tasarladı."
        }
    ],

    // Education Data
    education: [
        {
            degree: "Fizik",
            school: "Marmara Üniversitesi",
            start: "2024",
            end: "Devam Ediyor"
        }
    ],

    // Languages Data
    languages: [
        {
            name: "Türkçe",
            level: "Ana Dil"
        },
        {
            name: "İngilizce",
            level: "B2-C1"
        }
    ],

    // Certificates Data
    certificates: [
        {
            name: "IELTS",
            score: "7.5/9.0",
            year: "2021",
            color: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            name: "Goethe Zertifikat",
            score: "B2",
            year: "2020",
            color: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            name: "DELE",
            score: "A2",
            year: "2019",
            color: "bg-purple-100",
            iconColor: "text-purple-600"
        }
    ],

    // Skills Data
    skills: {
        technical: [
            {
                name: "Frontend Geliştirme",
                skills: [
                    { name: "React" },
                    { name: "JavaScript" },
                    { name: "HTML/CSS" },
                    { name: "Next.js" }
                ]
            },
            {
                name: "Backend Geliştirme",
                skills: [
                    { name: "Node.js" },
                    { name: "Python" },
                    { name: "Express.js" },
                    { name: "FastAPI" },
                ]
            },
            {
                name: "Veritabanı & DevOps",
                skills: [
                    { name: "PostgreSQL" },
                    { name: "MongoDB" },
                    { name: "Redis" },
                    { name: "Docker" },
                    { name: "AWS" },
                    { name: "Git" }
                ]
            },
            {
                name: "Araçlar & Teknolojiler",
                skills: [
                    { name: "Jest" },
                    { name: "Tailwind CSS" },
                    { name: "REST API" },
                    { name: "Agile/Scrum" }
                ]
            }
        ],
        soft: [
            { name: "Problem Çözme" },
            { name: "Ekip Çalışması" },
            { name: "İletişim" },
            { name: "Liderlik" },
            { name: "Zaman Yönetimi" },
            { name: "Öğrenme Hızı" }
        ]
    },

    // Projects Data
    projects: [
        {
            title: "E-Ticaret Platformu",
            description: "Modern ve kullanıcı dostu bir e-ticaret platformu.",
            fullDescription: "React frontend, Node.js backend ve PostgreSQL veritabanı kullanılarak geliştirilmiş kapsamlı bir e-ticaret platformu. Kullanıcı kimlik doğrulama, ürün kategorileri, arama, sepet yönetimi, ödeme sistemi ve admin paneli özelliklerini içerir. Responsive tasarım ve performans optimizasyonu ile kullanıcı deneyimini ön planda tutan bir proje.",
            techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
            label: "Full Stack",
            year: "2023",
            images: [
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
            ],
            links: {
                live: "https://ecommerce-demo.com",
                github: "https://github.com/erdem/ecommerce-platform"
            }
        },
        {
            title: "Task Management App",
            description: "Takım çalışması için görev yönetim uygulaması.",
            fullDescription: "Real-time güncellemeler ve kanban board özelliği ile takım çalışmasını kolaylaştıran görev yönetim uygulaması. Socket.io ile anlık iletişim, dosya paylaşımı, görev önceliklendirme ve takım üyeleri arası etkileşim özelliklerini içerir. Modern UI/UX tasarımı ile kullanıcı dostu bir deneyim sunar.",
            techStack: ["Vue.js", "Socket.io", "MongoDB", "Express.js"],
            label: "Web App",
            year: "2023",
            images: [
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
            ],
            links: {
                live: "https://taskmanager-demo.com",
                github: "https://github.com/erdem/task-management"
            }
        },
        {
            title: "Portfolio Website",
            description: "Kişisel portfolyo web sitesi.",
            fullDescription: "Modern tasarım ve performans odaklı geliştirilmiş kişisel portfolyo web sitesi. Dark/Light mode, SEO optimizasyonu, hızlı yükleme ve responsive tasarım özelliklerini içerir. Next.js ve Tailwind CSS kullanılarak geliştirilmiş, kullanıcı deneyimini ön planda tutan bir proje.",
            techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
            label: "Frontend",
            year: "2024",
            images: [
                "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop"
            ],
            links: {
                live: "https://erdem-portfolio.com",
                github: "https://github.com/erdem/portfolio"
            }
        },
        {
            title: "API Gateway Service",
            description: "Mikroservis mimarisi için API Gateway.",
            fullDescription: "Rate limiting, authentication ve load balancing özellikleri ile mikroservis mimarisi için geliştirilmiş API Gateway. JWT authentication, request/response logging, health monitoring ve güvenlik özelliklerini içerir. Docker ve Kubernetes ile containerize edilmiş, ölçeklenebilir bir yapı.",
            techStack: ["Node.js", "Redis", "Docker", "Kubernetes"],
            label: "Backend",
            year: "2024",
            images: [
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
            ],
            links: {
                live: null,
                github: "https://github.com/erdem/api-gateway"
            }
        },
        {
            title: "Mobile Fitness App",
            description: "Fitness takibi için mobil uygulama.",
            fullDescription: "Egzersiz planları, beslenme takibi ve ilerleme analizi özellikleri ile fitness takibi için geliştirilmiş mobil uygulama. Sosyal özellikler, push notifications, ilerleme grafikleri ve kişiselleştirilmiş egzersiz programları sunar. React Native ile cross-platform geliştirilmiş.",
            techStack: ["React Native", "Firebase", "Redux", "Expo"],
            label: "Mobile",
            year: "2023",
            images: [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
            ],
            links: {
                live: "https://fitness-app.com",
                github: "https://github.com/erdem/fitness-app"
            }
        },
        {
            title: "Data Analytics Dashboard",
            description: "İş verilerini görselleştiren analitik dashboard.",
            fullDescription: "Gerçek zamanlı veri analizi ve raporlama özellikleri ile iş verilerini görselleştiren analitik dashboard. İnteraktif grafikler, özelleştirilebilir dashboard, veri export özellikleri ve kullanıcı yetkilendirme sistemi içerir. D3.js ile gelişmiş veri görselleştirme teknikleri kullanılmış.",
            techStack: ["React", "D3.js", "Python", "PostgreSQL"],
            label: "Data",
            year: "2023",
            images: [],
            links: {
                live: "https://analytics-demo.com",
                github: "https://github.com/erdem/analytics-dashboard"
            }
        }
    ]
}; 