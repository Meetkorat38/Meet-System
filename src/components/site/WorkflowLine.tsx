type Props = {
  steps?: string[];
  className?: string;
};

export function WorkflowLine({
  steps = ["Input", "AI Agent", "Workflow", "Review", "Output"],
  className = "",
}: Props) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center justify-between gap-2 sm:gap-3">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
              <span className="font-mono text-[11px] sm:text-xs text-subtle-foreground whitespace-nowrap">
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="text-muted-foreground/50 text-xs">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="relative mt-3 h-px bg-border overflow-hidden rounded-full">
        <span
          className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent"
          style={{
            offsetPath: "path('M0,0 L1000,0')",
            animation: "flow-dot 4.5s linear infinite",
          }}
        />
        <span
          className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          style={{ animation: "flow-dot 4.5s linear infinite" }}
        />
      </div>
    </div>
  );
}
