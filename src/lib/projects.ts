export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tools: string[];
  proves: string[];
  flow: string[];
  role: string;
  status: string;
  problem: string;
  buildNotes: string[];
  result: string[];
  accent?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-video-automation",
    title: "AI Video Automation Workflow",
    summary:
      "Automated pipeline for generating, processing, and delivering videos with AI agents and media tooling.",
    description:
      "An end-to-end system that turns a prompt into a finished video. AI agents draft scripts, fetch assets, and queue jobs into a deterministic FFmpeg render pipeline with a human review step before delivery.",
    tools: ["OpenAI API", "FFmpeg", "n8n", "Node.js", "Cloudinary"],
    proves: [
      "AI agent workflow design",
      "Video processing pipeline",
      "Automation orchestration",
      "Media infrastructure",
    ],
    flow: ["Input", "AI Agent", "Assets", "Render", "FFmpeg", "Output"],
    role: "AI workflow builder",
    status: "Shipped",
    problem:
      "The old workflow required repeated manual steps across scripting, asset handling, rendering, review, and delivery — slow, error-prone, and hard to scale.",
    buildNotes: [
      "Used OpenAI for script and prompt generation",
      "Used FFmpeg for deterministic video processing",
      "Used n8n for orchestration and retries",
      "Used Cloudinary for media storage and CDN delivery",
      "Built a lightweight review step to keep output controllable",
    ],
    result: [
      "Reduced manual steps by ~80%",
      "Repeatable, predictable video output",
      "Cleaner review and delivery workflow",
    ],
  },
  {
    slug: "internal-ops-agent",
    title: "Internal Operations Agent",
    summary:
      "An internal tool that turns scattered operational tasks into a single AI-assisted command surface.",
    description:
      "A focused internal app where the team triggers, monitors, and approves workflows from one place. Backed by a small agent layer that routes requests to the right tool.",
    tools: ["Claude", "Next.js", "Node.js", "Postgres", "Webhooks"],
    proves: [
      "Internal tool design",
      "Agent routing logic",
      "Workflow observability",
      "Practical API integrations",
    ],
    flow: ["Request", "Agent", "Tool Router", "Queue", "Result"],
    role: "Product engineer",
    status: "Internal",
    problem:
      "Operations were spread across spreadsheets, scripts, and Slack threads. Nothing was observable and recovery from failures was painful.",
    buildNotes: [
      "Built a small agent that routes natural-language requests to tools",
      "Unified job history into a single dashboard",
      "Added retry, replay, and manual override controls",
      "Wired auth and audit trail from day one",
    ],
    result: [
      "Single surface for daily operations",
      "Visible history of every job",
      "Fewer dropped tasks and faster recovery",
    ],
  },
  {
    slug: "content-pipeline",
    title: "AI Content Pipeline",
    summary:
      "A reliable pipeline that turns raw inputs into ready-to-publish content across formats.",
    description:
      "Input a brief, get drafts, edits, assets, and scheduled posts. Built around a queue with checkpoints so humans stay in the loop where it matters.",
    tools: ["OpenAI API", "n8n", "Make", "Cloudinary", "Notion API"],
    proves: [
      "Multi-step AI orchestration",
      "Human-in-the-loop design",
      "Content infrastructure",
    ],
    flow: ["Brief", "AI Draft", "Edit", "Assets", "Schedule"],
    role: "Automation builder",
    status: "Prototype",
    problem:
      "Content production was bottlenecked on manual handoffs between writing, editing, asset prep, and scheduling.",
    buildNotes: [
      "Modeled the pipeline as a queue of small, restartable steps",
      "Used Notion as the source of truth for briefs and approvals",
      "Added inline review at the points that mattered most",
    ],
    result: [
      "Faster turnaround from brief to publish",
      "Consistent format and tone across pieces",
      "Clearer ownership for each step",
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
