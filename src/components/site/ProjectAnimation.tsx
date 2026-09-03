/**
 * Animated SVG case-study visuals.
 *
 * These stand in for screenshots on projects whose real UI cannot be shown.
 * They are deliberately built from the same parts as the rest of the site —
 * hairline borders, card fills, mono micro-labels, near-zero chroma — so they
 * read as diagrams rather than decoration.
 *
 * Pure CSS animation on inline SVG: no JS, no canvas, renders server-side, and
 * every value comes from a theme token so light and dark both work. One shared
 * 9s loop drives every element; each keyframe returns to its starting value so
 * the cycle is seamless. Under prefers-reduced-motion the whole thing settles
 * into its finished state and stops.
 */

const LOOP = "9s";

type Props = { name: string; className?: string };

export function ProjectAnimation({ name, className = "" }: Props) {
  if (name === "cg-sanchar") return <CgSanchar className={className} />;
  if (name === "foresight") return <Foresight className={className} />;
  if (name === "swiftee") return <Swiftee className={className} />;
  if (name === "lead-qualification") return <LeadQualification className={className} />;
  if (name === "autograde") return <AutoGrade className={className} />;
  return null;
}

/** True when a project has an animated visual available. */
export const hasProjectAnimation = (name?: string) =>
  name === "cg-sanchar" ||
  name === "foresight" ||
  name === "swiftee" ||
  name === "lead-qualification" ||
  name === "autograde";

function CgSanchar({ className = "" }: { className?: string }) {
  // Trunk out of the compose card, then one branch per channel tile.
  const p1 = "M295,168 L392,168 C440,168 452,101 508,101";
  const p2 = "M295,168 L392,168 C440,168 452,196 508,196";
  const p3 = "M295,168 L392,168 C440,168 452,291 508,291";

  return (
    <div className={`h-full w-full ${className}`}>
      <style>{css}</style>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid meet"
        className="cgs h-full w-full"
        role="img"
        aria-label="One creative is composed, captioned, reviewed, then broadcast to each state channel over a signed upload."
      >
        <rect x="0" y="0" width="640" height="400" fill="var(--subtle)" />

        {/* ---- compose card ---------------------------------------- */}
        <g className="cgs-card">
          <rect
            x="36"
            y="84"
            width="252"
            height="168"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* branded header strip — wipes in */}
          <clipPath id="cgs-hdr">
            <rect x="50" y="98" width="224" height="26" rx="6" />
          </clipPath>
          <g clipPath="url(#cgs-hdr)">
            <rect
              x="50"
              y="98"
              width="224"
              height="26"
              className="cgs-header"
              fill="var(--foreground)"
              opacity="0.14"
            />
          </g>
          <rect
            x="50"
            y="98"
            width="224"
            height="26"
            rx="6"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* image placeholder */}
          <g className="cgs-thumb">
            <rect
              x="50"
              y="136"
              width="92"
              height="72"
              rx="8"
              fill="var(--subtle)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <circle cx="70" cy="156" r="6" fill="var(--muted-foreground)" opacity="0.5" />
            <path
              d="M56,200 L82,172 L104,200 Z M100,200 L116,182 L134,200 Z"
              fill="var(--muted-foreground)"
              opacity="0.45"
            />
          </g>

          {/* caption lines — draw left to right, one after another */}
          <g>
            <rect
              x="156"
              y="140"
              width="118"
              height="7"
              rx="3.5"
              className="cgs-l1"
              fill="var(--foreground)"
              opacity="0.5"
            />
            <rect
              x="156"
              y="158"
              width="104"
              height="7"
              rx="3.5"
              className="cgs-l2"
              fill="var(--foreground)"
              opacity="0.36"
            />
            <rect
              x="156"
              y="176"
              width="74"
              height="7"
              rx="3.5"
              className="cgs-l3"
              fill="var(--foreground)"
              opacity="0.28"
            />
            <rect
              x="156"
              y="196"
              width="52"
              height="7"
              rx="3.5"
              className="cgs-l4"
              fill="var(--muted-foreground)"
              opacity="0.4"
            />
          </g>

          {/* review stamp */}
          <g className="cgs-review">
            <circle
              cx="256"
              cy="228"
              r="14"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M249,228 L254,233 L264,222"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cgs-tick"
              pathLength={1}
            />
          </g>
        </g>

        {/* ---- connectors ------------------------------------------ */}
        <g fill="none" stroke="var(--border)" strokeWidth="1.5">
          <path d={p1} />
          <path d={p2} />
          <path d={p3} />
        </g>

        {/* signed-upload marker on the trunk */}
        <g className="cgs-lock">
          <rect
            x="332"
            y="150"
            width="30"
            height="24"
            rx="7"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M342,158 a5,5 0 0 1 10,0"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect
            x="341"
            y="158"
            width="12"
            height="10"
            rx="2.5"
            fill="var(--muted-foreground)"
            opacity="0.75"
          />
        </g>

        {/* travelling packets */}
        <circle
          r="4.5"
          className="cgs-dot cgs-dot1"
          fill="var(--foreground)"
          style={{ offsetPath: `path('${p1}')` }}
        />
        <circle
          r="4.5"
          className="cgs-dot cgs-dot2"
          fill="var(--foreground)"
          style={{ offsetPath: `path('${p2}')` }}
        />
        <circle
          r="4.5"
          className="cgs-dot cgs-dot3"
          fill="var(--foreground)"
          style={{ offsetPath: `path('${p3}')` }}
        />

        {/* ---- channel tiles --------------------------------------- */}
        {[
          { y: 68, cls: "cgs-t1" },
          { y: 163, cls: "cgs-t2" },
          { y: 258, cls: "cgs-t3" },
        ].map(({ y, cls }) => (
          <g key={y} className={cls}>
            <rect
              x="508"
              y={y}
              width="96"
              height="66"
              rx="12"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d={`M524,${y + 22} h44 a7,7 0 0 1 7,7 v10 a7,7 0 0 1 -7,7 h-28 l-9,8 v-8 h-7 a7,7 0 0 1 -7,-7 v-10 a7,7 0 0 1 7,-7 z`}
              fill="var(--foreground)"
              opacity="0.13"
            />
            <circle cx="536" cy={y + 34} r="2.2" fill="var(--muted-foreground)" />
            <circle cx="546" cy={y + 34} r="2.2" fill="var(--muted-foreground)" />
            <circle cx="556" cy={y + 34} r="2.2" fill="var(--muted-foreground)" />
            {/* delivered marker */}
            <circle cx="592" cy={y + 12} r="4" className="cgs-recv" fill="oklch(0.72 0.16 150)" />
          </g>
        ))}

        {/* ---- labels ---------------------------------------------- */}
        <text x="36" y="60" className="cgs-cap">
          STATE CHANNELS · ONE CREATIVE
        </text>
        <text x="508" y="60" className="cgs-cap">
          BROADCAST
        </text>

        <g className="cgs-steps">
          <text x="36" y="376" className="cgs-step cgs-s1">
            CREATE
          </text>
          <text x="148" y="376" className="cgs-step cgs-s2">
            CAPTION
          </text>
          <text x="272" y="376" className="cgs-step cgs-s3">
            REVIEW
          </text>
          <text x="382" y="376" className="cgs-step cgs-s4">
            BROADCAST
          </text>
        </g>
      </svg>
    </div>
  );
}

