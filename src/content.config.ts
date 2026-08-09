import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each dish = one signature creation.
// `category` drives gallery filtering and grouping.
const dishes = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/dishes',
  }),

  schema: z.object({
    title: z.string(),

    category: z.enum([
      'plated-dessert',
      'cake-entremet',
      'chocolate-showpieces',
      'viennoiserie',
    ]),

    flavorNote: z.string(),

    heroImage: z.string(),

    gallery: z.array(z.string()).default([]),

    year: z.number().optional(),

    featured: z.boolean().default(false),

    order: z.number().default(0),
  }),
});
// Resume-style work history. Rendered as a real timeline, since it IS
// a sequence (this is the one place numbered/dated markers are earned).
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    property: z.string(), // e.g. "Taj Mahal Palace, Mumbai"
    location: z.string().optional(),
    startDate: z.string(), // "2022-04"
    endDate: z.string().optional(), // omit if current
    current: z.boolean().default(false),
    summary: z.string(), // 1-2 sentence scope of role
    highlights: z.array(z.string()).default([]), // bullet achievements
    order: z.number().default(0),
  }),
});

const accolades = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/accolades' }),
  schema: z.object({
    title: z.string(), // "Best Pastry Display — Culinary Cup 2023"
    issuer: z.string(), // "Michelin Guide" / "Taj Group Internal Awards"
    year: z.number(),
    logo: z.string().optional(), // path under /public/images/press/
    link: z.string().url().optional(),
  }),
});

export const collections = { dishes, experience, accolades };
