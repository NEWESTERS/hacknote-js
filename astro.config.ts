import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import { pagefind } from './integrations/pagefind';
import { remarkReadingTime } from './integrations/remarkReadingTime.mjs';
import expressiveCode from './integrations/expressiveCode.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://newesters.github.io',
  base: '/hacknote-js',
  integrations: [expressiveCode, mdx(), sitemap(), react(), pagefind()],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  },
  scopedStyleStrategy: 'where'
});