function Foresight({ className = "" }: { className?: string }) {
  // Workbook stack -> medallion layers -> grounded answer.
  // Paths: ingest into bronze, bronze->silver, silver->gold, gold->answer.
  const q1 = "M186,168 L232,168 C248,168 248,122 268,122";
  const q2 = "M268,196 L312,196 C326,196 326,196 344,196";
  const q3 = "M268,266 L312,266 C326,266 326,266 344,266";
  const q4 = "M448,168 L472,168 C488,168 488,140 506,140";

  return (
    <div className={`h-full w-full ${className}`}>
      <style>{css}</style>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid meet"
        className="fgs h-full w-full"
        role="img"
        aria-label="Scattered Excel workbooks land as raw tables, are cleaned into modelled tables with personal data stripped, then queried in plain English for a grounded answer a person reviews."
      >
        <rect x="0" y="0" width="640" height="400" fill="var(--subtle)" />

        {/* ---- source workbooks ------------------------------- */}
        <g className="fgs-src">
          <rect
            x="36"
            y="96"
            width="150"
            height="144"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {[
            { y: 116, w: 110, cls: "fgs-f1" },
            { y: 140, w: 96, cls: "fgs-f2" },
            { y: 164, w: 118, cls: "fgs-f3" },
            { y: 188, w: 82, cls: "fgs-f4" },
          ].map(({ y, w, cls }) => (
            <g key={y} className={cls}>
              <rect
                x="52"
                y={y}
                width="22"
                height="18"
                rx="4"
                fill="var(--foreground)"
                opacity="0.14"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <rect
                x="82"
                y={y + 2}
                width={w}
                height="7"
                rx="3.5"
                fill="var(--foreground)"
                opacity="0.42"
              />
              <rect
                x="82"
                y={y + 11}
                width={w * 0.6}
                height="5"
                rx="2.5"
                fill="var(--muted-foreground)"
                opacity="0.4"
              />
            </g>
          ))}
          <g className="fgs-xls">
            <rect
              x="140"
              y="206"
              width="34"
              height="20"
              rx="6"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text x="157" y="220" textAnchor="middle" className="fgs-mini">
              XLS
            </text>
          </g>
        </g>

        {/* ---- connectors ------------------------------------- */}
        <g fill="none" stroke="var(--border)" strokeWidth="1.5">
          <path d={q1} />
          <path d={q2} />
          <path d={q3} />
          <path d={q4} />
        </g>
        <circle
          r="4.5"
          className="fgs-dot fgs-dot1"
          fill="var(--foreground)"
          style={{ offsetPath: `path('${q1}')` }}
        />
        <circle
          r="4.5"
          className="fgs-dot fgs-dot2"
          fill="var(--foreground)"
          style={{ offsetPath: `path('${q2}')` }}
        />
        <circle
          r="4.5"
          className="fgs-dot fgs-dot3"
          fill="var(--foreground)"
          style={{ offsetPath: `path('${q3}')` }}
        />

        {/* ---- medallion layers ------------------------------- */}
        <g className="fgs-layers">
          <rect
            x="268"
            y="92"
            width="180"
            height="60"
            rx="12"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle
            cx="290"
            cy="122"
            r="11"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <text x="308" y="118" className="fgs-layer">
            BRONZE · RAW
          </text>
          <text x="308" y="133" className="fgs-sub">
            untouched landing
          </text>

          <rect
            x="268"
            y="166"
            width="180"
            height="60"
            rx="12"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
            className="fgs-silver"
          />
          <circle
            cx="290"
            cy="196"
            r="11"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <text x="308" y="192" className="fgs-layer">
            SILVER · CLEAN
          </text>
          <text x="308" y="207" className="fgs-sub">
            PII stripped
          </text>

          <rect
            x="268"
            y="236"
            width="180"
            height="60"
            rx="12"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle
            cx="290"
            cy="266"
            r="11"
            fill="var(--foreground)"
            opacity="0.16"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x="308" y="262" className="fgs-layer">
            GOLD · MODELLED
          </text>
          <text x="308" y="277" className="fgs-sub">
            queryable P&amp;L
          </text>
        </g>

        {/* PII strip marker between bronze and silver */}
        <g className="fgs-pii">
          <rect
            x="330"
            y="150"
            width="56"
            height="20"
            rx="10"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text x="358" y="164" textAnchor="middle" className="fgs-mini">
            − PII
          </text>
        </g>

        {/* ---- grounded answer card --------------------------- */}
        <g className="fgs-ans">
          <rect
            x="472"
            y="84"
            width="132"
            height="184"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <rect
            x="486"
            y="100"
            width="104"
            height="9"
            rx="4.5"
            className="fgs-q"
            fill="var(--foreground)"
            opacity="0.55"
          />
          <rect
            x="486"
            y="116"
            width="70"
            height="18"
            rx="5"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            className="fgs-sql"
          />
          <text x="521" y="129" textAnchor="middle" className="fgs-mini">
            SQL
          </text>
          <g>
            <rect
              x="486"
              y="144"
              width="104"
              height="7"
              rx="3.5"
              className="fgs-a1"
              fill="var(--foreground)"
              opacity="0.5"
            />
            <rect
              x="486"
              y="160"
              width="88"
              height="7"
              rx="3.5"
              className="fgs-a2"
              fill="var(--foreground)"
              opacity="0.36"
            />
            <rect
              x="486"
              y="176"
              width="96"
              height="7"
              rx="3.5"
              className="fgs-a3"
              fill="var(--foreground)"
              opacity="0.28"
            />
          </g>
          {/* trace back to row */}
          <g
            className="fgs-trace"
            stroke="var(--muted-foreground)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          >
            <path d="M486,180 C460,210 420,230 372,252" />
          </g>
          <circle cx="372" cy="252" r="4" className="fgs-row" fill="oklch(0.72 0.16 150)" />
          {/* human review stamp */}
          <g className="fgs-review">
            <circle
              cx="584"
              cy="248"
              r="14"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M577,248 L582,253 L592,242"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fgs-tick"
              pathLength={1}
            />
          </g>
        </g>

        {/* ---- labels ------------------------------------------ */}
        <text x="36" y="60" className="fgs-cap">
          WORKBOOKS → GOVERNED TABLES
        </text>
        <text x="472" y="60" className="fgs-cap">
          GROUNDED ANSWER
        </text>

        <g className="fgs-steps">
          <text x="36" y="376" className="fgs-step fgs-s1">
            INGEST
          </text>
          <text x="148" y="376" className="fgs-step fgs-s2">
            MODEL
          </text>
          <text x="272" y="376" className="fgs-step fgs-s3">
            QUERY
          </text>
          <text x="382" y="376" className="fgs-step fgs-s4">
            VERIFY
          </text>
        </g>
      </svg>
    </div>
  );
}

