import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { toMarkdownFull } from "@/lib/agent-content";

export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(toMarkdownFull(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
          },
        }),
    },
  },
});
