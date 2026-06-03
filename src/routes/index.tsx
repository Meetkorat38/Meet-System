import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Linkedin, FileDown } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { HeroIllustration } from "@/components/site/HeroIllustration";
import { WorkflowLine } from "@/components/site/WorkflowLine";
import { ToolPill } from "@/components/site/ToolPill";
import { ProjectVisual } from "@/components/site/ProjectVisual";
import { AutomationGallery } from "@/components/site/AutomationGallery";

import { projects } from "@/lib/projects";

const SITE_TITLE = "Meet Korat — Applied AI Engineer";
const SITE_DESC =
  "I ship production AI systems that automate real business operations — durable multi-provider pipelines, vision-LLM workflows, and internal tools used in the loop.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const visualVariants = ["video", "tools", "content"] as const;

const experience = [
  {
    role: "Applied AI / Automation Engineer",
    org: "Independent · client engagements",
    period: "2024 — Present",
    desc: "Shipped durable multi-provider AI pipelines on Inngest + Supabase Edge Functions: a founder-video production backend (6 AI providers, ~6 min/video), an end-to-end Hindi/Hinglish video pipeline (~2.2k LOC durable workflow), and a vision-LLM exam grader with self-consistency + arithmetic QC.",
  },
  {
    role: "Product Engineer",
    org: "Independent",
    period: "2023 — 2024",
    desc: "Built internal tools for marketing ops and distributor networks — typed RPC on Cloudflare Workers, RLS-scoped Postgres, Google Drive automation with stable-URL upserts. Hours per campaign collapsed to a 2-click run.",
  },
];

const toolGroups = [
  {
    group: "AI Orchestration",
    items: [
      "Inngest",
      "Lovable AI Gateway",
      "Gemini 2.5 Pro / Flash",
      "GPT-5",
      "Function calling",
      "Self-consistency",
    ],
  },
  {
    group: "AI Providers",
    items: [
      "ElevenLabs TTS + Scribe",
      "HeyGen",
      "KIE Grok-Imagine",
      "Kie.ai",
      "Submagic",
      "Rendi (FFmpeg)",
    ],
  },
  {
    group: "Backend & Runtime",
    items: [
      "Supabase (Postgres + RLS + Auth + Storage + Realtime + Edge)",
      "Cloudflare Workers",
      "TanStack Start",
      "Deno Edge Functions",
      "Node.js",
      "Webhooks",
    ],
  },
  {
    group: "Frontend",
    items: ["React 18 / 19", "TypeScript", "Tailwind", "shadcn/ui", "Fabric.js", "react-pdf"],
  },
  {
    group: "Media",
    items: ["FFmpeg", "Remotion", "Rendi", "Canvas rendering"],
  },
];

const targetRoles = [
  "Applied AI Engineer",
  "AI Automation Engineer",
  "AI Product Engineer",
  "Founding Engineer",
  "Solutions Engineer",
];

function Home() {
  return (
    <main className="min-h-screen px-3 sm:px-6 py-4 sm:py-6">
      {/* Hero shell */}
      <section className="paper mx-auto max-w-6xl rounded-3xl border border-border overflow-hidden">
        <SiteHeader />

        <div className="px-6 sm:px-10 py-14 sm:py-20 text-center max-w-3xl mx-auto">
          <div
            className="mx-auto h-20 w-20 rounded-full border border-border bg-card overflow-hidden flex items-center justify-center font-mono text-2xl text-subtle-foreground animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            MK
          </div>
          <p
            className="mt-5 font-mono text-xs text-subtle-foreground animate-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            Meet Korat · Applied AI Engineer
          </p>
          <h1
            className="mt-4 text-[38px] leading-[1.05] sm:text-6xl font-medium tracking-tight animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            I build production AI systems that automate real business operations.
          </h1>
          <p
            className="mt-5 text-base sm:text-lg text-subtle-foreground leading-relaxed max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: "220ms" }}
          >
            Durable multi-provider pipelines, vision-LLM workflows, and internal
            tools that ship — built on Inngest, Supabase, Edge Functions, and
            the modern LLM stack.
          </p>
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              See the systems I&apos;ve shipped
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card text-sm font-medium hover:bg-pill-hover transition-colors"
            >
              Hire me
            </a>
          </div>

          <p
            className="mt-5 font-mono text-[11px] text-muted-foreground animate-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            Open to: {targetRoles.join(" · ")}
          </p>

          <div
            className="mt-12 animate-fade-up"
            style={{ animationDelay: "420ms" }}
          >
            <HeroIllustration />
            <div className="mt-6 max-w-md mx-auto">
              <WorkflowLine
                steps={["Input", "AI Agent", "Workflow", "Review", "Output"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section
        id="projects"
        className="mx-auto max-w-6xl px-2 sm:px-4 pt-24 sm:pt-32"
      >
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            01 — Selected Projects
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium">
            Production AI systems, not demos.
          </h2>
          <p className="mt-3 text-subtle-foreground text-base sm:text-lg">
            Each project below is a real system in production: orchestration,
            multiple AI providers, durable state, and a real business outcome.
          </p>
        </div>

        <div className="mt-12 space-y-20">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div
                className={`lg:col-span-7 group ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <ProjectVisual
                    label={p.title}
                    variant={visualVariants[i % visualVariants.length]}
                  />
                </div>
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Project 0{i + 1} · {p.category}
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-medium">
                  {p.title}
                </h3>
                <p className="mt-3 text-subtle-foreground leading-relaxed">
                  {p.oneLiner}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3">
                  {p.metrics.slice(0, 4).map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-border bg-card px-3 py-2.5"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {m.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tools.slice(0, 6).map((t) => (
                    <ToolPill key={t}>{t}</ToolPill>
                  ))}
                </div>

                <ul className="mt-5 space-y-1.5 text-sm text-subtle-foreground">
                  {p.proves.map((s) => (
                    <li key={s} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="mt-6 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors group/btn"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AutomationGallery />

      {/* Experience + Tools */}
      <section className="mx-auto max-w-6xl px-2 sm:px-4 pt-24 sm:pt-32">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            03 — Background
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium">
            Experience &amp; Stack
          </h2>
          <p className="mt-3 text-subtle-foreground text-base sm:text-lg">
            What I&apos;ve shipped, and the production AI stack I work in daily.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Experience
            </h3>
            <ol className="mt-6 space-y-8 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-border">
              {experience.map((e) => (
                <li key={e.role} className="relative pl-7">
                  <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-foreground" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">{e.role}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {e.period}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-subtle-foreground mt-0.5">
                    {e.org}
                  </p>
                  <p className="mt-2 text-sm text-subtle-foreground leading-relaxed">
                    {e.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Production AI Stack
            </h3>
            <div className="mt-6 space-y-7">
              {toolGroups.map((g) => (
                <div key={g.group}>
                  <p className="text-sm font-medium">{g.group}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <ToolPill key={t}>{t}</ToolPill>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-2 sm:px-4 pt-24 sm:pt-32">
        <div className="paper rounded-3xl border border-border px-6 sm:px-12 py-16 sm:py-24 text-center">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            03 — Contact
          </p>
          <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-tight max-w-2xl mx-auto">
            Looking for an engineer who ships production AI systems?
          </h2>
          <p className="mt-4 text-subtle-foreground max-w-lg mx-auto">
            Open to Applied AI, AI Automation, AI Product, Founding Engineer,
            and Solutions Engineer roles. Full-time or contract.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="mailto:meet@example.com"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card text-sm font-medium hover:bg-pill-hover transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card text-sm font-medium hover:bg-pill-hover transition-colors"
            >
              <FileDown className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
