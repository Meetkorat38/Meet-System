import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { projects } from "@/lib/projects";
import { absolute } from "@/lib/site";

type Entry = { path: string; changefreq: string; priority: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);

        const entries: Entry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          ...projects.map((p) => ({
            path: `/projects/${p.slug}`,
            changefreq: "monthly",
            priority: "0.8",
          })),
          // Agent-facing mirrors — listed so crawlers discover them too.
          { path: "/llms.txt", changefreq: "weekly", priority: "0.6" },
          { path: "/llms-full.txt", changefreq: "weekly", priority: "0.6" },
          ...projects.map((p) => ({
            path: `/md/projects/${p.slug}.md`,
            changefreq: "monthly",
            priority: "0.5",
          })),
        ];

        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${absolute(e.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
