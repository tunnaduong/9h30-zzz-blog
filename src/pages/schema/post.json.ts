import { getCollection } from "astro:content";
import { createSchemaEndpoint } from "@jdevalk/astro-seo-graph";
import { buildArticle, buildWebPage, makeIds } from "@jdevalk/seo-graph-core";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";

const ids = makeIds({ siteUrl: SITE.website, personUrl: SITE.profile });

export const GET = createSchemaEndpoint({
  entries: () => getCollection("blog"),
  mapper: (post) => {
    const url = `${SITE.website.replace(/\/$/, "")}${getPath(post.id, post.filePath)}`;
    return [
      buildWebPage(
        {
          url,
          name: post.data.title,
          isPartOf: { "@id": ids.website },
          datePublished: post.data.pubDatetime,
          dateModified: post.data.modDatetime ?? undefined,
        },
        ids
      ),
      buildArticle(
        {
          url,
          isPartOf: { "@id": ids.webPage(url) },
          author: { "@id": ids.person },
          publisher: { "@id": ids.person },
          headline: post.data.title,
          description: post.data.description,
          datePublished: post.data.pubDatetime,
          dateModified: post.data.modDatetime ?? undefined,
        },
        ids,
        "BlogPosting"
      ),
    ] as any;
  },
});
