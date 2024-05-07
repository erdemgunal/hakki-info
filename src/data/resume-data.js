import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";

export const RESUME_DATA = {
    name: "<Hakki />",
    initials: "HAKKI",
    location: "Istanbul, Turkey",
    locationLink: "https://www.google.com/maps/place/Istanbul/",
    about:
        "Hello my name is Hakkı Erdem Günal. I'm 19 years old guy (who like to automate life and make things easier)",
    summary:
        "I am Erdem Günal, a physics student at Marmara University. Building Lego and solving problems has become not only a hobby but also a passion for me. I have 3 years of software experience and I am proficient in technologies such as Python, Javascript, Typescript, React, Next.js. I am passionate about automation and productivity improvement. At the same time, I aim to develop effective web applications by combining my interest in design tools and my visual design skills with my technical knowledge. Playing basketball helps me learn teamwork while building physical and mental endurance. I love building good relationships with people and understanding different perspectives. I stand out with my skills in being successful in projects that require cooperation and teamwork.",
    avatarUrl: "https://avatars.githubusercontent.com/u/65365648?v=4",
    personalWebsiteUrl: "",
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
            school: "TED Rönesans College",
            degree: "",
            start: "2018",
            end: "2019",
        },
        {
            school: "Istanbul Kadıkoy High School",
            degree: "",
            start: "2019",
            end: "2023",
        },
    ],
    work: [
        {
            company: "Monitorist",
            link: "https://monitorist.vercel.app/",
            badges: ["Owner"],
            start: "2021",
            end: "Present",
            description:
                "As the founder and primary operator of a cutting-edge platform within a Cookgroup, I have played a pivotal role in the development and execution of various responsibilities. The platform operates a sophisticated monitoring system, overseeing stock changes across more than 20 websites on a 24/7 basis.",
        },
        {
            company: "Hakkınızla Uçun",
            link: "http://hakkinizlaucun.vercel.app/",
            badges: ["Owner"],
            start: "2024",
            end: "Present",
            description:
                "This project filters the short-term round-trip and cheapest flights between Turkey and Europe for 2,3,4..7 days.",
        },
    ],
    certs: [
        {
            title: "0'dan ileri seviye'ye dijital pazarlama egitimi",
            link: "",
            start: "2024",
            end: "",
            description: "Rıdvan Aydın - Marmara University Sinerji Club",
        },
    ],
    skills: [
        "Python",
        "JavaScript",
        "TypeScript",
        "React/Next.js",
        "Photoshop",
        "Problem Solving",
        "System Automation",
        "Basketball",
    ],
    projects: [
        {
            title: "Monitorist",
            techStack: ["Python", "Javascript", "Next.js", "GraphQL"],
            description: "A platform to build and grow your business",
            link: {
                label: "Monitorist",
                href: "https://monitorist.vercel.app/",
            },
        },
        {
            title: "Hakkınızla Uçun",
            techStack: ["Next.js", "Html", "React", "Mongodb"],
            description:
                "This project is a web application that allows users to filter and list flight tickets based on various criteria. Users can find the flights they want with options such as duration, price range, departure and arrival cities. Developed using Next.js and React.",
            link: {
                label: "Hakkinizla Ucun",
                href: "https://github.com/erdemmgunal/hakkinizlaucun",
            },
        },
        {
            title: "Hakki info",
            techStack: ["Typescript", "Javascript", "CSS"],
            description:
                "Hakki.info is a personal resume website built using a technology stack that includes React, Next.js, Typescript, and CSS.",
            link: {
                label: "hakki info resume",
                href: "https://github.com/erdemmgunal/hakki-info",
            },
        },
        {
            title: "React Staj iWeather App",
            techStack: [
                "Javascript",
                "TailwindCSS",
                "React",
                "Axios",
                "OpenWeather API",
            ],
            description:
                "WeatherApp: Your go-to for easy, accurate weather updates. Check local forecasts or explore new locations effortlessly with our user-friendly interface. Stay informed effortlessly!",
            link: {
                label: "iWeather App",
                href: "http://reactstaj-iweather.vercel.app/",
            },
        },
        {
            title: "Idata Scraper",
            techStack: ["Python"],
            description:
                "Notifies you when an appointment is opened or someone else cancels it. (Education purposes only)",
            link: {
                label: "idata scraper",
                href: "https://github.com/erdemmgunal/idata-scraper/",
            },
        },
        {
            title: "Troy Monitor",
            techStack: ["Python", "SQL"],
            description:
                "The program notice you when an iPhone 15 availabile on the site.",
            link: {
                label: "troy monitor",
                href: "https://github.com/erdemmgunal/troy-monitor",
            },
        },
        {
            title: "Macmillan Scraper",
            techStack: ["Python"],
            description:
                "Program that extracts the PDF of the book whose PDF download access is not allowed. (Education purposes only)",
            link: {
                label: "macmillan scraper",
                href: "https://github.com/erdemmgunal/macmillan-education",
            },
        },
        {
            title: "Marti Client",
            techStack: ["Python"],
            description:
                "You can monitor and ring all MARTI company scooters, motorcycles and mopeds around you from a single screen. (Education purposes only)",
            link: {
                label: "marti client",
                href: "https://github.com/erdemmgunal/marti-scooter",
            },
        },
        {
            title: "BMW - MERCEDES Monitor",
            techStack: ["Python", "SQL"],
            description:
                "The program through which you can buy a BMW or MERCEDES at store price without going to the black market, through their website.",
            link: {
                label: "bmw mercedes",
                href: "https://github.com/erdemmgunal/bmw-mercedes-monitor",
            },
        },
        {
            title: "Biryere Scraper",
            techStack: ["Python", "MongoDB"],
            description:
                'Scraper from which information was obtained for the "According to Your Rights" project.',
            link: {
                label: "scraper",
                href: "https://github.com/erdemmgunal/hakkinizlaucun",
            },
        },
        {
            title: "Konusanlar Monitor",
            techStack: ["Python", "Sqlite3"],
            description:
                'A program that provides notifications via Discord when a "Konusanlar" ticket is released on the mobilet.com.',
            link: {
                label: "konusanlar monitor",
                href: "https://github.com/erdemmgunal/Konusanlar-Monitor",
            },
        },
    ],
    languages: [
        {
            name: "English",
            level: "Full professional competence",
        },
        {
            name: "Turkish",
            level: "Native language",
        },
    ],
};
