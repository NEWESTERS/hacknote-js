import { defineCollection, z } from "astro:content";

const PublicationSchema = z.object({
  title: z.string(),
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  heroImage: z.string(),
  telegramPostId: z.string().optional(),
});

const articles = defineCollection({
  schema: PublicationSchema.extend({
    description: z.string(),
  }),
});

const videos = defineCollection({
  schema: PublicationSchema.extend({
    description: z.string(),
    url: z.string().url(),
    watchTime: z.string(),
  }),
});

export const collections = { articles, videos };
