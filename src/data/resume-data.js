import { GitHubIcon } from "../components/icons/GitHubIcon";
import { LinkedInIcon } from "../components/icons/LinkedInIcon";
import { TwitterIcon } from "../components/icons/TwitterIcon";

export const RESUME_DATA = {
    name: "<Hakkı />",
    initials: "HAKKI",
    location: "Istanbul, Turkey",
    locationLink: "https://www.google.com/maps/place/Istanbul/",
    about:
        `Full-stack developer and physics student excited about automation and problem-solving. ${new Date().getFullYear() - 2004} years old, turning complex challenges into elegant solutions.`,
    summary:
        "As a physics student at Marmara University, I combine analytical thinking with technical expertise in software development. With 3 years of experience in technologies like Python, JavaScript, TypeScript, React, and Next.js, I specialize in creating automated solutions and user-centric web applications. My background in physics enhances my problem-solving capabilities, while my design skills enable me to craft visually appealing interfaces. Beyond coding, I'm an avid basketball player, which has taught me valuable lessons in teamwork and perseverance. I excel in collaborative environments, bringing both technical proficiency and strong interpersonal skills to every project.",
    avatarUrl: "https://avatars.githubusercontent.com/u/65365648?v=4",
    personalWebsiteUrl: "https://hakki-info.vercel.app",
    contact: {
        email: "erdemmgunal@gmail.com",
        tel: "+905320664332",
        social: [
            {
                name: "GitHub",
                url: "https://github.com/erdemmgunal",
                icon: GitHubIcon,
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/hakkierdem/",
                icon: LinkedInIcon,
            },
            {
                name: "Twitter",
                url: "https://twitter.com/erdemmgunal/",
                icon: TwitterIcon,
            },
        ],
    },
    education: [
        {
            school: "Marmara University",
            degree: "Bachelor's Degree in Physics",
            start: "2023",
            end: "Present",
        },
        {
            school: "Istanbul Kadıköy High School",
            degree: "High School Diploma",
            start: "2019",
            end: "2023",
        },
        {
            school: "TED Rönesans College",
            degree: "Secondary Education",
            start: "2018",
            end: "2019",
        }
    ],
    work: [
        {
            company: "Hakkınızla Uçun",
            link: "https://hakkinizlaucun.vercel.app",
            badges: ["Founder & Developer"],
            start: "2024",
            end: "Present",
            description:
                "Developed an innovative flight search platform that helps users find optimal short-term round-trip flights between Turkey and Europe. The system specializes in filtering trips lasting 2-7 days, focusing on cost-effectiveness and convenience.",
        },
        {
            company: "Monitorist",
            link: "https://monitorist.vercel.app",
            badges: ["Founder & Lead Developer"],
            start: "2021",
            end: "2023",
            description:
                "Founded and led the development of a sophisticated e-commerce monitoring platform. Built and maintained a real-time system that tracks inventory changes across 20+ websites, providing critical data for business decisions. Implemented automated notification systems and scalable infrastructure.",
        },
    ],
    certs: [
        {
            title: "Advanced Digital Marketing",
            link: "",
            start: "2024",
            description: "Comprehensive digital marketing certification program by Rıdvan Aydın at Marmara University Sinerji Club",
        },
    ],
    skills: [
        "Python",
        "JavaScript",
        "TypeScript",
        "React/Next.js",
        "System Architecture",
        "UI/UX Design",
        "Adobe Photoshop",
        "Problem Solving",
        "Automation",
        "Team Leadership",
    ],
    projects: [
        {
            title: "MarunGPT",
            techStack: ["Next.js", "TailwindCSS", "Framer Motion", "Shadcn", "MongoDB", "OpenAI API", "JWT", "NextAuth"],
            description: "Created an AI-powered chatbot specifically trained on Marmara University's data to enhance student experience. Provides instant, accurate information about academic programs, campus services, and university events through natural language interactions.",
            link: {
                label: "MarunGPT",
                href: "https://marungpt.vercel.app"
            }
        },
        {
            title: "Monitorist",
            techStack: ["Python", "Next.js", "MongoDB", "WebSocket", "REST API"],
            description: "Enterprise-grade monitoring platform providing real-time inventory tracking and automated notifications for e-commerce businesses. Features advanced analytics and scalable architecture.",
            link: {
                label: "Monitorist",
                href: "https://monitorist.vercel.app"
            }
        },
        {
            title: "Hakkı Aranıyor",
            techStack: ["Next.js", "TailwindCSS", "Radix UI", "Framer Motion"],
            description: "Interactive mystery-solving game featuring multiple categories including Detective and Dark Stories. Implements advanced search functionality, difficulty ratings, and responsive design.",
            link: {
                label: "Hakkı Aranıyor",
                href: "https://hakki-araniyor.vercel.app"
            }
        },
        {
            title: "Hakkınızla Uçun",
            techStack: ["Next.js", "TailwindCSS", "RESTful APIs", "Data Analytics"],
            description: "Advanced flight search platform optimizing travel plans between Turkey and Europe. Features intelligent filtering for duration, price ranges, and destinations.",
            link: {
                label: "Hakkınızla Uçun",
                href: "https://hakkinizlaucun.com"
            }
        },
        {
            title: "Tekno Pazar",
            techStack: ["Next.js", "Prisma", "PostgreSQL", "NextAuth", "Vercel"],
            description: "B2B marketplace platform for technology products, featuring secure authentication, inventory management, and automated pricing systems.",
            link: {
                label: "Tekno Pazar",
                href: "https://tekno-pazar.vercel.app"
            }
        },
        {
            title: "React Weather App",
            techStack: ["React", "JavaScript", "TailwindCSS", "OpenWeather API"],
            description: "Modern weather application providing real-time forecasts and location-based weather updates. Features an intuitive interface and responsive design for seamless user experience.",
            link: {
                label: "Weather App",
                href: "https://github.com/erdemmgunal/reactstaj-weather-app"
            }
        },
        {
            title: "Idata Scraper",
            techStack: ["Python", "Automation", "Web Scraping"],
            description: "Automated notification system for appointment availability monitoring. Built for educational purposes to demonstrate web scraping and automation capabilities.",
            link: {
                label: "Idata Scraper",
                href: "https://github.com/erdemmgunal/idata-scraper"
            }
        },
        {
            title: "Troy Monitor",
            techStack: ["Python", "SQLite", "Web Scraping"],
            description: "Inventory tracking system specifically designed to monitor iPhone 15 availability. Features real-time notifications and database storage for historical data.",
            link: {
                label: "Troy Monitor",
                href: "https://github.com/erdemmgunal/troy-monitor"
            }
        },
        {
            title: "Macmillan Scraper",
            techStack: ["Python", "PDF Processing", "Web Automation"],
            description: "Educational tool demonstrating advanced PDF processing and web automation techniques. Created for academic research and learning purposes.",
            link: {
                label: "Macmillan Scraper",
                href: "https://github.com/erdemmgunal/macmillan-education"
            }
        },
        {
            title: "Marti Client",
            techStack: ["Python", "API Integration", "Geolocation"],
            description: "Comprehensive monitoring system for tracking MARTI company vehicles including scooters, motorcycles, and mopeds. Developed for educational purposes to demonstrate API integration.",
            link: {
                label: "Marti Client",
                href: "https://github.com/erdemmgunal/marti-scooter"
            }
        },
        {
            title: "BMW-MERCEDES Monitor",
            techStack: ["Python", "SQLite3", "Discord Webhook"],
            description: "Automated vehicle inventory monitoring system tracking official dealership websites. Features real-time notifications through Discord and persistent data storage.",
            link: {
                label: "BMW-MERCEDES Monitor",
                href: "https://github.com/erdemmgunal/bmw-mercedes-monitor"
            }
        },
        {
            title: "Biryere Scraper",
            techStack: ["Python", "MongoDB", "Data Processing"],
            description: "Data collection and processing system developed for the Hakkınızla Uçun project. Implements advanced web scraping techniques and structured data storage.",
            link: {
                label: "Biryere Scraper",
                href: "https://github.com/erdemmgunal/hakkinizlaucun"
            }
        },
        {
            title: "Konusanlar Monitor",
            techStack: ["Python", "SQLite3", "Discord Webhook"],
            description: "Event ticket availability monitoring system for mobilet.com. Features automated Discord notifications and database tracking for 'Konusanlar' show tickets.",
            link: {
                label: "Konusanlar Monitor",
                href: "https://github.com/erdemmgunal/Konusanlar-Monitor"
            }
        }
    ],
    languages: [
        {
            name: "English",
            level: "Professional Working Proficiency",
        },
        {
            name: "Turkish",
            level: "Native Speaker",
        },
    ],
};