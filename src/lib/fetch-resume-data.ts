import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fetchUmamiPathsPageviews } from '@/lib/umami-api';

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
    role?: string;
    contribution?: string;
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

/** Project list item shape used by Projects section and /projects page */
export type ProjectListItem = {
    slug: string;
    title: string;
    description: string;
    label: string;
    year: string;
    techStack: string[];
    images: string[];
    links: { live: string | null; github: string };
};

function projectDataToListItem(project: ProjectData | null): ProjectListItem | null {
    if (!project) return null;
    return {
        slug: project.slug,
        title: project.title,
        description: project.description,
        label: project.label,
        year: project.year,
        techStack: project.techStack ?? [],
        images: project.images ?? [],
        links: project.links ?? { live: null, github: '' },
    };
}

/**
 * Returns the top N projects by Umami pageviews (path /projects/:slug).
 * Used for the homepage Projects section. Falls back to all projects if Umami is not configured.
 */
export async function getTopProjectsByViews(limit: number = 4): Promise<ProjectListItem[]> {
    const slugs = await getProjectSlugs();
    const pathRows = await fetchUmamiPathsPageviews('allTime', { limit: 500, revalidate: 300 });

    const projectPathPrefix = '/projects/';
    const viewCountBySlug = new Map<string, number>();
    for (const row of pathRows) {
        const p = row.x;
        if (p.startsWith(projectPathPrefix) && p.length > projectPathPrefix.length) {
            const slug = p.slice(projectPathPrefix.length).replace(/\/$/, '');
            if (slug && slugs.includes(slug)) {
                const current = viewCountBySlug.get(slug) ?? 0;
                viewCountBySlug.set(slug, current + row.y);
            }
        }
    }

    const sortedSlugs = [...viewCountBySlug.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([s]) => s);

    if (sortedSlugs.length === 0) {
        const fallback = await getAllProjects();
        return fallback.slice(0, limit);
    }

    const items = await Promise.all(sortedSlugs.map((slug) => fetchProjectBySlug(slug)));
    return items
        .map(projectDataToListItem)
        .filter((item): item is ProjectListItem => item !== null);
}

/**
 * Returns all projects from content/projects (MDX), in slug order.
 * Used for the /projects listing page.
 */
export async function getAllProjects(): Promise<ProjectListItem[]> {
    const slugs = await getProjectSlugs();
    const items = await Promise.all(slugs.map((slug) => fetchProjectBySlug(slug)));
    return items
        .map(projectDataToListItem)
        .filter((item): item is ProjectListItem => item !== null);
}

const RESUME_PATH = path.join(process.cwd(), 'content', 'resume.mdx');

export async function fetchResumeData(): Promise<ResumeData> {
    const fileContent = await fs.readFile(RESUME_PATH, 'utf-8');
    const { data } = matter(fileContent);
    const raw = data as Omit<ResumeData, 'projects'>;
    const items = await getTopProjectsByViews(4);
    return {
        ...raw,
        projects: { items },
    } as ResumeData;
}