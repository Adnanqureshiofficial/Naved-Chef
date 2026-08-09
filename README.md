# Pastry Chef Portfolio — Astro Scaffold

## Setup
```
npm install
npm run dev
```

## Structure
- `src/content/experience/` — resume timeline entries (one .md per role)
- `src/content/dishes/` — portfolio pieces (`category`: viennoiserie | plated-art | showpieces)
- `src/content/accolades/` — awards/press entries
- `src/components/` — homepage sections (Hero, Bio, ExperienceTimeline, PortfolioGallery, Accolades, Contact)
- `src/pages/index.astro` — homepage, assembles all sections
- `src/pages/creations/index.astro` — full portfolio with category filter buttons
- `src/pages/creations/[category]/index.astro` — category archive pages (auto-generated from the 3 categories)
- `src/pages/creations/[category]/[dish].astro` — individual dish pages (auto-generated from `src/content/dishes/`, one per entry — this is what SEO/press links point to)

## What's placeholder right now
Search the codebase for `TODO` — every instance is either:
1. Real content to swap in (chef name, bio text, real experience/dish entries)
2. An image path to fill in once photography is ready (`/public/images/...`)
3. `/public/cv.pdf` — drop the real CV PDF here; nav + contact section already link to it

## To add a new dish
Create a new `.md` file in `src/content/dishes/` with the frontmatter fields shown in
the existing samples. Setting `featured: true` also adds it to the homepage horizontal
gallery. The category archive page and individual dish page are generated automatically
via `getStaticPaths()` — no routing code to touch.

## To add a new experience entry
Same pattern in `src/content/experience/` — the timeline sorts by `order` and renders
dates automatically.

## Motion / performance notes
- GSAP + ScrollTrigger only initialize once the portfolio section scrolls near the
  viewport (see the `IntersectionObserver` in `PortfolioGallery.astro`), and are
  wrapped in `gsap.matchMedia()` so mobile and `prefers-reduced-motion` users get the
  plain stacked/wrapped layout with zero animation cost.
- Images should use Astro's `<Image />` from `astro:assets` once real photography is
  added, instead of plain `<img>` — swap this in when replacing the `TODO` image blocks.
- Fonts are self-hosted via `@fontsource` (already wired in `global.css`), no external
  font request.
