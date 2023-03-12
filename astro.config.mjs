import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import customTheme from "./color-scheme.json";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://newesters.github.io",
  base: "/hacknote-js",
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    shikiConfig: {
      theme: customTheme,
    },
  },
});
