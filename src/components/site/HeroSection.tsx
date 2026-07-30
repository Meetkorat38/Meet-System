import { useEffect, useState } from "react";
import { ArrowRight, FileDown } from "lucide-react";
import { profile } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { WorkflowLine } from "@/components/site/WorkflowLine";

const PIPELINE_LOGS = [
  { id: "founder-video", label: "founder-video-pipeline", stages: ["script", "tts", "heygen", "b-roll", "publish"] },
  { id: "swiftee", label: "swiftee-educational", stages: ["topic", "images", "voice", "ffmpeg", "mp4"] },
  { id: "lead-qual", label: "lead-qualification", stages: ["chatbot", "otp", "voice-ai", "insights"] },
  { id: "autograde", label: "autograde-vision", stages: ["ocr", "extract", "grade", "qc", "report"] },
];

const MARQUEE_ITEMS = [
  "Inngest",
  "ElevenLabs",
  "HeyGen",
  "FFmpeg",
  "OpenRouter",
  "Supabase",
  "n8n",
  "Voice AI",
  "SIP Trunking",
  "AWS Bedrock",
  "FastAPI",
  "Vision LLM",
  "650+ Songs",
  "600+ Slides",
  "Production",
];

function PipelineTerminal() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIdx((s) => {
        const pipeline = PIPELINE_LOGS[activeIdx];
        if (s >= pipeline.stages.length - 1) {
          setActiveIdx((a) => (a + 1) % PIPELINE_LOGS.length);
          return 0;
        }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const pipeline = PIPELINE_LOGS[activeIdx];

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-foreground/8 to-transparent blur-sm" />
      <div className="relative rounded-2xl border border-foreground/10 bg-[oklch(0.12_0.01_265)] text-[oklch(0.92_0_0)] shadow-2xl overflow-hidden">
        {/* scanline */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,oklch(1_0_0)_2px,oklch(1_0_0)_4px)]" />

        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_145)] shadow-[0_0_8px_oklch(0.7_0.18_145/0.6)]" />
          <span className="font-mono text-[11px] text-white/50 tracking-wide">
            live · production pipelines
          </span>
          <span className="ml-auto font-mono text-[10px] text-white/30 tabular-nums">
            {new Date().toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>

        <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed min-h-[200px] sm:min-h-[220px]">
          <p className="text-white/35">
            <span className="text-white/50">$</span> orchestrator status --all
          </p>

          {PIPELINE_LOGS.map((p, i) => {
            const isActive = i === activeIdx;
            const isPast = i < activeIdx;
            const done = isPast || (isActive && stageIdx === p.stages.length - 1);

            return (
              <div
                key={p.id}
                className={`mt-2 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-40"}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      done
                        ? "text-[oklch(0.7_0.18_145)]"
                        : isActive
                          ? "text-[oklch(0.75_0.15_85)]"
                          : "text-white/30"
                    }
                  >
                    {done ? "✓" : isActive ? "●" : "○"}
                  </span>
                  <span className={isActive ? "text-white/90" : "text-white/50"}>
                    {p.label}
                  </span>
                  {isActive && !done && (
                    <span className="text-[oklch(0.75_0.15_85)] animate-pulse">
                      running
                    </span>
                  )}
                  {done && (
                    <span className="text-[oklch(0.7_0.18_145)]">done</span>
                  )}
                </div>

                {isActive && (
                  <div className="mt-1.5 pl-5 flex flex-wrap items-center gap-1">
                    {p.stages.map((stage, si) => (
                      <span key={stage} className="flex items-center gap-1">
                        <span
                          className={
                            si <= stageIdx
                              ? "text-white/80"
                              : "text-white/25"
                          }
                        >
                          {stage}
                        </span>
                        {si < p.stages.length - 1 && (
                          <span className="text-white/20">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <p className="mt-4 text-white/25 border-t border-white/5 pt-3">
            <span className="text-white/40">→</span>{" "}
            {projects.length} systems · {profile.stats[2].value} songs ·{" "}
            {profile.stats[3].value} slides · 0 demos
          </p>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="mt-10 -mx-6 sm:-mx-10 border-y border-border/60 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 font-mono text-[11px] text-muted-foreground uppercase tracking-widest"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <div className="relative px-6 sm:px-10 pt-10 sm:pt-14 pb-8 sm:pb-12">
      {/* centered identity */}
      <div className="text-center max-w-4xl mx-auto">
        <div
          className="mx-auto relative animate-fade-in"
          style={{ animationDelay: "0ms" }}
        >
          <img
            src={profile.avatar}
            alt={`${profile.name} — pixel portrait`}
            width={88}
            height={88}
            className="mx-auto h-[88px] w-[88px] rounded-2xl border border-border object-cover rotate-[-2deg] shadow-[4px_4px_0_oklch(0_0_0/0.08)] [image-rendering:pixelated]"
          />
        </div>

        <p
          className="mt-6 font-mono text-xs text-muted-foreground tracking-wide animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          {profile.name} · {profile.title}
        </p>

        <h1
          className="mt-5 text-[2.35rem] leading-[1.02] sm:text-[3.5rem] lg:text-[4.25rem] font-medium tracking-[-0.035em] text-balance animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          {profile.heroHeadline}
        </h1>

        <p
          className="mt-6 text-base sm:text-lg text-subtle-foreground leading-relaxed max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Founder video automation, educational AI video, lead qualification with
          Voice AI, paper grading with vision models — durable pipelines, not
          prompt demos.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 animate-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/88 transition-colors"
          >
            See the systems I&apos;ve shipped
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-border bg-card text-sm font-medium hover:bg-pill-hover transition-colors"
          >
            Hire me
          </a>
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border bg-card text-sm font-medium hover:bg-pill-hover transition-colors"
          >
            <FileDown className="h-4 w-4" />
            CV
          </a>
        </div>

        <p
          className="mt-5 font-mono text-[11px] text-muted-foreground animate-fade-up"
          style={{ animationDelay: "340ms" }}
        >
          Open to {profile.targetRoles.slice(0, 3).join(" · ")}
        </p>
      </div>

      {/* live terminal — scroll-stopper */}
      <div
        className="mt-14 sm:mt-16 max-w-3xl mx-auto animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        <PipelineTerminal />
      </div>

      <div
        className="mt-10 max-w-lg mx-auto animate-fade-up"
        style={{ animationDelay: "480ms" }}
      >
        <WorkflowLine
          steps={["Input", "AI Agent", "Workflow", "Review", "Output"]}
        />
      </div>

      <Marquee />
    </div>
  );
}
