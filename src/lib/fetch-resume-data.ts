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
        };
    };
    social?: Array<{
        name: string;
        url: string;
        iconKey: string;
    }>;
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
    community?: {
        items: Array<{
            title: string;
            description: string;
            period?: string;
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
            slug: string;
            title: string;
            description: string;
            label: string;
            year: string;
            techStack: string[];
            images: string[];
            links: {
                live: string | null;
                github: string;
            };
        }>;
    };
}

export interface ProjectData {
    title: string;
    slug: string;
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
    seoTitle?: string;
    seoDescription?: string;
    seoImage?: string;
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

export async function getProjectSlugs(): Promise<string[]> {
    const files = await fs.readdir(PROJECTS_DIR);
    return files
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace(/\.mdx$/, ''));
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectData | null> {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(fileContent);
        return { ...data, slug } as ProjectData;
    } catch {
        return null;
    }
}

const RESUME_PATH = path.join(process.cwd(), 'content', 'resume.mdx');

type ResumeProjectItemRaw = {
    slug: string;
    title: string;
    description: string;
    label: string;
    year: string;
    techStack: string[];
};

export async function fetchResumeData(): Promise<ResumeData> {
    const fileContent = await fs.readFile(RESUME_PATH, 'utf-8');
    const { data } = matter(fileContent);
    const raw = data as Omit<ResumeData, 'projects'> & {
        projects: Omit<ResumeData['projects'], 'items'> & {
            items: ResumeProjectItemRaw[];
        };
    };
    const items = await Promise.all(
        raw.projects.items.map(async (item) => {
            const project = await fetchProjectBySlug(item.slug);
            return {
                ...item,
                images: project?.images ?? [],
                links: project?.links ?? { live: null, github: '' },
            };
        })
    );
    return {
        ...raw,
        projects: { ...raw.projects, items },
    } as ResumeData;
}