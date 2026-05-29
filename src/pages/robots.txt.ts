import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL, siteUrl: string) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
Schemamap: ${siteUrl}schemamap.xml

Content-Signal: ai-train=no, search=yes, ai-input=no
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL, site?.toString() || "https://9h30-zzz.blog/"));
};
