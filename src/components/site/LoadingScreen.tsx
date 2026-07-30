import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

const BOOT_STEPS = [
  "orchestrator.init",
  "pipelines.load",
  "assets.ready",
  "ui.mount",
];

const MIN_VISIBLE_MS = 900;
const FADE_MS = 600;

export function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setStepIdx((i) => (i + 1) % BOOT_STEPS.length);
    }, 420);
    return () => window.clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    const start = Date.now();
    let fadeTimer: number | undefined;

    const beginFade = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      fadeTimer = window.setTimeout(() => setPhase("fading"), wait);
    };

    if (document.readyState === "complete") {
      beginFade();
    } else {
      window.addEventListener("load", beginFade, { once: true });
    }

    const progressTimer = window.setInterval(() => {
      setProgress((p) => Math.min(p + 4, 92));
    }, 48);

    return () => {
      window.removeEventListener("load", beginFade);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      window.clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    setProgress(100);
    const removeTimer = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(removeTimer);
  }, [phase]);

  if (phase === "done") return null;

  const step = BOOT_STEPS[stepIdx];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        phase === "fading" && "opacity-0 scale-[1.02] pointer-events-none",
      )}
      aria-hidden={phase === "fading"}
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="paper absolute inset-0 opacity-80" aria-hidden />

      <div
        className={cn(
          "relative w-full max-w-sm px-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          phase === "fading" && "translate-y-2",
        )}
      >
        <div className="rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-[0_24px_48px_-24px_oklch(0_0_0/0.12)] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-subtle/60">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.18_145)] shadow-[0_0_8px_oklch(0.7_0.18_145/0.5)] animate-pulse" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-wide">
              boot · production systems
            </span>
          </div>

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-xl border border-border object-cover rotate-[-2deg] shadow-[3px_3px_0_oklch(0_0_0/0.06)] animate-splash-enter [image-rendering:pixelated]"
              />
              <div className="min-w-0">
                <p className="font-medium text-sm leading-tight">{profile.name}</p>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                  {profile.title}
                </p>
              </div>
            </div>

            <div className="mt-6 font-mono text-[11px] text-subtle-foreground">
              <span className="text-muted-foreground">$</span>{" "}
              <span className="text-foreground/80">{step}</span>
              <span className="inline-block w-2 animate-splash-cursor ml-0.5">▋</span>
            </div>

            <div className="mt-4 h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground/70 transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 font-mono text-[10px] text-muted-foreground tabular-nums">
              {progress}%
            </p>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Loading portfolio
        </p>
      </div>
    </div>
  );
}
