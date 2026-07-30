import { useRef, useState } from "react";
import { Play, Pause, Music, FileText, LayoutDashboard, ImageIcon } from "lucide-react";
import type { AutomationAsset } from "@/lib/automations";
import { cn } from "@/lib/utils";

const DEMO_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const DEMO_AUDIO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function Waveform({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-foreground/30 origin-bottom",
            playing && "animate-waveform",
          )}
          style={{
            height: `${20 + ((i * 7) % 60)}%`,
            animationDelay: playing ? `${i * 0.05}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}

function VideoPreview({ asset }: { asset: AutomationAsset }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = asset.src ?? DEMO_VIDEO;
  const portrait = asset.aspect === "portrait";

  const toggle = async () => {
    const v = videoRef.current;
    if (!v || failed) return;
    if (v.paused) {
      try {
        await v.play();
        setPlaying(true);
      } catch {
        setFailed(true);
        setPlaying(false);
      }
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-xl overflow-hidden bg-[oklch(0.12_0.01_265)] border border-border",
        portrait ? "aspect-[9/16]" : "aspect-video",
      )}
    >
      {!failed ? (
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop
          onError={() => setFailed(true)}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-foreground/10 to-foreground/5">
          <Play className="h-8 w-8 text-muted-foreground/50" />
          <p className="font-mono text-[10px] text-muted-foreground px-4 text-center">
            {asset.label}
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <button
        type="button"
        onClick={toggle}
        className="absolute inset-0 flex items-center justify-center group"
        aria-label={playing ? "Pause" : "Play"}
      >
        <span
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg transition-transform group-hover:scale-105",
            playing && "opacity-0 group-hover:opacity-100",
          )}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </span>
      </button>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
        <span>{asset.label}</span>
        {asset.duration && <span>{asset.duration}</span>}
      </div>
    </div>
  );
}

function AudioPreview({ asset }: { asset: AutomationAsset }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = asset.src ?? DEMO_AUDIO;

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (failed) {
      setPlaying((p) => !p);
      return;
    }
    if (a.paused) {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setFailed(true);
        setPlaying(true);
      }
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {!failed && (
        <audio
          ref={audioRef}
          src={src}
          onError={() => {
            setFailed(true);
            setPlaying(true);
          }}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
      )}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate">{asset.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{asset.meta}</p>
          <div className="mt-3">
            <Waveform playing={playing || failed} />
          </div>
          {failed && (
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              Demo preview · add src in automations.ts for real audio
            </p>
          )}
        </div>
        {asset.duration && (
          <span className="font-mono text-xs text-muted-foreground shrink-0">
            {asset.duration}
          </span>
        )}
      </div>
    </div>
  );
}

function SlidesPreview({ asset }: { asset: AutomationAsset }) {
  if (asset.src) {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="aspect-video w-full bg-[oklch(0.16_0.01_265)]">
          <iframe
            src={asset.src}
            title={asset.label}
            className="h-full w-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2">
          <p className="text-xs font-medium truncate">{asset.label}</p>
          {asset.meta && (
            <p className="font-mono text-[10px] text-muted-foreground truncate shrink-0">
              {asset.meta}
            </p>
          )}
        </div>
      </div>
    );
  }

  const slides = [
    { title: "Intro", accent: "from-foreground/10" },
    { title: "Concept", accent: "from-foreground/15" },
    { title: "Example", accent: "from-foreground/8" },
    { title: "Summary", accent: "from-foreground/12" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {slides.map((s, i) => (
          <div
            key={s.title}
            className={cn(
              "aspect-[4/3] rounded-lg border border-border bg-gradient-to-br to-transparent p-3",
              s.accent,
              i === 0 && "ring-2 ring-foreground/20",
            )}
          >
            <div className="h-1.5 w-8 rounded bg-foreground/20" />
            <div className="mt-2 h-1.5 w-full rounded bg-foreground/10" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded bg-foreground/10" />
            <p className="mt-3 font-mono text-[9px] text-muted-foreground">{s.title}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center font-mono">{asset.label}</p>
    </div>
  );
}

function ImagePreview({ asset }: { asset: AutomationAsset }) {
  const [failed, setFailed] = useState(false);

  if (asset.src && !failed) {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <img
          src={asset.src}
          alt={asset.label}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-auto max-h-[460px] object-contain bg-[oklch(0.98_0_0)] dark:bg-[oklch(0.16_0.01_265)]"
        />
        <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2">
          <p className="text-xs font-medium truncate">{asset.label}</p>
          {asset.meta && (
            <p className="font-mono text-[10px] text-muted-foreground truncate shrink-0">
              {asset.meta}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[4/5] max-h-[280px] mx-auto w-full max-w-[220px] rounded-xl border border-border bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.02] p-4 flex flex-col">
      <div className="h-24 rounded-lg bg-foreground/[0.08] flex items-center justify-center">
        <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-2 w-3/4 rounded bg-foreground/15" />
        <div className="h-2 w-1/2 rounded bg-foreground/10" />
      </div>
      <div className="mt-auto pt-4 border-t border-border/60">
        <div className="h-6 w-full rounded bg-foreground/[0.06] flex items-center px-2">
          <span className="font-mono text-[8px] text-muted-foreground truncate">
            {asset.meta ?? "Personalized output"}
          </span>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview({ asset }: { asset: AutomationAsset }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{asset.label}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Status", "Count", "Rate"].map((label, i) => (
          <div key={label} className="rounded-lg border border-border bg-subtle/50 px-3 py-2">
            <p className="font-mono text-[9px] uppercase text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold tabular-nums mt-0.5">
              {i === 0 ? "Live" : i === 1 ? "650" : "98%"}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[0.9, 0.7, 0.5, 0.85].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground/40"
                style={{ width: `${w * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {asset.meta && (
        <p className="font-mono text-[10px] text-muted-foreground">{asset.meta}</p>
      )}
    </div>
  );
}

export function AutomationAssetPreview({ asset }: { asset: AutomationAsset }) {
  switch (asset.type) {
    case "video":
      return <VideoPreview asset={asset} />;
    case "audio":
      return <AudioPreview asset={asset} />;
    case "slides":
      return <SlidesPreview asset={asset} />;
    case "image":
      return <ImagePreview asset={asset} />;
    case "dashboard":
      return <DashboardPreview asset={asset} />;
    default:
      return null;
  }
}

export function AssetTypeIcon({ type }: { type: AutomationAsset["type"] }) {
  switch (type) {
    case "audio":
      return <Music className="h-3.5 w-3.5" />;
    case "slides":
      return <FileText className="h-3.5 w-3.5" />;
    case "dashboard":
      return <LayoutDashboard className="h-3.5 w-3.5" />;
    case "video":
      return <Play className="h-3.5 w-3.5" />;
    default:
      return <ImageIcon className="h-3.5 w-3.5" />;
  }
}

export function AutomationAssetStrip({
  assets,
  selectedId,
  onSelect,
}: {
  assets: AutomationAsset[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="scrollbar-minimal scrollbar-minimal-mobile-hide flex gap-2 overflow-x-auto overscroll-x-contain pb-1 touch-scroll">
      {assets.map((a) => (
        <button
          key={a.id}
          type="button"
          onClick={() => onSelect(a.id)}
          className={cn(
            "shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all text-xs",
            selectedId === a.id
              ? "border-foreground/30 bg-foreground text-background"
              : "border-border bg-card hover:bg-pill-hover",
          )}
        >
          <AssetTypeIcon type={a.type} />
          <span className="font-medium max-w-[120px] truncate">{a.label}</span>
        </button>
      ))}
    </div>
  );
}
