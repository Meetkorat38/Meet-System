import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getProject } from "@/lib/projects";
import { toProjectMarkdown } from "@/lib/agent-content";

/**
 * Markdown mirror of a case study, for agents that prefer plain text over HTML.
 *
 * Served under /md/ rather than as `/projects/<slug>.md`, because the page
 * route `/projects/$slug` matches a dotted segment first and would capture
 * "swiftee.md" as the slug. A trailing ".md" is accepted and stripped, so both
 * /md/projects/swiftee and /md/projects/swiftee.md resolve.
 */
export const Route = createFileRoute("/md/projects/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const project = getProject(params.slug.replace(/\.md$/, ""));
        if (!project) {
          return new Response("Not found\n", {
            status: 404,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }

        return new Response(toProjectMarkdown(project), {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
