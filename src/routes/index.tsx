import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Linkedin,
  FileDown,
  Sparkles,
  Zap,
  Layers,
  Target,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { HeroSection } from "@/components/site/HeroSection";
import { ProjectCard } from "@/components/site/ProjectCard";
import { AutomationGallery } from "@/components/site/AutomationGallery";
import { AboutSection } from "@/components/site/AboutSection";
import { Reveal } from "@/components/site/Reveal";
import { projects } from "@/lib/projects";
import { profile } from "@/lib/profile";

const SITE_TITLE = `${profile.name} — ${profile.title}`;
const SITE_DESC = profile.summary;

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

const visualVariants = ["video", "tools", "content", "screenshot"] as const;

const valueProps = [
  {
    icon: Layers,
    title: "Full-stack AI systems",
    desc: "Frontend, backend, APIs, databases, and automation workflows — not just API wrappers.",
  },
  {
    icon: Zap,
    title: "Production workflows",
    desc: "Durable orchestration with Inngest, n8n, and event-driven pipelines that run reliably at scale.",
  },
  {
    icon: Sparkles,
    title: "Media & voice AI",
    desc: "Video generation, voice cloning, SIP calling, OCR, and vision models stitched into real products.",
  },
  {
    icon: Target,
    title: "Business outcomes",
    desc: "Systems that reduce manual work and improve operational efficiency — built for real teams.",
  },
];

function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative">
        <div className="paper mx-auto max-w-6xl rounded-none sm:rounded-3xl border-x-0 sm:border-x border-y-0 sm:border-y border-border overflow-hidden">
          <SiteHeader />
          <HeroSection />
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32"
      >
        <Reveal>
          <div className="max-w-2xl">
            <p className="section-label">01 — Selected Projects</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
              Production AI systems, not demos.
            </h2>
            <p className="mt-3 text-subtle-foreground text-base sm:text-lg leading-relaxed">
              Real systems in production — orchestration, multiple AI providers,
              durable state, and measurable business outcomes.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-6 sm:space-y-8">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProjectCard
                project={p}
                index={i}
                variant={p.videoSrc ? "video" : visualVariants[i % visualVariants.length]}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <AboutSection />

      <AutomationGallery />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32">
        <Reveal>
          <div className="paper rounded-2xl border border-border p-8 sm:p-12">
            <div className="max-w-2xl">
              <p className="section-label">04 — What I Bring</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                Complete systems, not API demos.
              </h2>
              <p className="mt-4 text-subtle-foreground text-base leading-relaxed">
                {profile.whatIBring}
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {valueProps.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="interactive-card rounded-xl border border-border bg-card p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-subtle">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-subtle-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-32"
      >
        <Reveal>
          <div className="rounded-2xl border border-border bg-card px-6 sm:px-12 py-16 sm:py-20 text-center">
            <p className="section-label">05 — Contact</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight max-w-2xl mx-auto">
              Let&apos;s build production AI systems together.
            </h2>
            <p className="mt-4 text-subtle-foreground max-w-lg mx-auto leading-relaxed">
              {profile.careerGoal}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                Email Me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border bg-background text-sm font-medium hover:bg-pill-hover transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border bg-background text-sm font-medium hover:bg-pill-hover transition-colors"
              >
                <FileDown className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
