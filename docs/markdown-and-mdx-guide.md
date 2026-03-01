# How to Use Markdown and MDX on This Portfolio

This guide describes how content is written and rendered on this site: blog posts and other MDX content use **Markdown** plus **MDX** (JSX in markdown), with **frontmatter** for metadata and **rehype-pretty-code** for code blocks.

## How This Project Uses MDX

This site does **not** use Next.js’s built-in `@next/mdx` (file-based MDX pages). Instead it uses:

- **next-mdx-remote** (RSC) to compile MDX from string content at request time
- **gray-matter** to parse YAML frontmatter from `.mdx` files
- Content files live under `content/blog/` (and similar); the app reads them with `fs`, strips frontmatter, and passes the body to `MDXRemote`

So you get “remote”/dynamic MDX: same Markdown + JSX features, with full control over frontmatter and where content lives. The [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx) calls out both local file-based MDX and this kind of server-fetched MDX.

---

## Frontmatter (YAML)

Every blog post under `content/blog/` must start with a YAML frontmatter block between `---` lines.

### Required and optional fields

| Field         | Required | Description |
|---------------|----------|-------------|
| `title`       | Yes      | Post title (used in SEO and UI). |
| `date`        | Yes      | Publish date (ISO-style string, e.g. `"2026-02-17"`). |
| `excerpt`     | Yes      | Short summary (SEO and listing pages). |
| `status`      | Yes      | `"published"` or `"draft"`. Only `published` posts are shown. |
| `tags`        | No       | Array of tags, e.g. `["physics", "dev"]`. |
| `lastUpdated` | No       | Last update date (ISO string). Shown as “Updated …” when different from `date`. |
| `images`      | No       | Array of image URLs for OG/social. Also supports a single `image` string. |

### Example

```yaml
---
title: "Your post title"
date: "2026-02-17"
lastUpdated: "2026-02-18"
excerpt: "One sentence summary for SEO and listings."
status: "published"
tags: ["learning", "physics", "dev"]
---
```

Optional hero/OG image:

```yaml
images: ["https://example.com/og.png"]
# or a single image:
# image: "https://example.com/og.png"
```

The first entry in `images` (or `image`) is used for Open Graph and the post header when present.

---

## Markdown and GFM

Standard Markdown and **GitHub Flavored Markdown** (GFM) are supported:

- **Bold** (`**text**`), *italic* (`*text*`)
- Links: `[label](url)` — external links open in a new tab with `rel="noopener noreferrer"`
- Lists (ordered and unordered)
- Headings `##`, `###`, etc.
- Tables
- Inline `code` and fenced code blocks (see below)
- `remark-breaks` is enabled, so single line breaks become `<br>` where appropriate

---

## Code Blocks

Code blocks use **rehype-pretty-code** (Shiki) with the **github-dark-dimmed** theme. They are wrapped in a custom `CodeBlock` component that provides copy, collapse, and line-wrap controls.

### Basic usage

Use fenced code blocks with an optional language identifier:

````md
```typescript
function greet(name: string) {
  return `Hello, ${name}!`;
}
```
````

Common language IDs: `typescript`, `ts`, `javascript`, `js`, `python`, `py`, `bash`, `json`, `html`, `css`, `tsx`, `jsx`, `sql`, `plaintext`.

### Highlighting specific lines

In the **meta string** of the opening fence, use curly braces with line numbers. Lines listed there get a highlighted style (e.g. background and left border).

- Single lines: `{1,3,5}`
- Ranges: `{1-5}` or mixed: `{1,3-5,8}`

Example: highlight lines 1–3 and 5:

````md
```typescript {1-3,5}
function example() {
  const x = 1;
  return x + 1;
}
// this line (5) is highlighted
```
````

### Block title (filename)

If your markdown/remark pipeline supports it, you can add a title in the meta string (e.g. `title="filename.ts"`). The site’s code block UI shows the language label; any title from the meta string would depend on rehype-pretty-code options and custom styling.

---

## Math (LaTeX)

Math is supported via **remark-math** and **rehype-katex** (KaTeX).

- **Inline math**: `$...$` or `\(...\)`  
  Example: `$\psi(x, t)$` or `\( E = mc^2 \)\)`
- **Display (block) math**: `$$...$$` or `\[...\]`  
  Example:

  ```md
  $$
  i\hbar \frac{\partial \psi}{\partial t} = \hat{H}\,\psi
  $$
  ```

KaTeX’s stylesheet is included on the blog so equations render correctly. Use standard LaTeX inside `$...$` and `$$...$$`.

---

## Custom MDX Components

You can use these components directly in `.mdx` content; they are provided via the blog’s `mdxComponents` map.

### Callout

Callouts for tips, warnings, and errors:

```mdx
<Callout type="info">
  Informational note. Use for “good to know” or extra context.
</Callout>

<Callout type="warning">
  Warning or caveat.
</Callout>

<Callout type="error">
  Error or critical warning.
</Callout>
```

`type` must be one of: `info`, `warning`, `error`. Default is `info`.

### BlogImage

For images with optional caption and explicit dimensions (better for layout and LCP):

```mdx
<BlogImage
  src="/path/to/image.jpg"
  alt="Description for accessibility and caption"
  caption="Optional caption below the image"
  width={900}
  height={500}
/>
```

- `src`: path or URL (must be allowed in `next.config` `images.remotePatterns` if external).
- `alt`: required; also used as caption when `caption` is omitted.
- `caption`: optional text below the image.
- `width` / `height`: optional; default 900×500. Used for layout and aspect ratio.

Regular Markdown images (`![alt](url)`) also work; they are rendered with the same styling and lazy loading.

---

## File Location and Naming

- **Blog posts**: `content/blog/<slug>.mdx`. The URL is `/blog/<slug>` (no `.mdx` in the URL).
- **Projects**: `content/projects/<slug>.mdx` (used by the projects/resume flow).
- **Other**: `content/resume.mdx`, `content/privacy.mdx`, etc.

Only `.mdx` files under the blog directory are listed as posts; each file’s `status` must be `"published"` to appear in the blog index and sitemap.

---

## Summary

| Feature        | How to use it |
|----------------|----------------|
| **Frontmatter** | YAML between `---` at the top; `title`, `date`, `excerpt`, `status` required. |
| **Code blocks** | Fenced with ` ```language `; optional `{1,3-5}` for line highlighting. |
| **Inline code** | Backticks: `` `code` ``. |
| **Math**        | Inline: `$...$`; block: `$$...$$`. |
| **Callouts**    | `<Callout type="info|warning|error">...</Callout>`. |
| **Images**     | Markdown `![alt](url)` or `<BlogImage src="..." alt="..." />`. |

The stack (next-mdx-remote, gray-matter, remark/rehype plugins, and custom components) is aligned with Next.js’s guidance for dynamic/remote MDX and gives you full control over frontmatter and rendering without using `@next/mdx` or file-based MDX routes.
