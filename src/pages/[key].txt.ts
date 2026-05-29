import type { APIRoute } from "astro";

const key = process.env.INDEXNOW_KEY || "dummykey1234567890";

export async function getStaticPaths() {
  return [
    { params: { key } }
  ];
}

export const GET: APIRoute = ({ params }) => {
  return new Response(params.key, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
