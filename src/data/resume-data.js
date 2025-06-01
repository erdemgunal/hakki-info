import { GitHubIcon } from "../components/icons/GitHubIcon";
import { LinkedInIcon } from "../components/icons/LinkedInIcon";
import { TwitterIcon } from "../components/icons/TwitterIcon";

export const RESUME_DATA = {
    name: "<Hakkı />",
    initials: "HAKKI",
    location: "Istanbul, Turkey",
    locationLink: "https://www.google.com/maps/place/Istanbul/",
    about: "Full-stack developer and physics student focused on automation, problem-solving, and creating efficient, well-structured solutions.",
    summary:
        "As a physics student at Marmara University, I leverage my analytical thinking and technical skills in software development. With 3+ years of experience in Python, JavaScript, React, and Next.js, I specialize in creating automated solutions and user-friendly web applications. My physics background enhances my problem-solving abilities, while my design skills enable me to craft visually appealing interfaces. Beyond coding, I enjoy basketball, which has taught me teamwork and perseverance. I thrive in collaborative environments, bringing both technical expertise and strong communication skills to every project.",
    avatarUrl: "https://avatars.githubusercontent.com/u/65365648?v=4",
    personalWebsiteUrl: "https://hakki-info.vercel.app",
    contact: {
        email: "erdemmgunal@gmail.com",
        tel: "905320664332",
        social: [
            {
                name: "GitHub",
                url: "https://github.com/erdemgunal",
                icon: GitHubIcon,
            },
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/hakkierdem/",
                icon: LinkedInIcon,
            },
            {
                name: "X",
                url: "https://x.com/erdemgunal/",
                icon: TwitterIcon,
            },
        ],
    },
    education: [
        {
            school: "Marmara University",
            degree: "Bachelor's Degree in Physics",
            start: "2024",
            end: "Present",
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
                "Developed a flight search platform optimizing short-term round-trip flights between Turkey and Europe. Implemented intelligent filtering for trips lasting 2-7 days, focusing on cost-effectiveness and convenience.",
        },
        {
            company: "Monitorist",
            link: "https://monitorist.vercel.app",
            badges: ["Founder & Lead Developer"],
            start: "2021",
            end: "2023",
            description:
                "Built a real-time e-commerce monitoring platform tracking inventory across 20+ websites. Designed automated notification systems and scalable infrastructure to support business decision-making.",
        },
    ],
    certs: [
        {
            title: "Advanced Digital Marketing",
            link: "#",
            start: "2024",
            description: "Completed a comprehensive digital marketing certification program by Rıdvan Aydın at Marmara University Sinerji Club.",
        },
    ],
    skills: [
        "Python Development",
        "JavaScript",
        "React.js",
        "Full-Stack Development",
        "UI/UX Design",
        "Task Automation",
        "Web Scraping",
        "API Integration",
        "Analytical Thinking",
        "Problem Solving",
        "Project Management",
    ],
    projects: [
        {
            title: "Hakkınızla Uçun",
            techStack: ["React", "TailwindCSS", "RESTful APIs"],
            description: "Flight search platform optimizing travel plans between Turkey and Europe with intelligent filtering for duration and price.",
            link: {
                label: "Hakkınızla Uçun",
                href: "https://hakkinizlaucun.com",
            },
        },
        {
            title: "Monitorist",
            techStack: ["Python", "React", "MongoDB", "WebSocket"],
            description: "Real-time e-commerce monitoring platform tracking inventory across 20+ websites, enabling businesses to make data-driven decisions.",
            link: {
                label: "Monitorist",
                href: "https://monitorist.vercel.app",
            },
        },
        {
            title: "MarunGPT",
            techStack: ["React", "TailwindCSS", "OpenAI API", "MongoDB"],
            description: "AI-powered chatbot trained on Marmara University's data to provide students with instant, accurate information about academic programs and campus services.",
            link: {
                label: "MarunGPT",
                href: "https://marungpt.vercel.app",
            },
        },
        {
            title: "Tekno Pazar",
            techStack: ["React", "PostgreSQL", "JavaScript", "Server Actions"],
            description: "A full-stack e-commerce platform for technology products featuring product management, real-time inventory tracking, and an admin dashboard. Implemented secure form validation, dynamic routing, and database operations with PostgreSQL.",
            link: {
                label: "Tekno Pazar",
                href: "http://tekno-pazar.vercel.app/",
            },
        },
        {
            title: "Spotify Friend Activity Analyzer (Educational Project)",
            techStack: ["Python", "SQLite", "Plotly", "Jinja2", "HTTP Server", "Spotify Web API", "Threading", "Environment Variables"],
            description: "Built a real-time data analytics tool for educational purposes that tracks and visualizes Spotify friends' listening patterns. Features include activity heatmaps, user-specific dashboards, multi-threaded data collection, and a web interface. Implemented logging, error handling, and clean architecture patterns. (Educational project: not intended for commercial use or distribution)",
            link: {
                label: "GitHub",
                href: "https://github.com/erdemgunal/SpotifyFriendTracker",
            },
        },
        {
            title: "Hakkı Aranıyor",
            techStack: ["React", "TailwindCSS", "Framer Motion"],
            description: "Interactive mystery-solving game featuring multiple categories, advanced search functionality, and responsive design.",
            link: {
                label: "Hakkı Aranıyor",
                href: "https://hakki-araniyor.vercel.app",
            },
        },
        {
            title: "React Weather App",
            techStack: ["React", "TailwindCSS", "OpenWeather API"],
            description: "Modern weather application providing real-time forecasts and location-based updates with an intuitive interface.",
            link: {
                label: "Weather App",
                href: "https://github.com/erdemmgunal/reactstaj-weather-app",
            },
        },
    ],
    languages: [
        {
            name: "English",
            level: "Fluent",
        },
        {
            name: "Turkish",
            level: "Native",
        },
    ],
};