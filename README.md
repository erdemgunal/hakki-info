# Hakki Info

A personal portfolio and resume site built with Next.js. Content is driven by MDX files for resume data and project case studies, with dark/light theme support and a responsive layout.

## Tech Stack

- **Framework:** Next.js 16
- **UI:** React 19, Tailwind CSS 4, Radix UI (Dialog, Slot), shadcn-style components
- **Content:** MDX with gray-matter for frontmatter, react-markdown for rendering
- **Fonts:** Schibsted Grotesk (headings), Oxygen (body), JetBrains Mono (code)
- **Theming:** next-themes

## Prerequisites

- Node.js 18+
- npm (or compatible package manager)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server               |
| `npm run build`| Production build               |
| `npm start`    | Start production server        |
| `npm run lint` | Run ESLint                     |
| `npm run lint:fix` | Run ESLint with auto-fix  |
| `npm run check-updates` | List outdated packages |
| `npm run update-deps`   | Update and reinstall deps  |

## Project Structure

```
src/
  app/
    (main)/           # Main site: layout, home, projects, blog
      layout.tsx      # Root layout, theme, header/footer
      page.tsx        # Home page
      projects/       # Projects list and [slug] detail pages
      blog/           # Blog list and [slug] detail pages
    (legal)/          # Legal pages (e.g. privacy)
  components/         # UI components, sections, layout
  contexts/           # React context (e.g. ResumeDataContext)
  hooks/              # Custom hooks (e.g. section visibility)
  lib/                # Data fetching, theme, utilities
content/
  data/
    resume.mdx        # Hero, about, education, skills, projects list, etc.
    projects/         # One MDX per project (frontmatter + optional body)
```

## Content

- **Resume data:** Edit `content/data/resume.mdx`. The YAML frontmatter defines hero, footer, about, education, languages, skills, and the list of projects (with slugs linking to project MDX files).
- **Projects:** Add or edit `.mdx` files in `content/data/projects/`. Each file’s frontmatter should include `title`, `slug`, `description`, `techStack`, `label`, `year`, `images`, and optional `links` (e.g. `live`, `github`). The `slug` must match the filename (without extension) or be set explicitly for the URL.

## License

Private. All rights reserved.
