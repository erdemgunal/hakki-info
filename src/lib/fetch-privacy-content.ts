import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const PRIVACY_PATH = path.join(process.cwd(), 'content', 'privacy.mdx');

export interface PrivacyFrontmatter {
    title: string;
    updated: string;
}

export interface PrivacyContent {
    frontmatter: PrivacyFrontmatter;
    content: string;
}

export async function fetchPrivacyContent(): Promise<PrivacyContent> {
    const fileContent = await fs.readFile(PRIVACY_PATH, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
        frontmatter: data as PrivacyFrontmatter,
        content,
    };
}
