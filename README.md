# Hakkı Info — Personal Portfolio Site

Personal website showcasing projects, blog and resume. Built with Next.js, MDX-based content, dark/light theme and responsive layout.

## Features

- **Home:** Hero, About, Education, Languages, Community, Skills, Projects sections
- **Projects:** Project list and detail pages (case study format)
- **Blog:** Technical and personal posts in MDX (KaTeX, code blocks, GFM)
- **Contact:** Contact page and social links
- **Analytics:** Umami and Microsoft Clarity integration, page view charts
- **SEO:** Dynamic Open Graph, Twitter Card, sitemap, robots.txt

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Radix UI (Dialog, Slot), shadcn-style components
- **Content:** MDX (gray-matter frontmatter, react-markdown, rehype-pretty-code, remark-gfm, KaTeX)
- **Fonts:** Plus Jakarta Sans (headings + body), JetBrains Mono (code)
- **Theme:** next-themes (dark/light)

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

### Production build

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run check-updates` | List outdated packages |
| `npm run update-deps` | Update and reinstall dependencies |