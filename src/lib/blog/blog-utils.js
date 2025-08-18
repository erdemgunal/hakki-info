import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Ensure blog directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export async function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process markdown content
    const processedContent = await remark()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);
    
    const htmlContent = processedContent.toString();
    const readingStats = readingTime(content);

    return {
      slug,
      content: htmlContent,
      readingTime: readingStats.text,
      ...data,
      // Ensure date is serializable
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const readingStats = readingTime(content);

        return {
          slug,
          readingTime: readingStats.text,
          ...data,
          // Ensure date is serializable
          date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return allPostsData;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getAllPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

export function getPostsByTag(tag) {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
}

export function getAllTags() {
  const allPosts = getAllPosts();
  const tags = new Set();
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  
  return Array.from(tags).sort();
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured === true);
}

export function getRelatedPosts(currentSlug, tags = [], limit = 3) {
  const allPosts = getAllPosts();
  
  // Filter out current post and find posts with matching tags
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const matchingTags = post.tags ? post.tags.filter(tag => tags.includes(tag)).length : 0;
      return { ...post, matchingTags };
    })
    .sort((a, b) => {
      // Sort by matching tags first, then by date
      if (a.matchingTags !== b.matchingTags) {
        return b.matchingTags - a.matchingTags;
      }
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, limit);

  return relatedPosts;
}
