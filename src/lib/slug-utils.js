import slugify from 'slugify';

// Generate a URL-friendly slug from a title
export function generateSlug(title) {
  return slugify(title, {
    lower: true,          // Convert to lowercase
    strict: true,         // Remove special characters
    locale: 'tr',         // Use Turkish locale for proper character conversion
    trim: true            // Remove leading/trailing whitespace
  });
}

// Find a project by its slug
export function findProjectBySlug(projects, slug) {
  return projects.find(project => generateSlug(project.title) === slug);
}
