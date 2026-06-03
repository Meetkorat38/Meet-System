import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToolPill } from "@/components/site/ToolPill";

type Automation = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric: string;
  flow: [string, string, string];
  problem: string;
  workflow: string;
  outcome: string;
};

const automations: Automation[] = [
  {
    title: "Lion Kitchen Panchang Video Automation",
    category: "AI Content Pipeline",
    description:
      "Daily Panchang videos generated automatically using mascot-driven AI content workflows.",
    tags: ["n8n", "OpenRouter", "ElevenLabs", "Video Generation"],
    metric: "Daily Automated Content",
    flow: ["Calendar", "AI Agent", "Video"],
    problem:
      "The brand needed daily mascot-driven Panchang videos but manual production was unsustainable at a daily cadence.",
    workflow:
      "Cron-triggered n8n workflow pulls the day's Panchang data, generates script via OpenRouter, synthesizes voice with ElevenLabs, composes the mascot video, and publishes to the brand's channels.",
    outcome:
      "A fully unattended daily video pipeline — zero manual touch from script to publish.",
  },
  {
    title: "650 Song Generation Pipeline",
    category: "Media Automation",
    description:
      "Bulk generation workflow for producing personalized audio assets at scale.",
    tags: ["n8n", "OpenAI", "Google Sheets"],
    metric: "650 Songs Generated",
    flow: ["Sheet", "AI", "Audio"],
    problem:
      "A single batch of 650 personalized song assets needed to be generated reliably without manual orchestration.",
    workflow:
      "n8n reads each row from Google Sheets, prompts OpenAI for the lyric/structure, calls the audio model, stores the output, and writes status back to the sheet with retries on failure.",
    outcome:
      "650 personalized audio assets generated end-to-end through a single durable workflow.",
  },
  {
    title: "600 Slide Generation System",
    category: "Content Automation",
    description:
      "Automated workflow for generating educational slide content in bulk.",
    tags: ["n8n", "AI", "Google Slides"],
    metric: "600+ Slides Created",
    flow: ["Topic", "AI", "Slides"],
    problem:
      "Producing 600+ educational slides by hand would take weeks and introduce inconsistency.",
    workflow:
      "n8n iterates a topic list, drafts slide content via LLM, then programmatically writes structured layouts into Google Slides templates with the brand's styling.",
    outcome:
      "600+ on-brand educational slides produced through a repeatable pipeline.",
  },
  {
    title: "WhatsApp Distributor Automation",
    category: "Operations Automation",
    description:
      "Automatically generated and distributed personalized creative assets to distributor networks.",
    tags: ["WhatsApp API", "Canvas", "Automation"],
    metric: "500+ Recipients",
    flow: ["CRM", "Canvas", "WhatsApp"],
    problem:
      "Marketing ops needed personalized creatives delivered to 500+ distributors per campaign — previously a multi-hour manual job.",
    workflow:
      "Canvas-based template engine renders one creative per distributor from CRM data, then the WhatsApp Business API dispatches each asset with delivery tracking.",
    outcome:
      "Campaign delivery collapsed from hours of manual work to a 2-click run.",
  },
  {
    title: "Lead Qualification Workflow",
    category: "AI Operations",
    description:
      "Qualification, scoring and routing workflow for inbound leads.",
    tags: ["OpenAI", "Webhook", "Automation"],
    metric: "Production Workflow",
    flow: ["Lead", "Agent", "CRM"],
    problem:
      "Inbound leads were sitting unqualified in a shared inbox, slowing sales response.",
    workflow:
      "Form webhook fires the workflow, an LLM extracts firmographics and intent, applies a scoring rubric, and routes hot leads to the right rep in the CRM with an enriched note.",
    outcome:
      "Every inbound lead is qualified, scored, and routed within seconds — no manual triage.",
  },
  {
    title: "Voice Call Analysis Pipeline",
    category: "Voice AI",
    description:
      "Call transcripts analyzed automatically to generate actionable insights.",
    tags: ["ElevenLabs", "Webhook", "AI Analysis"],
    metric: "Real-time Insights",
    flow: ["Audio", "AI", "Insight"],
    problem:
      "Sales and support calls held tons of insight, but no one had time to listen back and tag them.",
    workflow:
      "Calls are transcribed via ElevenLabs Scribe, an LLM extracts objections, sentiment, action items and key topics, and the structured output is pushed to the team's ops dashboard.",
    outcome:
      "Every call produces structured, searchable insights without any manual review.",
  },
  {
    title: "Content Repurposing Workflow",
    category: "AI Content",
    description:
      "Transform long-form content into multiple social media formats automatically.",
    tags: ["OpenAI", "Automation", "Content Pipeline"],
    metric: "Multi-format Output",
    flow: ["Content", "Workflow", "Distribution"],
    problem:
      "Long-form content was being published once and never adapted into the formats each platform actually rewards.",
    workflow:
      "A single source doc is parsed, then format-specific prompts generate Twitter threads, LinkedIn posts, short-form video scripts, and newsletter snippets in one run.",
    outcome:
      "One long-form piece reliably becomes a full multi-channel content drop.",
  },
  {
    title: "Internal Business Automation",
    category: "Internal Tool",
    description:
      "Operational workflow automation for repetitive business processes.",
    tags: ["n8n", "API", "Automation"],
    metric: "Hours Saved Weekly",
    flow: ["Input", "Workflow", "Output"],
    problem:
      "Recurring internal ops tasks were burning hours every week across multiple SaaS tools.",
    workflow:
      "n8n stitches the source systems together via APIs and webhooks, normalizes data, and writes the result back into the team's tools of record.",
    outcome:
      "Several hours of weekly manual work eliminated and replaced with reliable runs.",
  },
];