function Swiftee({ className = "" }: { className?: string }) {
  // One topic fans out into parallel asset lanes, then stitches to a 9:16 short.
  const w1 = "M186,168 L214,168 C226,168 226,140 244,140";
  const w2 = "M420,180 L452,180 C470,180 470,180 496,180";

  return (
    <div className={`h-full w-full ${className}`}>
      <style>{css}</style>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid meet"
        className="swf h-full w-full"
        role="img"
        aria-label="One topic fans out into parallel script, mascot, voice, subtitle, music and thumbnail production, then stitches into a finished 9:16 Hindi short."
      >
        <rect x="0" y="0" width="640" height="400" fill="var(--subtle)" />

        {/* ---- topic card -------------------------------------- */}
        <g className="swf-topic">
          <rect
            x="36"
            y="92"
            width="150"
            height="152"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="52" y="118" className="swf-tag">
            TOPIC IN
          </text>
          <rect x="52" y="130" width="118" height="9" rx="4.5" className="swf-t1" />
          <rect x="52" y="148" width="96" height="9" rx="4.5" className="swf-t2" />
          <rect x="52" y="166" width="108" height="9" rx="4.5" className="swf-t3" />
          <g className="swf-preset">
            <rect
              x="52"
              y="196"
              width="118"
              height="28"
              rx="14"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text x="111" y="214" textAnchor="middle" className="swf-mini">
              PRESET · 10 SLIDES
            </text>
          </g>
        </g>

        {/* ---- connectors -------------------------------------- */}
        <g fill="none" stroke="var(--border)" strokeWidth="1.5">
          <path d={w1} />
          <path d={w2} />
        </g>
        <circle cx="215" cy="162" r="4.5" className="swf-dot swf-dot1" fill="var(--foreground)" />
        <circle cx="446" cy="180" r="4.5" className="swf-dot swf-dot2" fill="var(--foreground)" />

        {/* ---- parallel lanes ---------------------------------- */}
        <g className="swf-lanes">
          <rect
            x="244"
            y="84"
            width="176"
            height="184"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {[
            { y: 104, label: "SCRIPT", cls: "swf-b1" },
            { y: 130, label: "MASCOT", cls: "swf-b2" },
            { y: 156, label: "VOICE", cls: "swf-b3" },
            { y: 182, label: "SUBS", cls: "swf-b4" },
            { y: 208, label: "MUSIC+THUMB", cls: "swf-b5" },
          ].map(({ y, label, cls }) => (
            <g key={label}>
              <text x="258" y={y} className="swf-lane">
                {label}
              </text>
              <rect
                x="258"
                y={y + 6}
                width="148"
                height="8"
                rx="4"
                fill="var(--foreground)"
                opacity="0.12"
              />
              <rect
                x="258"
                y={y + 6}
                width="148"
                height="8"
                rx="4"
                className={`swf-bar ${cls}`}
                fill="var(--foreground)"
                opacity="0.55"
              />
            </g>
          ))}
        </g>

        {/* ---- finished short ---------------------------------- */}
        <g className="swf-phone">
          <rect
            x="472"
            y="68"
            width="132"
            height="216"
            rx="16"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <rect
            x="486"
            y="84"
            width="104"
            height="120"
            rx="10"
            fill="var(--foreground)"
            opacity="0.14"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path d="M528,124 l26,16 -26,16 z" fill="var(--foreground)" opacity="0.7" />
          <rect x="486" y="214" width="104" height="7" rx="3.5" className="swf-s1" />
          <rect x="486" y="228" width="76" height="7" rx="3.5" className="swf-s2" />
          <g className="swf-ready">
            <rect
              x="486"
              y="244"
              width="104"
              height="24"
              rx="12"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text x="538" y="260" textAnchor="middle" className="swf-mini">
              60s · 9:16 READY
            </text>
          </g>
        </g>

        {/* ---- labels ------------------------------------------ */}
        <text x="36" y="60" className="swf-cap">
          ONE TOPIC → PARALLEL PRODUCTION
        </text>
        <text x="472" y="60" className="swf-cap">
          FINISHED SHORT
        </text>

        <g className="swf-steps">
          <text x="36" y="376" className="swf-step swf-s1x">
            TOPIC
          </text>
          <text x="148" y="376" className="swf-step swf-s2x">
            PRODUCE
          </text>
          <text x="272" y="376" className="swf-step swf-s3x">
            STITCH
          </text>
          <text x="382" y="376" className="swf-step swf-s4x">
            SHORT
          </text>
        </g>
      </svg>
    </div>
  );
}

