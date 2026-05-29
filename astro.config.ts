import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";
import fs from "node:fs";
import seoGraph from "@jdevalk/astro-seo-graph/integration";
import { gitLastmod } from "@jdevalk/astro-seo-graph";

const isProductionBuild =
  (process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH === "main") ||
  process.env.VERCEL_ENV === "production" ||
  process.env.CONTEXT === "production" ||
  process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
      serialize: (item) => {
        const url = new URL(item.url);
        const path = url.pathname;
        let filePath = "";

        if (path === "/" || path === "") {
          filePath = "src/pages/index.astro";
        } else if (path.startsWith("/posts/")) {
          const slug = path.replace(/^\/posts\/|\/$/g, "");
          filePath = `src/data/blog/${slug}.md`;
        } else {
          const cleanPath = path.replace(/\/$/, "");
          filePath = `src/pages${cleanPath}.astro`;
          if (!fs.existsSync(filePath)) {
            filePath = `src/pages${cleanPath}/index.astro`;
          }
        }

        if (fs.existsSync(filePath)) {
          const last = gitLastmod(filePath);
          if (last) {
            item.lastmod = last.toISOString();
          }
        }
        return item;
      },
    }),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) => href.startsWith("/api/"),
      },
      llmsTxt: {
        title: "Tùng.",
        siteUrl: SITE.website,
      },
      ...(isProductionBuild && {
        indexNow: {
          key: process.env.INDEXNOW_KEY || "dummykey1234567890",
          host: "9h30-zzz.blog",
          siteUrl: SITE.website,
        },
      }),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Roboto Mono",
        cssVariable: "--font-roboto-mono",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
    ],
  },
});
