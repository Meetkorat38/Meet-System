export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      className="w-full max-w-md mx-auto text-foreground/80"
      aria-hidden
    >
      {/* desk */}
      <line x1="20" y1="120" x2="300" y2="120" stroke="currentColor" strokeWidth="1.2" />
      {/* laptop */}
      <rect x="120" y="70" width="80" height="50" rx="4" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="115" y1="120" x2="205" y2="120" stroke="currentColor" strokeWidth="1.2" />
      {/* person */}
      <circle cx="160" cy="48" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M145 70 Q160 56 175 70" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {/* node graph left */}
      <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="1.2" fill="var(--color-background)" />
      <circle cx="80" cy="30" r="4" stroke="currentColor" strokeWidth="1.2" fill="var(--color-background)" />
      <circle cx="85" cy="75" r="4" stroke="currentColor" strokeWidth="1.2" fill="var(--color-background)" />
      <line x1="56" y1="50" x2="76" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="56" y1="52" x2="81" y2="73" stroke="currentColor" strokeWidth="1" />
      {/* document right */}
      <rect x="240" y="30" width="46" height="56" rx="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="248" y1="44" x2="278" y2="44" stroke="currentColor" strokeWidth="1" />
      <line x1="248" y1="52" x2="272" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="248" y1="60" x2="278" y2="60" stroke="currentColor" strokeWidth="1" />
      <line x1="248" y1="68" x2="266" y2="68" stroke="currentColor" strokeWidth="1" />
      {/* connector lines */}
      <path d="M90 60 Q105 65 120 80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" fill="none" />
      <path d="M200 80 Q220 70 240 60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" fill="none" />
    </svg>
  );
}
