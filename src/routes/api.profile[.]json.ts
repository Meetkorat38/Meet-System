import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { toProfileJson } from "@/lib/agent-content";

export const Route = createFileRoute("/api/profile.json")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify(toProfileJson(), null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            // Browser-based agents fetch this cross-origin.
            "Access-Control-Allow-Origin": "*",
          },
        }),
    },
  },
});