function MiniFlow({ steps }: { steps: [string, string, string] }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] text-subtle-foreground">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-card">
            <span className="h-1 w-1 rounded-full bg-foreground/60" />
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="text-muted-foreground/60">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

function AutomationCard({ a }: { a: Automation }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="group paper rounded-2xl border border-border p-5 flex flex-col transition-all duration-200 hover:border-foreground/20 hover:-translate-y-0.5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 rounded-full border border-border bg-card">
            {a.category}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {a.metric}
          </span>
        </div>

        <h3 className="mt-4 text-base font-medium leading-snug">{a.title}</h3>
        <p className="mt-2 text-sm text-subtle-foreground leading-relaxed">
          {a.description}
        </p>

        <div className="mt-4">
          <MiniFlow steps={a.flow} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {a.tags.map((t) => (
            <ToolPill key={t}>{t}</ToolPill>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Production
          </span>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Expand
            </button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {a.category} · {a.metric}
          </span>
          <DialogTitle className="text-xl">{a.title}</DialogTitle>
          <DialogDescription>{a.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <MiniFlow steps={a.flow} />
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Problem
            </p>
            <p className="mt-1.5 text-sm text-subtle-foreground leading-relaxed">
              {a.problem}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Workflow
            </p>
            <p className="mt-1.5 text-sm text-subtle-foreground leading-relaxed">
              {a.workflow}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Technologies
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {a.tags.map((t) => (
                <ToolPill key={t}>{t}</ToolPill>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Outcome
            </p>
            <p className="mt-1.5 text-sm text-subtle-foreground leading-relaxed">
              {a.outcome}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AutomationGallery() {
  return (
    <section
      id="automations"
      className="mx-auto max-w-6xl px-2 sm:px-4 pt-24 sm:pt-32"
    >
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          02 — Automation Gallery
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-medium">
          Things I&apos;ve shipped.
        </h2>
        <p className="mt-3 text-subtle-foreground text-base sm:text-lg">
          Over the past year I&apos;ve built dozens of AI workflows, automation
          systems, content pipelines, and operational tools. Here are a few
          examples currently running in production.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {automations.map((a) => (
          <AutomationCard key={a.title} a={a} />
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-muted-foreground text-center">
        Additional private client workflows and internal systems available upon
        request.
      </p>
    </section>
  );
}
