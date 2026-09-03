import { ProjectAnimation, hasProjectAnimation } from "@/components/site/ProjectAnimation";

type Props = {
  label: string;
  variant?: "video" | "screenshot" | "tools" | "content";
  className?: string;
  videoSrc?: string;
  imageSrc?: string;
  videoControls?: boolean;
  animation?: string;
  /** When true, the animated diagram wins over video (cards stay consistent). */
  preferAnimation?: boolean;
};

export function ProjectVisual({
  label,
  variant = "screenshot",
  className = "",
  videoSrc,
  imageSrc,
  videoControls = false,
  animation,
  preferAnimation = false,
}: Props) {
  const showAnimationFirst = preferAnimation && hasProjectAnimation(animation);
  // Prefer real video when present; otherwise use thumbnail so the card
  // never looks empty. Mock UI is last-resort only.
  if (videoSrc && !showAnimationFirst) {
    return (
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_oklch(0_0_0_/_0.03),0_24px_48px_-20px_oklch(0_0_0_/_0.12)] ring-1 ring-foreground/5 ${className}`}
      >
        <div className="flex items-center gap-1.5 px-4 h-8 border-b border-border bg-subtle">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground truncate">
            {label.toLowerCase().replace(/\s+/g, "-")}.app
          </span>
        </div>
        <PortfolioVideo src={videoSrc} controls={videoControls} label={label} />
      </div>
    );
  }

  // An animated diagram outranks a static thumbnail, but never a real video.
  if (hasProjectAnimation(animation)) {
    return (
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_oklch(0_0_0_/_0.03),0_24px_48px_-20px_oklch(0_0_0_/_0.12)] ring-1 ring-foreground/5 ${className}`}
      >
        <div className="flex items-center gap-1.5 px-4 h-8 border-b border-border bg-subtle">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 font-mono text-[10px] text-muted-foreground truncate">
            {label.toLowerCase().replace(/\s+/g, "-")}.app
          </span>
        </div>
        <div className="h-[calc(100%-2rem)] w-full">
          <ProjectAnimation name={animation!} />
        </div>
      </div>
    );
  }

  if (imageSrc) {
    return (
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_oklch(0_0_0_/_0.03),0_24px_48px_-20px_oklch(0_0_0_/_0.12)] ring-1 ring-foreground/5 ${className}`}
      >
        <img
          src={imageSrc}
          alt={`${label} case study`}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_0_oklch(0_0_0_/_0.03),0_24px_48px_-20px_oklch(0_0_0_/_0.12)] ring-1 ring-foreground/5 ${className}`}
    >
      <div className="flex items-center gap-1.5 px-4 h-8 border-b border-border bg-subtle">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-3 font-mono text-[10px] text-muted-foreground truncate">
          {label.toLowerCase().replace(/\s+/g, "-")}.app
        </span>
      </div>

      {variant === "video" && <VideoMock />}
      {variant === "tools" && <ToolsMock />}
      {variant === "content" && <ContentMock />}
      {variant === "screenshot" && <ToolsMock />}
    </div>
  );
}

function PortfolioVideo({
  src,
  controls,
  label,
}: {
  src: string;
  controls: boolean;
  label: string;
}) {
  return (
    <video
      className="h-[calc(100%-2rem)] w-full bg-black object-cover"
      src={src}
      controls={controls}
      autoPlay={!controls}
      muted={!controls}
      loop={!controls}
      playsInline
      preload="metadata"
      aria-label={`${label} product showcase video`}
    />
  );
}

function VideoMock() {
  return (
    <div className="relative h-[calc(100%-2rem)] paper flex items-center justify-center">
      <div className="absolute inset-6 rounded-xl border border-border bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.02]" />
      <div className="relative z-10 flex items-center justify-center h-14 w-14 rounded-full bg-foreground/90 text-background">
        <svg viewBox="0 0 24 24" className="h-5 w-5 ml-0.5" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 right-4 h-1 rounded-full bg-foreground/10 overflow-hidden">
        <div className="h-full w-1/3 bg-foreground/60" />
      </div>
    </div>
  );
}

function ToolsMock() {
  return (
    <div className="h-[calc(100%-2rem)] grid grid-cols-12 grid-rows-6 gap-3 p-4 paper">
      <div className="col-span-3 row-span-6 rounded-lg border border-border bg-card p-3 space-y-2">
        <div className="h-2 w-3/4 rounded bg-foreground/10" />
        <div className="h-2 w-1/2 rounded bg-foreground/10" />
        <div className="mt-3 space-y-1.5">
          {[..."abcd"].map((k) => (
            <div key={k} className="h-5 rounded bg-foreground/[0.04]" />
          ))}
        </div>
      </div>
      <div className="col-span-9 row-span-2 rounded-lg border border-border bg-card p-3 flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-accent/20" />
        <div className="space-y-1.5">
          <div className="h-2 w-40 rounded bg-foreground/15" />
          <div className="h-2 w-24 rounded bg-foreground/10" />
        </div>
        <div className="ml-auto h-6 w-16 rounded-md bg-foreground/90" />
      </div>
      <div className="col-span-5 row-span-4 rounded-lg border border-border bg-card p-3 space-y-2">
        <div className="h-2 w-1/3 rounded bg-foreground/15" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent/70" />
            <div className="h-2 flex-1 rounded bg-foreground/[0.07]" />
          </div>
        ))}
      </div>
      <div className="col-span-4 row-span-4 rounded-lg border border-border bg-card p-3 space-y-2">
        <div className="h-2 w-1/2 rounded bg-foreground/15" />
        <div className="h-16 rounded bg-gradient-to-br from-foreground/[0.08] to-transparent" />
        <div className="flex gap-1.5">
          <div className="h-4 w-10 rounded bg-foreground/[0.06]" />
          <div className="h-4 w-10 rounded bg-foreground/[0.06]" />
        </div>
      </div>
    </div>
  );
}

function ContentMock() {
  return (
    <div className="h-[calc(100%-2rem)] paper p-6 grid grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-border bg-card p-3 space-y-2">
          <div className="h-16 rounded bg-foreground/[0.05]" />
          <div className="h-2 w-3/4 rounded bg-foreground/15" />
          <div className="h-2 w-1/2 rounded bg-foreground/10" />
          <div className="h-2 w-2/3 rounded bg-foreground/10" />
        </div>
      ))}
    </div>
  );
}
