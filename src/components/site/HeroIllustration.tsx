export function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent-soft/10 blur-2xl" />
      <svg
        viewBox="0 0 400 180"
        fill="none"
        className="relative w-full text-foreground/75"
        aria-hidden
      >
        {/* Central hub */}
        <rect
          x="165"
          y="65"
          width="70"
          height="50"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="var(--color-card)"
          className="drop-shadow-sm"
        />
        <text
          x="200"
          y="92"
          textAnchor="middle"
          className="fill-current text-[9px] font-mono"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          AI Agent
        </text>
        <circle cx="200" cy="105" r="3" fill="oklch(0.55 0.2 265)" className="animate-pulse" />

        {/* Input node */}
        <g>
          <rect x="30" y="75" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" fill="var(--color-card)" />
          <text x="58" y="96" textAnchor="middle" className="fill-current text-[8px] font-mono" style={{ fontFamily: "var(--font-mono)" }}>Input</text>
        </g>

        {/* Workflow node */}
        <g>
          <rect x="90" y="30" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" fill="var(--color-card)" />
          <text x="118" y="51" textAnchor="middle" className="fill-current text-[8px] font-mono" style={{ fontFamily: "var(--font-mono)" }}>Workflow</text>
        </g>

        {/* LLM node */}
        <g>
          <rect x="90" y="130" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" fill="var(--color-card)" />
          <text x="118" y="151" textAnchor="middle" className="fill-current text-[8px] font-mono" style={{ fontFamily: "var(--font-mono)" }}>LLM API</text>
        </g>

        {/* Output nodes */}
        <g>
          <rect x="310" y="45" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" fill="var(--color-card)" />
          <text x="338" y="66" textAnchor="middle" className="fill-current text-[8px] font-mono" style={{ fontFamily: "var(--font-mono)" }}>Video</text>
        </g>
        <g>
          <rect x="310" y="95" width="56" height="36" rx="6" stroke="currentColor" strokeWidth="1.2" fill="var(--color-card)" />
          <text x="338" y="116" textAnchor="middle" className="fill-current text-[8px] font-mono" style={{ fontFamily: "var(--font-mono)" }}>Voice</text>
        </g>

        {/* Animated connection paths */}
        <path d="M86 93 L165 90" stroke="oklch(0.55 0.2 265)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
        <path d="M146 48 L165 75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
        <path d="M146 148 L165 105" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
        <path d="M265 90 L310 63" stroke="oklch(0.55 0.2 265)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />
        <path d="M265 95 L310 113" stroke="oklch(0.55 0.2 265)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-60" />

        {/* Flow dots */}
        <circle cx="125" cy="90" r="2.5" fill="oklch(0.55 0.2 265)" style={{ animation: "pulse-soft 2s ease infinite" }} />
        <circle cx="285" cy="75" r="2.5" fill="oklch(0.55 0.2 265)" style={{ animation: "pulse-soft 2s ease infinite 0.5s" }} />
        <circle cx="285" cy="105" r="2.5" fill="oklch(0.55 0.2 265)" style={{ animation: "pulse-soft 2s ease infinite 1s" }} />
      </svg>
    </div>
  );
}
