import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface ResumeData {
    hero: {
        name: string;
        title: string;
        email: string;
        location: string;
        profileImage: string;
        summary: string;
        downloadCv: string;
        contact: {
            phone: string;
            social: Array<{
                name: string;
                url: string;
                iconKey: string;
            }>;
        };
    };
    footer: {
        brand: {
            name: string;
            description: string;
        };
        quickLinks: {
            title: string;
            links: Array<{
                href: string;
                text: string;
            }>;
        };
        contact: {
            title: string;
        };
    };
    about: {
        title: string;
        description: string;
    };
    education: {
        title: string;
        items: Array<{
            degree: string;
            school: string;
            start: string;
            end: string;
        }>;
    };
    languages: {
        title: string;
        items: Array<{
            name: string;
            level: string;
        }>;
    };
    skills: {
        title: string;
        technical: Array<{
            name: string;
            skills: Array<{
                name: string;
            }>;
        }>;
        soft: Array<{
            name: string;
        }>;
    };
    projects: {
        title: string;
        viewMoreButtonText: string;
        viewProjectText: string;
        items: Array<{
            title: string;
            description: string;
            problem: string;
            solution: string;
            result: string;
            techStack: string[];
            label: string;
            year: string;
            images: string[];
            links: {
                live: string | null;
                github: string;
            };
        }>;
    };
}

const RESUME_PATH = path.join(process.cwd(), 'content', 'data', 'resume.md');

export async function fetchResumeData(): Promise<ResumeData> {
    const fileContent = await fs.readFile(RESUME_PATH, 'utf-8');
    const { data } = matter(fileContent);
    return data as ResumeData;
}