function LeadQualification({ className = "" }: { className?: string }) {
  // Lead captured, OTP-verified, voice-called, then surfaced as an insight.
  const w1 = "M186,168 L214,168 C226,168 226,150 244,150";
  const w2 = "M420,170 L452,170 C470,170 470,170 496,170";

  return (
    <div className={`h-full w-full ${className}`}>
      <style>{css}</style>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid meet"
        className="ldq h-full w-full"
        role="img"
        aria-label="An inbound lead is captured by chat, verified by OTP, qualified on an AI voice call, then surfaced on a dashboard with an AI summary."
      >
        <rect x="0" y="0" width="640" height="400" fill="var(--subtle)" />

        {/* ---- inbound lead ------------------------------------ */}
        <g className="ldq-lead">
          <rect
            x="36"
            y="92"
            width="150"
            height="152"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="52" y="118" className="ldq-tag">
            NEW LEAD
          </text>
          <circle cx="70" cy="146" r="14" fill="var(--foreground)" opacity="0.16" />
          <rect x="92" y="136" width="78" height="8" rx="4" className="ldq-n1" />
          <rect x="92" y="150" width="58" height="7" rx="3.5" className="ldq-n2" />
          <g className="ldq-chat">
            <path
              d="M52,180 h110 a8,8 0 0 1 8,8 v14 a8,8 0 0 1 -8,8 h-80 l-12,10 v-10 h-18 a8,8 0 0 1 -8,-8 v-14 a8,8 0 0 1 8,-8 z"
              fill="var(--foreground)"
              opacity="0.13"
            />
            <circle cx="72" cy="198" r="2.4" fill="var(--muted-foreground)" />
            <circle cx="82" cy="198" r="2.4" fill="var(--muted-foreground)" />
            <circle cx="92" cy="198" r="2.4" fill="var(--muted-foreground)" />
          </g>
        </g>

        {/* ---- connectors -------------------------------------- */}
        <g fill="none" stroke="var(--border)" strokeWidth="1.5">
          <path d={w1} />
          <path d={w2} />
        </g>
        <circle cx="215" cy="162" r="4.5" className="ldq-dot ldq-dot1" fill="var(--foreground)" />
        <circle cx="446" cy="170" r="4.5" className="ldq-dot ldq-dot2" fill="var(--foreground)" />

        {/* ---- verify + call ----------------------------------- */}
        <g className="ldq-pipe">
          <rect
            x="244"
            y="84"
            width="176"
            height="184"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="258" y="110" className="ldq-lane">
            OTP VERIFY
          </text>
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={258 + i * 30}
                y={120}
                width="24"
                height="28"
                rx="7"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.2"
                className={`ldq-otp ldq-o${i + 1}`}
              />
            ))}
          </g>
          <text x="258" y="176" className="ldq-lane">
            VOICE AI · SIP
          </text>
          <g className="ldq-wave" fill="var(--foreground)" opacity="0.55">
            {[10, 18, 26, 34, 26, 18, 12, 22, 30, 20, 14, 24].map((h, i) => (
              <rect
                key={i}
                x={258 + i * 12}
                y={200 - h / 2}
                width="6"
                height={h}
                rx="3"
                className={`ldq-w ldq-w${(i % 4) + 1}`}
              />
            ))}
          </g>
          <text x="258" y="248" className="ldq-sub">
            objections · sentiment · next step
          </text>
        </g>

        {/* ---- dashboard --------------------------------------- */}
        <g className="ldq-dash">
          <rect
            x="472"
            y="68"
            width="132"
            height="216"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="486" y="94" className="ldq-tag">
            AI SUMMARY
          </text>
          <circle
            cx="538"
            cy="130"
            r="24"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
            opacity="0.5"
          />
          <circle
            cx="538"
            cy="130"
            r="24"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="151"
            strokeDashoffset="38"
            className="ldq-ring"
            transform="rotate(-90 538 130)"
          />
          <text x="538" y="136" textAnchor="middle" className="ldq-score">
            86
          </text>
          <rect x="486" y="168" width="104" height="7" rx="3.5" className="ldq-d1" />
          <rect x="486" y="184" width="84" height="7" rx="3.5" className="ldq-d2" />
          <rect x="486" y="200" width="92" height="7" rx="3.5" className="ldq-d3" />
          <g className="ldq-route">
            <rect
              x="486"
              y="224"
              width="104"
              height="24"
              rx="12"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text x="538" y="240" textAnchor="middle" className="ldq-mini">
              ROUTED TO SALES
            </text>
          </g>
        </g>

        {/* ---- labels ------------------------------------------ */}
        <text x="36" y="60" className="ldq-cap">
          CAPTURE → VERIFY → CALL
        </text>
        <text x="472" y="60" className="ldq-cap">
          INSIGHT
        </text>

        <g className="ldq-steps">
          <text x="36" y="376" className="ldq-step ldq-s1x">
            CAPTURE
          </text>
          <text x="148" y="376" className="ldq-step ldq-s2x">
            VERIFY
          </text>
          <text x="272" y="376" className="ldq-step ldq-s3x">
            CALL
          </text>
          <text x="382" y="376" className="ldq-step ldq-s4x">
            INSIGHT
          </text>
        </g>
      </svg>
    </div>
  );
}

function AutoGrade({ className = "" }: { className?: string }) {
  // Question paper plus student script grade in parallel, then pass a QC gate.
  const w1 = "M186,168 L214,168 C226,168 226,140 244,140";
  const w2 = "M420,180 L448,180 C460,180 460,170 472,170";

  return (
    <div className={`h-full w-full ${className}`}>
      <style>{css}</style>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid meet"
        className="agd h-full w-full"
        role="img"
        aria-label="A question paper and a handwritten student script are extracted, graded per question in parallel, checked by an arithmetic QC gate, then returned with bounding-box evidence."
      >
        <rect x="0" y="0" width="640" height="400" fill="var(--subtle)" />

        {/* ---- source docs ------------------------------------- */}
        <g className="agd-docs">
          <rect
            x="36"
            y="92"
            width="150"
            height="152"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <g className="agd-qp">
            <rect
              x="52"
              y="108"
              width="56"
              height="72"
              rx="6"
              fill="var(--subtle)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <rect x="60" y="120" width="40" height="6" rx="3" className="agd-q1" />
            <rect x="60" y="132" width="32" height="6" rx="3" className="agd-q2" />
            <rect x="60" y="144" width="36" height="6" rx="3" className="agd-q3" />
          </g>
          <g className="agd-pdf">
            <rect
              x="114"
              y="124"
              width="56"
              height="72"
              rx="6"
              fill="var(--subtle)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <path
              d="M122,140 q6,-8 12,0 q6,8 12,0 M122,156 q6,-8 12,0 q6,8 12,0 M122,172 q6,-8 12,0 q6,8 12,0"
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
          <g className="agd-batch">
            <rect
              x="52"
              y="200"
              width="118"
              height="28"
              rx="14"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text x="111" y="218" textAnchor="middle" className="agd-mini">
              60 × 20 QUESTIONS
            </text>
          </g>
        </g>

        {/* ---- connectors -------------------------------------- */}
        <g fill="none" stroke="var(--border)" strokeWidth="1.5">
          <path d={w1} />
          <path d={w2} />
        </g>
        <circle cx="215" cy="160" r="4.5" className="agd-dot agd-dot1" fill="var(--foreground)" />
        <circle cx="450" cy="178" r="4.5" className="agd-dot agd-dot2" fill="var(--foreground)" />

        {/* ---- parallel grading -------------------------------- */}
        <g className="agd-grades">
          <rect
            x="244"
            y="84"
            width="176"
            height="150"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {[
            { y: 106, q: "Q1", mark: "8/10", cls: "agd-g1" },
            { y: 132, q: "Q2", mark: "6/10", cls: "agd-g2" },
            { y: 158, q: "Q3", mark: "9/10", cls: "agd-g3" },
            { y: 184, q: "Q4", mark: "7/10", cls: "agd-g4" },
          ].map(({ y, q, mark, cls }) => (
            <g key={q} className={cls}>
              <text x="258" y={y} className="agd-lane">
                {q}
              </text>
              <rect
                x="282"
                y={y - 11}
                width="80"
                height="8"
                rx="4"
                fill="var(--foreground)"
                opacity="0.12"
              />
              <rect
                x="282"
                y={y - 11}
                width="80"
                height="8"
                rx="4"
                className="agd-fill"
                fill="var(--foreground)"
                opacity="0.5"
              />
              <text x="398" y={y} textAnchor="end" className="agd-mark">
                {mark}
              </text>
            </g>
          ))}
        </g>

        {/* ---- QC gate ----------------------------------------- */}
        <g className="agd-qc">
          <rect
            x="282"
            y="242"
            width="100"
            height="30"
            rx="15"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text x="332" y="262" textAnchor="middle" className="agd-mini">
            QC · PASS
          </text>
        </g>

        {/* ---- result with evidence ---------------------------- */}
        <g className="agd-res">
          <rect
            x="472"
            y="68"
            width="132"
            height="216"
            rx="14"
            fill="var(--card)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <rect
            x="486"
            y="84"
            width="104"
            height="96"
            rx="8"
            fill="var(--subtle)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M494,108 q8,-10 16,0 q8,10 16,0 M494,130 q8,-10 16,0 q8,10 16,0 M494,152 q8,-10 16,0 q8,10 16,0"
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <rect
            x="532"
            y="122"
            width="44"
            height="22"
            rx="5"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="1.6"
            strokeDasharray="5 3"
            className="agd-bbox"
          />
          <rect x="486" y="192" width="104" height="7" rx="3.5" className="agd-r1" />
          <rect x="486" y="208" width="82" height="7" rx="3.5" className="agd-r2" />
          <g className="agd-verdict">
            <circle cx="592" cy="252" r="13" fill="oklch(0.72 0.16 150)" opacity="0.9" />
            <path
              d="M586,252 l4,4 8,-9"
              fill="none"
              stroke="var(--card)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* ---- labels ------------------------------------------ */}
        <text x="36" y="60" className="agd-cap">
          PAPER + SCRIPT → PARALLEL GRADE
        </text>
        <text x="472" y="60" className="agd-cap">
          EVIDENCE
        </text>

        <g className="agd-steps">
          <text x="36" y="376" className="agd-step agd-s1x">
            EXTRACT
          </text>
          <text x="148" y="376" className="agd-step agd-s2x">
            GRADE
          </text>
          <text x="272" y="376" className="agd-step agd-s3x">
            QC
          </text>
          <text x="382" y="376" className="agd-step agd-s4x">
            RESULT
          </text>
        </g>
      </svg>
    </div>
  );
}

