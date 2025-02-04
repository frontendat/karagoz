import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const commonSchema = z.object({
  navigation: z
    .union([
      z.boolean(),
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        sidebarTitle: z.string().optional(),
      }),
    ])
    .default(true),

  hideBreadcrumb: z.boolean().default(false).optional(),
  hideToc: z.boolean().default(false).optional(),
})

export default defineContentConfig({
  collections: {
    content_ar: defineCollection({
      type: 'page',
      source: {
        include: 'ar/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
    content_de: defineCollection({
      type: 'page',
      source: {
        include: 'de/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
  },
})
