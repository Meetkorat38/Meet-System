import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { toMarkdownIndex } from "@/lib/agent-content";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(toMarkdownIndex(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
          },
        }),
    },
  },
});