/* One 9s timeline. Percentages are the phase boundaries:
   create 0-22 · caption 22-44 · review 44-60 · broadcast 60-96 · reset 96-100 */
const css = `
.cgs { display:block; }
.cgs .cgs-cap,
.cgs .cgs-step {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.09em;
  fill: var(--muted-foreground);
}
.cgs .cgs-step { opacity: 0.32; }

.cgs .cgs-header { transform-box: fill-box; transform-origin: left center; transform: scaleX(0); animation: cgs-wipe ${LOOP} linear infinite; }
.cgs .cgs-thumb  { opacity: 0; animation: cgs-pop ${LOOP} linear infinite; }

.cgs .cgs-l1, .cgs .cgs-l2, .cgs .cgs-l3, .cgs .cgs-l4 {
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: cgs-type ${LOOP} linear infinite;
}
.cgs .cgs-l2 { animation-name: cgs-type2; }
.cgs .cgs-l3 { animation-name: cgs-type3; }
.cgs .cgs-l4 { animation-name: cgs-type4; }

.cgs .cgs-review { opacity: 0; animation: cgs-stamp ${LOOP} linear infinite; }
.cgs .cgs-tick { stroke-dasharray: 1; stroke-dashoffset: 1; animation: cgs-draw ${LOOP} linear infinite; }
.cgs .cgs-lock { opacity: 0.35; animation: cgs-lock ${LOOP} linear infinite; }

.cgs .cgs-dot { opacity: 0; offset-distance: 0%; animation: cgs-travel ${LOOP} linear infinite; }
.cgs .cgs-dot2 { animation-delay: 0.55s; }
.cgs .cgs-dot3 { animation-delay: 1.1s; }

.cgs .cgs-recv { opacity: 0; }
.cgs .cgs-t1 .cgs-recv { animation: cgs-recv ${LOOP} linear infinite; }
.cgs .cgs-t2 .cgs-recv { animation: cgs-recv ${LOOP} linear infinite 0.55s; }
.cgs .cgs-t3 .cgs-recv { animation: cgs-recv ${LOOP} linear infinite 1.1s; }

.cgs .cgs-s1 { animation: cgs-step1 ${LOOP} linear infinite; }
.cgs .cgs-s2 { animation: cgs-step2 ${LOOP} linear infinite; }
.cgs .cgs-s3 { animation: cgs-step3 ${LOOP} linear infinite; }
.cgs .cgs-s4 { animation: cgs-step4 ${LOOP} linear infinite; }

@keyframes cgs-wipe { 0%,2% { transform:scaleX(0);} 14%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes cgs-pop  { 0%,10% { opacity:0;} 20%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes cgs-type  { 0%,22% { transform:scaleX(0);} 28%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes cgs-type2 { 0%,27% { transform:scaleX(0);} 33%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes cgs-type3 { 0%,32% { transform:scaleX(0);} 38%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes cgs-type4 { 0%,37% { transform:scaleX(0);} 43%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes cgs-stamp { 0%,44% { opacity:0; } 50%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes cgs-draw  { 0%,46% { stroke-dashoffset:1;} 56%,94% { stroke-dashoffset:0;} 100% { stroke-dashoffset:1;} }
@keyframes cgs-lock  { 0%,58% { opacity:0.35;} 64%,88% { opacity:1;} 100% { opacity:0.35;} }
@keyframes cgs-travel { 0%,60% { offset-distance:0%; opacity:0;} 63% { opacity:1;} 74% { opacity:1;} 76%,100% { offset-distance:100%; opacity:0;} }
@keyframes cgs-recv  { 0%,74% { opacity:0; transform:scale(0.4);} 79%,94% { opacity:1; transform:scale(1);} 100% { opacity:0; transform:scale(0.4);} }
@keyframes cgs-step1 { 0%,20% { opacity:1;} 24%,100% { opacity:0.32;} }
@keyframes cgs-step2 { 0%,21% { opacity:0.32;} 24%,42% { opacity:1;} 46%,100% { opacity:0.32;} }
@keyframes cgs-step3 { 0%,43% { opacity:0.32;} 46%,58% { opacity:1;} 62%,100% { opacity:0.32;} }
@keyframes cgs-step4 { 0%,59% { opacity:0.32;} 62%,94% { opacity:1;} 97%,100% { opacity:0.32;} }

.cgs .cgs-recv { transform-box: fill-box; transform-origin: center; }

@media (prefers-reduced-motion: reduce) {
  .cgs * { animation: none !important; }
  .cgs .cgs-header,
  .cgs .cgs-l1, .cgs .cgs-l2, .cgs .cgs-l3, .cgs .cgs-l4 { transform: scaleX(1); }
  .cgs .cgs-thumb, .cgs .cgs-review, .cgs .cgs-recv { opacity: 1; }
  .cgs .cgs-tick { stroke-dashoffset: 0; }
  .cgs .cgs-lock { opacity: 1; }
  .cgs .cgs-dot { opacity: 0; }
  .cgs .cgs-step { opacity: 0.75; }
}

/* ---- Foresight: workbooks -> medallion -> grounded answer ----
   One 9s timeline. Phases:
   ingest 0-25 · model 25-55 · query 55-75 · verify 75-96 · reset 96-100 */
.fgs { display:block; }
.fgs .fgs-cap,
.fgs .fgs-step {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.09em;
  fill: var(--muted-foreground);
}
.fgs .fgs-step { opacity: 0.32; }
.fgs .fgs-layer {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  fill: var(--foreground);
}
.fgs .fgs-sub {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  fill: var(--muted-foreground);
}
.fgs .fgs-mini {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  font-weight: 700;
  fill: var(--muted-foreground);
}

.fgs .fgs-f1, .fgs .fgs-f2, .fgs .fgs-f3, .fgs .fgs-f4 {
  opacity: 0; animation: fgs-file ${LOOP} linear infinite;
}
.fgs .fgs-f2 { animation-delay: 0.25s; }
.fgs .fgs-f3 { animation-delay: 0.5s; }
.fgs .fgs-f4 { animation-delay: 0.75s; }
.fgs .fgs-xls { opacity: 0; animation: fgs-pop ${LOOP} linear infinite; }

.fgs .fgs-layers { opacity: 0.35; animation: fgs-layers ${LOOP} linear infinite; }
.fgs .fgs-pii { opacity: 0; animation: fgs-pii ${LOOP} linear infinite; }

.fgs .fgs-dot { opacity: 0; offset-distance: 0%; animation: fgs-travel ${LOOP} linear infinite; }
.fgs .fgs-dot2 { animation-delay: 0.4s; }
.fgs .fgs-dot3 { animation-delay: 0.8s; }

.fgs .fgs-q { transform-box: fill-box; transform-origin: left center; transform: scaleX(0); animation: fgs-q ${LOOP} linear infinite; }
.fgs .fgs-sql { opacity: 0; animation: fgs-sql ${LOOP} linear infinite; }
.fgs .fgs-a1, .fgs .fgs-a2, .fgs .fgs-a3 {
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: fgs-a ${LOOP} linear infinite;
}
.fgs .fgs-a2 { animation-name: fgs-a2; }
.fgs .fgs-a3 { animation-name: fgs-a3; }
.fgs .fgs-trace { opacity: 0; animation: fgs-trace ${LOOP} linear infinite; }
.fgs .fgs-row { opacity: 0; transform-box: fill-box; transform-origin: center; animation: fgs-row ${LOOP} linear infinite; }
.fgs .fgs-review { opacity: 0; animation: fgs-stamp ${LOOP} linear infinite; }
.fgs .fgs-tick { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fgs-draw ${LOOP} linear infinite; }

.fgs .fgs-s1 { animation: fgs-s1 ${LOOP} linear infinite; }
.fgs .fgs-s2 { animation: fgs-s2 ${LOOP} linear infinite; }
.fgs .fgs-s3 { animation: fgs-s3 ${LOOP} linear infinite; }
.fgs .fgs-s4 { animation: fgs-s4 ${LOOP} linear infinite; }

@keyframes fgs-file { 0%,2% { opacity:0;} 10%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes fgs-pop { 0%,12% { opacity:0;} 20%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes fgs-layers { 0%,20% { opacity:0.35;} 30%,94% { opacity:1;} 100% { opacity:0.35;} }
@keyframes fgs-pii { 0%,28% { opacity:0;} 36%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes fgs-travel { 0%,24% { offset-distance:0%; opacity:0;} 27% { opacity:1;} 44% { opacity:1;} 46%,100% { offset-distance:100%; opacity:0;} }
@keyframes fgs-q { 0%,52% { transform:scaleX(0);} 60%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes fgs-sql { 0%,58% { opacity:0;} 64%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes fgs-a { 0%,62% { transform:scaleX(0);} 70%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes fgs-a2 { 0%,66% { transform:scaleX(0);} 74%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes fgs-a3 { 0%,70% { transform:scaleX(0);} 78%,94% { transform:scaleX(1);} 100% { transform:scaleX(0);} }
@keyframes fgs-trace { 0%,70% { opacity:0;} 78%,94% { opacity:0.9;} 100% { opacity:0;} }
@keyframes fgs-row { 0%,74% { opacity:0; transform:scale(0.4);} 80%,94% { opacity:1; transform:scale(1);} 100% { opacity:0; transform:scale(0.4);} }
@keyframes fgs-stamp { 0%,76% { opacity:0;} 82%,94% { opacity:1;} 100% { opacity:0;} }
@keyframes fgs-draw { 0%,78% { stroke-dashoffset:1;} 86%,94% { stroke-dashoffset:0;} 100% { stroke-dashoffset:1;} }
@keyframes fgs-s1 { 0%,22% { opacity:1;} 26%,100% { opacity:0.32;} }
@keyframes fgs-s2 { 0%,23% { opacity:0.32;} 27%,52% { opacity:1;} 56%,100% { opacity:0.32;} }
@keyframes fgs-s3 { 0%,53% { opacity:0.32;} 57%,72% { opacity:1;} 76%,100% { opacity:0.32;} }
@keyframes fgs-s4 { 0%,73% { opacity:0.32;} 77%,94% { opacity:1;} 97%,100% { opacity:0.32;} }

@media (prefers-reduced-motion: reduce) {
  .fgs * { animation: none !important; }
  .fgs .fgs-f1, .fgs .fgs-f2, .fgs .fgs-f3, .fgs .fgs-f4,
  .fgs .fgs-xls, .fgs .fgs-pii, .fgs .fgs-sql,
  .fgs .fgs-trace, .fgs .fgs-row, .fgs .fgs-review { opacity: 1; }
  .fgs .fgs-layers { opacity: 1; }
  .fgs .fgs-q, .fgs .fgs-a1, .fgs .fgs-a2, .fgs .fgs-a3 { transform: scaleX(1); }
  .fgs .fgs-tick { stroke-dashoffset: 0; }
  .fgs .fgs-dot { opacity: 0; }
  .fgs .fgs-step { opacity: 0.75; }
}

/* ---- Swiftee: topic -> parallel lanes -> finished short ----
   One 9s timeline: topic 0-22 · produce 22-55 · stitch 55-75 · short 75-96 */
.swf { display: block; }
.swf .swf-cap,
.swf .swf-step {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.09em;
  fill: var(--muted-foreground);
}
.swf .swf-step { opacity: 0.32; }
.swf .swf-tag,
.swf .swf-lane {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  fill: var(--foreground);
}
.swf .swf-sub,
.swf .swf-mini {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  fill: var(--muted-foreground);
}
.swf .swf-t1, .swf .swf-t2, .swf .swf-t3 {
  fill: var(--foreground); opacity: 0.45;
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: swf-t ${LOOP} linear infinite;
}
.swf .swf-t2 { animation-delay: 0.3s; opacity: 0.36; }
.swf .swf-t3 { animation-delay: 0.6s; opacity: 0.28; }
.swf .swf-preset { opacity: 0; animation: swf-pop ${LOOP} linear infinite; }
.swf .swf-bar {
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: swf-bar ${LOOP} linear infinite;
}
.swf .swf-b2 { animation-delay: 0.35s; }
.swf .swf-b3 { animation-delay: 0.7s; }
.swf .swf-b4 { animation-delay: 1.05s; }
.swf .swf-b5 { animation-delay: 1.4s; }
.swf .swf-dot { opacity: 0; animation: swf-blink ${LOOP} linear infinite; }
.swf .swf-dot2 { animation-delay: 0.8s; }
.swf .swf-s1, .swf .swf-s2 {
  fill: var(--foreground); opacity: 0.45;
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: swf-s ${LOOP} linear infinite;
}
.swf .swf-s2 { animation-delay: 0.4s; }
.swf .swf-ready { opacity: 0; animation: swf-ready ${LOOP} linear infinite; }
.swf .swf-s1x { animation: swf-x1 ${LOOP} linear infinite; }
.swf .swf-s2x { animation: swf-x2 ${LOOP} linear infinite; }
.swf .swf-s3x { animation: swf-x3 ${LOOP} linear infinite; }
.swf .swf-s4x { animation: swf-x4 ${LOOP} linear infinite; }
@keyframes swf-t { 0%,4% { transform: scaleX(0); } 14%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes swf-pop { 0%,14% { opacity: 0; } 22%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes swf-bar { 0%,22% { transform: scaleX(0); } 48%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes swf-blink { 0%,30% { opacity: 0; } 34%,60% { opacity: 1; } 64%,100% { opacity: 0; } }
@keyframes swf-s { 0%,62% { transform: scaleX(0); } 72%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes swf-ready { 0%,72% { opacity: 0; } 80%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes swf-x1 { 0%,20% { opacity: 1; } 24%,100% { opacity: 0.32; } }
@keyframes swf-x2 { 0%,21% { opacity: 0.32; } 25%,52% { opacity: 1; } 56%,100% { opacity: 0.32; } }
@keyframes swf-x3 { 0%,53% { opacity: 0.32; } 57%,72% { opacity: 1; } 76%,100% { opacity: 0.32; } }
@keyframes swf-x4 { 0%,73% { opacity: 0.32; } 77%,94% { opacity: 1; } 97%,100% { opacity: 0.32; } }
@media (prefers-reduced-motion: reduce) {
  .swf * { animation: none !important; }
  .swf .swf-t1, .swf .swf-t2, .swf .swf-t3,
  .swf .swf-bar, .swf .swf-s1, .swf .swf-s2 { transform: scaleX(1); }
  .swf .swf-preset, .swf .swf-ready { opacity: 1; }
  .swf .swf-dot { opacity: 0; }
  .swf .swf-step { opacity: 0.75; }
}

/* ---- Lead qualification: capture -> verify -> call -> insight ----
   One 9s timeline: capture 0-25 · verify 25-50 · call 50-72 · insight 72-96 */
.ldq { display: block; }
.ldq .ldq-cap,
.ldq .ldq-step {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.09em;
  fill: var(--muted-foreground);
}
.ldq .ldq-step { opacity: 0.32; }
.ldq .ldq-tag,
.ldq .ldq-lane {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  fill: var(--foreground);
}
.ldq .ldq-sub,
.ldq .ldq-mini {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  fill: var(--muted-foreground);
}
.ldq .ldq-score {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 20px;
  font-weight: 700;
  fill: var(--foreground);
}
.ldq .ldq-n1, .ldq .ldq-n2 {
  fill: var(--foreground); opacity: 0.45;
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: ldq-t ${LOOP} linear infinite;
}
.ldq .ldq-n2 { animation-delay: 0.3s; }
.ldq .ldq-chat { opacity: 0; animation: ldq-pop ${LOOP} linear infinite; }
.ldq .ldq-otp { opacity: 0.3; animation: ldq-otp ${LOOP} linear infinite; }
.ldq .ldq-o2 { animation-delay: 0.3s; }
.ldq .ldq-o3 { animation-delay: 0.6s; }
.ldq .ldq-o4 { animation-delay: 0.9s; }
.ldq .ldq-w { animation: ldq-wave 1.8s ease-in-out infinite; }
.ldq .ldq-w2 { animation-delay: 0.2s; }
.ldq .ldq-w3 { animation-delay: 0.4s; }
.ldq .ldq-w4 { animation-delay: 0.6s; }
.ldq .ldq-ring {
  stroke-dasharray: 151; stroke-dashoffset: 151;
  animation: ldq-ring ${LOOP} linear infinite;
}
.ldq .ldq-d1, .ldq .ldq-d2, .ldq .ldq-d3 {
  fill: var(--foreground); opacity: 0.4;
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: ldq-d ${LOOP} linear infinite;
}
.ldq .ldq-d2 { animation-delay: 0.3s; }
.ldq .ldq-d3 { animation-delay: 0.6s; }
.ldq .ldq-route { opacity: 0; animation: ldq-route ${LOOP} linear infinite; }
.ldq .ldq-dot { opacity: 0; animation: ldq-blink ${LOOP} linear infinite; }
.ldq .ldq-dot2 { animation-delay: 0.8s; }
.ldq .ldq-s1x { animation: ldq-x1 ${LOOP} linear infinite; }
.ldq .ldq-s2x { animation: ldq-x2 ${LOOP} linear infinite; }
.ldq .ldq-s3x { animation: ldq-x3 ${LOOP} linear infinite; }
.ldq .ldq-s4x { animation: ldq-x4 ${LOOP} linear infinite; }
@keyframes ldq-t { 0%,4% { transform: scaleX(0); } 14%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes ldq-pop { 0%,12% { opacity: 0; } 20%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes ldq-otp { 0%,25% { opacity: 0.3; } 38%,94% { opacity: 1; } 100% { opacity: 0.3; } }
@keyframes ldq-wave { 0%,100% { transform: scaleY(0.55); } 50% { transform: scaleY(1.15); } }
@keyframes ldq-ring { 0%,66% { stroke-dashoffset: 151; } 80%,94% { stroke-dashoffset: 38; } 100% { stroke-dashoffset: 151; } }
@keyframes ldq-d { 0%,70% { transform: scaleX(0); } 80%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes ldq-route { 0%,80% { opacity: 0; } 87%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes ldq-blink { 0%,30% { opacity: 0; } 34%,62% { opacity: 1; } 66%,100% { opacity: 0; } }
@keyframes ldq-x1 { 0%,22% { opacity: 1; } 26%,100% { opacity: 0.32; } }
@keyframes ldq-x2 { 0%,23% { opacity: 0.32; } 27%,48% { opacity: 1; } 52%,100% { opacity: 0.32; } }
@keyframes ldq-x3 { 0%,49% { opacity: 0.32; } 53%,70% { opacity: 1; } 74%,100% { opacity: 0.32; } }
@keyframes ldq-x4 { 0%,71% { opacity: 0.32; } 75%,94% { opacity: 1; } 97%,100% { opacity: 0.32; } }
.ldq .ldq-w { transform-box: fill-box; transform-origin: center; }
@media (prefers-reduced-motion: reduce) {
  .ldq * { animation: none !important; }
  .ldq .ldq-n1, .ldq .ldq-n2,
  .ldq .ldq-d1, .ldq .ldq-d2, .ldq .ldq-d3 { transform: scaleX(1); }
  .ldq .ldq-chat, .ldq .ldq-route { opacity: 1; }
  .ldq .ldq-otp { opacity: 1; }
  .ldq .ldq-ring { stroke-dashoffset: 38; }
  .ldq .ldq-dot { opacity: 0; }
  .ldq .ldq-step { opacity: 0.75; }
}

/* ---- AutoGrade: extract -> parallel grade -> QC -> result ----
   One 9s timeline: extract 0-25 · grade 25-58 · qc 58-74 · result 74-96 */
.agd { display: block; }
.agd .agd-cap,
.agd .agd-step {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  letter-spacing: 0.09em;
  fill: var(--muted-foreground);
}
.agd .agd-step { opacity: 0.32; }
.agd .agd-lane,
.agd .agd-mark {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  fill: var(--foreground);
}
.agd .agd-mini {
  font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 9px;
  font-weight: 700;
  fill: var(--muted-foreground);
}
.agd .agd-q1, .agd .agd-q2, .agd .agd-q3 {
  fill: var(--foreground); opacity: 0.45;
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: agd-t ${LOOP} linear infinite;
}
.agd .agd-q2 { animation-delay: 0.3s; }
.agd .agd-q3 { animation-delay: 0.6s; }
.agd .agd-pdf { opacity: 0; animation: agd-pop ${LOOP} linear infinite; }
.agd .agd-batch { opacity: 0; animation: agd-pop2 ${LOOP} linear infinite; }
.agd .agd-g1, .agd .agd-g2, .agd .agd-g3, .agd .agd-g4 { opacity: 0.3; }
.agd .agd-g1 { animation: agd-g ${LOOP} linear infinite; }
.agd .agd-g2 { animation: agd-g ${LOOP} linear infinite 0.3s; }
.agd .agd-g3 { animation: agd-g ${LOOP} linear infinite 0.6s; }
.agd .agd-g4 { animation: agd-g ${LOOP} linear infinite 0.9s; }
.agd .agd-fill {
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: agd-fill ${LOOP} linear infinite;
}
.agd .agd-g2 .agd-fill { animation-delay: 0.3s; }
.agd .agd-g3 .agd-fill { animation-delay: 0.6s; }
.agd .agd-g4 .agd-fill { animation-delay: 0.9s; }
.agd .agd-qc { opacity: 0; animation: agd-qc ${LOOP} linear infinite; }
.agd .agd-bbox { opacity: 0; animation: agd-bbox ${LOOP} linear infinite; }
.agd .agd-r1, .agd .agd-r2 {
  fill: var(--foreground); opacity: 0.4;
  transform-box: fill-box; transform-origin: left center; transform: scaleX(0);
  animation: agd-r ${LOOP} linear infinite;
}
.agd .agd-r2 { animation-delay: 0.3s; }
.agd .agd-verdict { opacity: 0; animation: agd-verdict ${LOOP} linear infinite; }
.agd .agd-dot { opacity: 0; animation: agd-blink ${LOOP} linear infinite; }
.agd .agd-dot2 { animation-delay: 0.8s; }
.agd .agd-s1x { animation: agd-x1 ${LOOP} linear infinite; }
.agd .agd-s2x { animation: agd-x2 ${LOOP} linear infinite; }
.agd .agd-s3x { animation: agd-x3 ${LOOP} linear infinite; }
.agd .agd-s4x { animation: agd-x4 ${LOOP} linear infinite; }
@keyframes agd-t { 0%,4% { transform: scaleX(0); } 14%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes agd-pop { 0%,10% { opacity: 0; } 18%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes agd-pop2 { 0%,16% { opacity: 0; } 24%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes agd-g { 0%,25% { opacity: 0.3; } 35%,94% { opacity: 1; } 100% { opacity: 0.3; } }
@keyframes agd-fill { 0%,28% { transform: scaleX(0); } 50%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes agd-qc { 0%,56% { opacity: 0; } 64%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes agd-bbox { 0%,70% { opacity: 0; } 78%,88% { opacity: 1; } 92%,94% { opacity: 0.4; } 100% { opacity: 0; } }
@keyframes agd-r { 0%,72% { transform: scaleX(0); } 82%,94% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
@keyframes agd-verdict { 0%,78% { opacity: 0; } 86%,94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes agd-blink { 0%,26% { opacity: 0; } 30%,56% { opacity: 1; } 60%,100% { opacity: 0; } }
@keyframes agd-x1 { 0%,22% { opacity: 1; } 26%,100% { opacity: 0.32; } }
@keyframes agd-x2 { 0%,23% { opacity: 0.32; } 27%,56% { opacity: 1; } 60%,100% { opacity: 0.32; } }
@keyframes agd-x3 { 0%,57% { opacity: 0.32; } 61%,72% { opacity: 1; } 76%,100% { opacity: 0.32; } }
@keyframes agd-x4 { 0%,73% { opacity: 0.32; } 77%,94% { opacity: 1; } 97%,100% { opacity: 0.32; } }
@media (prefers-reduced-motion: reduce) {
  .agd * { animation: none !important; }
  .agd .agd-q1, .agd .agd-q2, .agd .agd-q3,
  .agd .agd-fill, .agd .agd-r1, .agd .agd-r2 { transform: scaleX(1); }
  .agd .agd-pdf, .agd .agd-batch, .agd .agd-qc,
  .agd .agd-bbox, .agd .agd-verdict { opacity: 1; }
  .agd .agd-g1, .agd .agd-g2, .agd .agd-g3, .agd .agd-g4 { opacity: 1; }
  .agd .agd-dot { opacity: 0; }
  .agd .agd-step { opacity: 0.75; }
}
`;
