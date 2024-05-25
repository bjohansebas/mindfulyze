import { defineCollection, defineConfig, s } from 'velite'

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
  collections: { legal },
})
