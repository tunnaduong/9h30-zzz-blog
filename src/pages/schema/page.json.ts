import { createSchemaEndpoint } from "@jdevalk/astro-seo-graph";
import { buildWebPage, makeIds } from "@jdevalk/seo-graph-core";
import { SITE } from "@/config";

const ids = makeIds({ siteUrl: SITE.website, personUrl: SITE.profile });

interface PageEntry {
  id: string;
  title: string;
  description: string;
  url: string;
}

const staticPages: PageEntry[] = [
  {
    id: "home",
    title: SITE.title,
    description: SITE.desc,
    url: SITE.website,
  },
  {
    id: "about",
    title: `About | ${SITE.title}`,
    description: "Thông tin giới thiệu về Tùng và blog 9h30-zzz.",
    url: `${SITE.website.replace(/\/$/, "")}/about`,
  },
  {
    id: "search",
    title: `Search | ${SITE.title}`,
    description: "Tìm kiếm các bài viết trên blog.",
    url: `${SITE.website.replace(/\/$/, "")}/search`,
  },
];

export const GET = createSchemaEndpoint({
  entries: () => Promise.resolve(staticPages),
  mapper: (page) => {
    return [
      buildWebPage(
        {
          url: page.url,
          name: page.title,
          isPartOf: { "@id": ids.website },
          description: page.description,
        },
        ids
      ),
    ] as any;
  },
});
