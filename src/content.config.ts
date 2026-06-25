import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  category: z.string().default('Geral'),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

const articleSchema = baseSchema.extend({
  section: z.string().default('Biblioteca'),
});

export const collections = {
  arquetipos: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/arquetipos' }),
    schema: baseSchema,
  }),
  simbolos: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/simbolos' }),
    schema: baseSchema,
  }),
  figuras: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/figuras' }),
    schema: baseSchema,
  }),
  artigos: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
    schema: articleSchema,
  }),
};
