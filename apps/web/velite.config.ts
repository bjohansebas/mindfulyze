import { defineCollection, defineConfig, s } from 'velite'

export const changelog = defineCollection({
  name: 'changelog',
  pattern: 'changelog/**/*.mdx',
  schema: s.object({
    title: s.string().min(1),
    publishedAt: s.string(),
    summary: s.string(),
    image: s.string().url().optional(),
    author: s.string(),
    slug: s.string(),
    content: s.markdown(),
  }),
})

export const legal = defineCollection({
  name: 'legal',
  pattern: 'legal/**/*.mdx',
  schema: s.object({
    title: s.string().min(1),
    updated: s.string(),
    slug: s.string(),
    content: s.markdown(),
  }),
})

export default defineConfig({
  output: {
    data: '.velite',
    clean: true,
  },
  collections: { legal, changelog },
})
