import { createApiCatalog } from "@jdevalk/astro-seo-graph";
import { SITE } from "@/config";

export const GET = createApiCatalog({
  siteUrl: SITE.website,
  schemaEndpoints: [
    { path: "/schema/post.json", schemaType: "BlogPosting", serviceDoc: "/" },
    { path: "/schema/page.json", schemaType: "WebPage", serviceDoc: "/" },
  ],
  schemaMap: { path: "/schemamap.xml", serviceDoc: "/" },
  additional: [
    { anchor: "/rss.xml", type: "https://www.w3.org/2005/Atom" },
    { anchor: "/sitemap-index.xml", type: "https://www.sitemaps.org/schemas/sitemap/0.9" },
  ],
});
