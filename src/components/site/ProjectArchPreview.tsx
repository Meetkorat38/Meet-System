type Props = { steps: string[]; className?: string };

const palette: Record<string, string> = {
  Input: "bg-pill",
  Output: "bg-pill",
};

export function ProjectArchPreview({ steps, className = "" }: Props) {
  return (
    <div
      className={`paper rounded-2xl border border-border p-5 sm:p-6 ${className}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
        Architecture
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-lg border border-border bg-card font-mono text-xs ${palette[s] ?? ""}`}
            >
              {s}
            </div>
            {i < steps.length - 1 && (
              <span className="text-muted-foreground/60 text-sm">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
