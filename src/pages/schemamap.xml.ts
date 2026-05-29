import { createSchemaMap } from "@jdevalk/astro-seo-graph";
import { SITE } from "@/config";

export const GET = createSchemaMap({
  siteUrl: SITE.website,
  entries: [
    { path: "/schema/post.json", lastModified: new Date() },
    { path: "/schema/page.json", lastModified: new Date() },
  ],
});
