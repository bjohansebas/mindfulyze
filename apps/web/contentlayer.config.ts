import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import GithubSlugger from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { HOME_DOMAIN, capitalize } from '@mindfulyze/utils'

export const ChangelogPost = defineDocumentType(() => ({
  name: 'ChangelogPost',
  filePathPattern: '**/changelog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    publishedAt: {
      type: 'string',
      required: true,
    },
    summary: {
      type: 'string',
      required: true,
    },
    // image: {
    //   type: 'string',
    //   required: true,
    // },
    author: {
      type: 'string',
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields('changelog'),
}))

// export const HelpPost = defineDocumentType(() => ({
//   name: 'HelpPost',
//   filePathPattern: '**/help/*.mdx',
//   contentType: 'mdx',
//   fields: {
//     title: {
//       type: 'string',
//       required: true,
//     },
//     updatedAt: {
//       type: 'string',
//       required: true,
//     },
//     summary: {
//       type: 'string',
//       required: true,
//     },
//     author: {
//       type: 'string',
//       required: true,
//     },
//     categories: {
//       type: 'list',
//       of: {
//         type: 'enum',
//         options: ['overview', 'getting-started', 'security'],
//         default: 'overview',
//       },
//       required: true,
//     },
//     related: {
//       type: 'list',
//       of: {
//         type: 'string',
//       },
//     },
//     excludeHeadingsFromSearch: {
//       type: 'boolean',
//     },
//   },
//   // @ts-ignore
//   computedFields: computedFields('help'),
// }))

export const LegalPost = defineDocumentType(() => ({
  name: 'LegalPost',
  filePathPattern: '**/legal/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    updatedAt: {
      type: 'string',
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields('legal'),
}))

const computedFields = (type: 'blog' | 'changelog' | 'help' | 'legal') => ({
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(`${type}/`, ''),
  },
  tableOfContents: {
    type: 'array',
    resolve: (doc) => {
      // get all markdown heading 2 nodes (##)
      const headings = doc.body.raw.match(/^##\s.+/gm)
      const slugger = new GithubSlugger()
      return (
        headings?.map((heading) => {
          const title = heading.replace(/^##\s/, '')
          return {
            title,
            slug: slugger.slug(title),
          }
        }) || []
      )
    },
  },
  images: {
    type: 'array',
    resolve: (doc) => {
      return doc.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) || []
    },
  },
  // tweetIds: {
  //   type: 'array',
  //   resolve: (doc) => {
  //     const tweetMatches = doc.body.raw.match(/<Tweet\sid="[0-9]+"\s\/>/g)
  //     return tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]) || []
  //   },
  // },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': `${capitalize(type)}Posting`,
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: doc.image,
      url: `${HOME_DOMAIN}/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
    }),
  },
})

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [ChangelogPost, LegalPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            'data-mdx-heading': '',
          },
        },
      ],
    ],
  },
})
