export type ProjectMetric = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  oneLiner: string;
  summary: string;
  elevatorPitch: string;
  description: string;
  tools: string[];
  toolGroups?: { group: string; items: string[] }[];
  proves: string[];
  flow: string[];
  role: string;
  status: string;
  year: string;
  problem: string;
  solution: string;
  buildNotes: string[];
  keyDecisions: { title: string; detail: string }[];
  result: string[];
  recruiterHighlights: string[];
  metrics: ProjectMetric[];
  accent?: string;
  videoSrc?: string;
};

export const projects: Project[] = [
  {
    slug: "founder-video-pipeline",
    title: "Founder Video Automation Platform",
    category: "Durable multi-provider AI pipeline",
    oneLiner:
      "One approve click → a finished vertical founder video in ~6 minutes.",
    summary:
      "Internal admin tool that turns one approved short-form post into a finished vertical video — talking-head avatar, AI b-roll, animated subtitles, music — and ships it to Telegram.",
    elevatorPitch:
      "A durable Inngest workflow stitches ElevenLabs, HeyGen, KIE Grok-Imagine, Submagic and Gemini behind a single approve click. Edge functions stay stateless; Inngest owns state, retries, per-key concurrency, and event waits. One ghostwriter now runs a content backoffice for a roster of founders.",
    description:
      "Production backend behind a ghostwriter-for-founders service: 17 Supabase edge functions, ~7,100 LOC, 7 DB tables, 4 storage buckets, 8 admin pages, 6 AI providers — all coordinated by Inngest with live observability.",
    tools: [
      "TypeScript",
      "React 18",
      "Supabase",
      "Inngest",
      "Remotion",
      "FFmpeg",
      "ElevenLabs",
      "HeyGen",
      "KIE Grok-Imagine",
      "Submagic",
      "Gemini 2.5 Flash",
    ],
    proves: [
      "Durable multi-provider AI orchestration",
      "Per-key concurrency + idempotency with Inngest",
      "Failure-mode debugging across 6 AI APIs",
      "Edge-runtime architecture decisions",
    ],
    flow: [
      "Webhook",
      "Inngest",
      "TTS + Avatar",
      "Scribe ASR",
      "Edit Plan",
      "B-roll",
      "Composite",
      "Captions",
      "Telegram",
    ],
    role: "Solo full-stack + AI infra engineer",
    status: "Production",
    year: "2025",
    problem:
      "Founder-led content is the highest-converting B2B channel but does not scale — the founder must write, record, edit, caption, and post. Editors stitched HeyGen, ElevenLabs, CapCut and stock footage by hand per post, with no durable state and per-founder style trapped in editor heads.",
    solution:
      "A single `approve` click in Telegram triggers a durable Inngest workflow. Per-founder style (voice ID, HeyGen avatar, masterprompt, caption preset, b-roll archetype, music) lives as data on the `founders` table — one pipeline, N distinct visual identities. Every stage transition is recorded in `bot_logs` with the raw provider payload for forensics.",
    buildNotes: [
      "Pre-flight HeyGen quota check before ElevenLabs TTS so the stage fails fast and cheap instead of burning credits",
      "Re-transcribe the rendered HeyGen video with ElevenLabs Scribe v2 (not the source TTS) so captions stay in sync after the avatar re-encode",
      "Gemini 2.5 Flash with function-call schema to guarantee valid Remotion edit plans",
      "KIE Grok-Imagine T2I → I2V chain for cinematic b-roll at ~$0.10/clip, composited over the avatar by FFmpeg",
      "Submagic captions bridged into Inngest events so the stage waits on `step.waitForEvent` instead of polling",
      "Live `PipelineStepper` UI driven by Supabase Realtime, surfacing the actual provider error string from `bot_logs`",
    ],
    keyDecisions: [
      {
        title: "Inngest over recursive edge orchestrator",
        detail:
          "Replaced ~500 LOC of homegrown recursive `run-pipeline` with Inngest behind a per-founder feature flag for a zero-downtime cutover. Gained durable steps, per-key concurrency (`post_id:1`, `founder_id:3`), and event-driven `waitForEvent`.",
      },
      {
        title: "Scribe-on-rendered-video, not source TTS",
        detail:
          "Subtitle drift was caused by HeyGen's lead-in pad and re-encode. Re-running Scribe v2 on the rendered MP4 — not the audio we generated — fixed it. A non-obvious failure mode debugged at the system level.",
      },
      {
        title: "Permanent vs transient failure classifier",
        detail:
          "Watchdog skips auto-retries on `payment_required` and KIE validation errors to prevent retry storms, while still re-kicking stuck transient stages.",
      },
      {
        title: "Split render: edge prepares, worker renders",
        detail:
          "Edge runtime has no Chromium and a 150s ceiling. Edge only prepares ASS subtitles + edit plan; Remotion runs outside edge for the actual render.",
      },
    ],
    result: [
      "2–3 hour manual editor workflow → ~6 minutes of unattended compute and one approve click",
      "6 AI providers stitched with consistent retry, cost-tracking and error-surfacing",
      "Live observability: per-stage status + actual provider error string in the UI",
      "Zero-downtime cutover from legacy orchestrator via per-founder feature flag",
    ],
    recruiterHighlights: [
      "Production durable-workflow design with Inngest concurrency keys + event waits",
      "Six-provider AI orchestration shipped solo",
      "System-level debugging of subtitle drift via ASR-on-rendered-video",
      "Self-healing pipeline with permanent vs transient failure classification",
    ],
    metrics: [
      { label: "Per video", value: "~6 min" },
      { label: "AI providers", value: "6" },
      { label: "Edge functions", value: "17" },
      { label: "Manual time saved", value: "2–3 hr → 1 click" },
    ],
    videoSrc: "/portfolio/founder-voice-showcase.mp4",
  },
  {
    slug: "swiftee",
    title: "Swiftee Educational Video Platform",
    category: "Durable AI video pipeline · Hindi / Hinglish",
    oneLiner:
      "Type a topic, get a finished 60-second educational short with mascot, voice, and Hinglish subtitles.",
    summary:
      "Automated end-to-end video generation: a single Hindi/Hinglish topic prompt becomes a 10-slide vertical educational short with AI script, b-roll, ElevenLabs voiceover, burned-in Hinglish subtitles, music, and an animated mascot.",
    elevatorPitch:
      "A single Inngest durable function (~2,260 LOC) orchestrates Gemini, Kie.ai (image + i2v), ElevenLabs (TTS + STT), and Rendi (FFmpeg-as-a-service) into a retry-safe pipeline. Presets snapshot creative config per job so in-flight renders never break when the team iterates.",
    description:
      "Production pipeline for Slipchat (rural-India learning) that replaces a full creative team — scriptwriter, illustrator, voice artist, editor, motion designer — with one topic submission and a tuned preset.",
    tools: [
      "TanStack Start",
      "TypeScript",
      "Supabase",
      "Inngest",
      "Lovable AI Gateway",
      "Gemini Flash + Pro",
      "Kie.ai (grok-imagine)",
      "ElevenLabs TTS + Scribe",
      "Rendi (FFmpeg)",
    ],
    proves: [
      "2,000+ LOC durable workflow with named steps",
      "Multi-provider AI pipeline with realtime ops UX",
      "Production FFmpeg pipeline offloaded to Rendi",
      "Governance with RLS + SECURITY DEFINER role checks",
    ],
    flow: [
      "Topic",
      "Script",
      "Concepts",
      "Images",
      "Sifti i2v",
      "TTS",
      "STT + Hinglish",
      "FFmpeg merge",
      "MP4",
    ],
    role: "Lead engineer",
    status: "Production",
    year: "2025",
    problem:
      "Slipchat needs vernacular short-form video at catalog scale. Manual production took days per video (brief → script → storyboard → image sourcing → voice → edit → subtitle → music → export), was inconsistent across episodes, and was not economically viable.",
    solution:
      "TanStack Start frontend on Lovable Cloud. Operators submit a topic against a tuned preset; an Inngest durable function takes over and runs every external API call as a named `step.run`, every wait as a `step.sleep`. Output is one MP4 stored in Supabase Storage and surfaced in a realtime job dashboard.",
    buildNotes: [
      "Preset bundles slide count, voice ID, subtitle font/size/color, b-roll type, Sifti duration, zoompan, fade timings, and 4 AI system prompts",
      "Preset is snapshotted into `jobs.preset_snapshot` at submission — creative changes never break in-flight renders",
      "Kie.ai image batches of 3 to respect rate limits, with `step.sleep` + `step.run` poll loops for taskId completion",
      "ElevenLabs Scribe gives word-level timestamps used to build the global SRT; defensive fallbacks so subtitles never go blank",
      "Rendi normalizes scale/fps/pixfmt so per-slide visuals concat cleanly; final merge does concat + narration + music + burn SRT in one chained command",
      "Public webhook `/api/public/hooks/job-watchdog` rescues orphan / stuck jobs",
    ],
    keyDecisions: [
      {
        title: "Global narration instead of per-slide audio",
        detail:
          "Per-slide narration produced audible cuts at every slide boundary. Refactored to one global ElevenLabs pass with silent visuals adapted to audio length — diagnosed on a real job and shipped end-to-end.",
      },
      {
        title: "Gemini transliteration pass to Hinglish",
        detail:
          "Devanagari STT is accurate but slow to read for the audience. Added an LLM pass to transliterate to Latin Hinglish so subtitles are scannable; defensive fall-throughs keep captions never blank.",
      },
      {
        title: "Inngest over long-lived edge functions",
        detail:
          "Kie.ai latencies are minutes, ElevenLabs seconds, Rendi tens of seconds. Inngest checkpoints across all of them; edge functions stay short and stateless.",
      },
      {
        title: "Rendi for FFmpeg",
        detail:
          "FFmpeg in a Worker runtime is impossible (no native binaries, no child_process). Rendi offloads the entire merge and accepts chained commands in one round-trip.",
      },
    ],
    result: [
      "Topic → finished MP4 in minutes instead of days",
      "Fully reproducible output per preset",
      "Realtime job dashboard with no polling (Supabase Realtime + structured `job_events`)",
      "Self-healing of stuck Inngest steps via public watchdog webhook",
    ],
    recruiterHighlights: [
      "Single Inngest function at ~2,260 LOC with disciplined unique-step naming for determinism",
      "Audio-continuity refactor diagnosed on a real failing job and shipped",
      "Production FFmpeg pipeline via Rendi with normalized concat",
      "RLS + SECURITY DEFINER + immutable system presets + snapshotted job configs",
    ],
    metrics: [
      { label: "Per video", value: "Days → minutes" },
      { label: "AI providers", value: "5" },
      { label: "Pipeline LOC", value: "~2.2k" },
      { label: "Slides / video", value: "10" },
    ],
    videoSrc: "/portfolio/swiftee-showcase.mp4",
  },
  {
    slug: "lead-qualification",
    title: "AI Lead Qualification Platform",
    category: "Voice AI · Lead ops · Conversation analytics",
    oneLiner:
      "AI-powered lead qualification with chatbots, OTP verification, Voice AI, and conversation insights.",
    summary:
      "End-to-end lead qualification platform integrating chatbots, phone verification, OTP flows, SIP-based Voice AI calling, and AI-generated conversation summaries in a unified dashboard.",
    elevatorPitch:
      "Inbound leads are qualified through a multi-channel stack — web chatbot, OTP phone verification, and AI voice calls via SIP trunking — with every conversation analyzed for intent, objections, and next steps. Operators get a dashboard with AI-generated summaries instead of reading every transcript.",
    description:
      "Production platform that replaces manual lead triage with automated qualification, verification, and voice outreach — surfacing structured insights for sales teams.",
    tools: [
      "OpenAI",
      "ElevenLabs",
      "SIP Trunking",
      "Webhooks",
      "n8n",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "REST APIs",
    ],
    proves: [
      "Multi-channel lead qualification (chat, OTP, voice)",
      "Voice AI with SIP trunking integration",
      "Conversation analytics and AI summaries",
      "Production dashboard for sales ops",
    ],
    flow: [
      "Lead",
      "Chatbot",
      "OTP Verify",
      "Voice AI",
      "Analytics",
      "Dashboard",
    ],
    role: "Solo full-stack + AI engineer",
    status: "Production",
    year: "2025",
    problem:
      "Inbound leads sat unqualified in shared inboxes. Manual phone verification and triage slowed sales response. Call insights were trapped in recordings nobody had time to review.",
    solution:
      "A unified platform where leads enter via chatbot, pass OTP phone verification, get qualified by AI voice calls through SIP trunking, and surface in a dashboard with AI-generated conversation summaries and scoring.",
    buildNotes: [
      "Chatbot flow extracts firmographics and intent before routing to verification",
      "OTP verification gates high-value leads before voice outreach",
      "SIP trunking enables AI voice calls with ElevenLabs TTS and speech-to-text",
      "Conversation analytics pipeline extracts objections, sentiment, and action items",
      "Dashboard aggregates lead status, call outcomes, and AI summaries for sales reps",
    ],
    keyDecisions: [
      {
        title: "Multi-channel qualification, not chat-only",
        detail:
          "Phone verification and voice calls catch leads that chat alone misses — especially in markets where voice is the primary sales channel.",
      },
      {
        title: "AI summaries over raw transcripts",
        detail:
          "Sales reps get structured insights (intent, objections, next steps) instead of wall-of-text transcripts — dramatically faster triage.",
      },
      {
        title: "SIP trunking for production voice",
        detail:
          "Direct SIP integration gives control over call routing, recording, and cost — versus relying on a single SaaS voice provider.",
      },
    ],
    result: [
      "Every inbound lead qualified and routed within seconds",
      "Voice outreach automated with AI-generated conversation insights",
      "Sales team operates from a single dashboard with AI summaries",
      "OTP verification reduces junk leads before voice spend",
    ],
    recruiterHighlights: [
      "End-to-end Voice AI with SIP trunking in production",
      "Multi-channel qualification: chat → OTP → voice → analytics",
      "AI conversation summaries as a product feature, not a demo",
      "Full-stack: frontend dashboard, backend APIs, voice infra",
    ],
    metrics: [
      { label: "Channels", value: "Chat + Voice + OTP" },
      { label: "Voice AI", value: "SIP + ElevenLabs" },
      { label: "Insights", value: "AI summaries" },
      { label: "Status", value: "Production" },
    ],
  },
  {
    slug: "autograde",
    title: "AutoGrade — AI Paper Evaluation",
    category: "Vision-LLM pipeline · determinism + QC",
    oneLiner:
      "Upload a handwritten student paper, get auditable AI grades with bounding-box evidence in ~2 minutes.",
    summary:
      "Web app where teachers upload a question paper once, then each student's handwritten or scanned PDF. The system returns per-question marks, deductions with evidence, a split-view PDF viewer with bounding-box highlights, and a QC verdict.",
    elevatorPitch:
      "A fire-and-forget edge chain — extract → grade → qc-check — sidesteps the 150s serverless timeout by treating Postgres status as the orchestrator. Vision-LLM reads handwritten + Gujarati scripts; self-consistency voting at temp=0 makes grading deterministic; an arithmetic QC gate catches AI hallucinations before they reach the teacher.",
    description:
      "Handles real-world mess: handwriting, multi-page PDFs, mixed English/Gujarati scripts, merged sub-questions like `3(a,b,c)`, OMR-bubble roll number extraction — with an audit trail a teacher can defend to a parent.",
    tools: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "Supabase",
      "Edge Functions (Deno)",
      "Lovable AI Gateway",
      "Gemini 2.5 / 3.1 Pro Preview (vision)",
      "react-pdf",
    ],
    proves: [
      "Production vision-LLM application on real handwritten scripts",
      "LLM determinism as a product feature, not a prompt detail",
      "Pragmatic distributed-systems thinking around serverless timeouts",
      "Evidence-linked AI UX with bounding-box overlays",
    ],
    flow: [
      "QP Upload",
      "Parse",
      "Student PDF",
      "Extract",
      "Grade (parallel)",
      "QC Check",
      "Results",
    ],
    role: "Solo full-stack + AI engineer",
    status: "Shipped",
    year: "2025",
    problem:
      "A teacher with 60 students × 20 questions burns 6–10 hours per exam, with inconsistent strictness across the batch and zero traceability of why marks were deducted. No off-the-shelf product handles handwritten, multi-page, mixed-script papers with auditable evidence.",
    solution:
      "React/Vite SPA → Supabase (Postgres + RLS + Auth + Storage + Edge Functions) → Lovable AI Gateway (Gemini Pro, vision). Fire-and-forget edge chain with DB-status orchestration. react-pdf canvas rendering enables bounding-box evidence overlays.",
    buildNotes: [
      "4 Deno edge functions: parse-question-paper, extract, grade, qc-check — JWT-verified at the boundary, service-role for internal chaining",
      "Per-question parallel grading at `temp=0`, `top_p=0.1` with self-consistency voting for reproducible marks",
      "qc-check re-derives totals, verifies arithmetic, evaluates evidence quality, flags low-confidence questions; emits PASS / FLAG / FAIL",
      "react-pdf canvas (not iframe) renders pages so deductions can highlight the exact bounding box on click",
      "UI polls `evaluations.status` every 3s; progress bar maps pending→processing→grading→qc_check→completed",
      "Multi-tenant security: RLS on every table, private buckets with short-lived signed URLs, HIBP leaked-password protection",
    ],
    keyDecisions: [
      {
        title: "DB-as-orchestrator instead of Inngest/SQS",
        detail:
          "Work is self-bounded (one student paper) with no fan-out. Postgres status is the source of truth — inspectable with `SELECT status FROM evaluations`. The right level of complexity for the problem.",
      },
      {
        title: "Fire-and-forget edge chain",
        detail:
          "AI pipeline is 60–120s; edge timeout is 150s. Chaining functions via `fetch keepalive:true` decouples the long job from the HTTP request lifecycle.",
      },
      {
        title: "Determinism contract across every AI call",
        detail:
          "temp=0, top_p=0.1, self-consistency voting. Same paper graded twice produces the same marks — non-negotiable for teacher trust.",
      },
      {
        title: "Canvas (react-pdf), not iframe",
        detail:
          "Bypasses browser PDF sandboxing AND enables bounding-box overlays for evidence — required for the product UX.",
      },
    ],
    result: [
      "~90% reduction in grading time per batch",
      "Deterministic re-runs: identical paper → identical marks",
      "Zero arithmetic errors reach the teacher (QC gate)",
      "Every deduction defensible: click → bounding box on the rendered PDF",
    ],
    recruiterHighlights: [
      "Vision LLM in production on a messy real-world dataset",
      "Self-consistency + arithmetic QC as guardrails — not just prompting",
      "Timeout-driven architecture: design the workflow around the runtime constraint",
      "Evidence UX: every AI decision is traceable to a region on the page",
    ],
    metrics: [
      { label: "Grading time", value: "~90% saved" },
      { label: "Per paper", value: "~2 min" },
      { label: "Re-runs", value: "Deterministic" },
      { label: "Edge functions", value: "4" },
    ],
  },
  {
    slug: "pryzen-creatives",
    title: "Personalized Creative Distribution Platform",
    category: "Personalization pipeline · stable Drive URLs",
    oneLiner:
      "Two clicks fan out a co-branded creative to every distributor with a Google Drive link that never changes.",
    summary:
      "Internal admin tool that personalizes one marketing creative for many distributors at once. Operators design a reusable template (base image + named zones), then run a generation job that renders one personalized PNG per distributor and upserts it to a stable per-distributor Google Drive folder.",
    elevatorPitch:
      "TanStack Start on Cloudflare Workers + typed serverFn RPC + Supabase RLS. Browser-side Canvas rendering removes server image deps; a PATCH-by-filename upsert to Drive keeps every distributor's public URL stable so they can bookmark one folder forever.",
    description:
      "Brands that distribute through resellers must produce hundreds of co-branded creatives where only the footer changes per distributor. This tool turns hours of PSD duplication into a 2-click run with a permanent shareable link per distributor.",
    tools: [
      "TanStack Start",
      "React 19",
      "Vite 7",
      "TypeScript",
      "Tailwind v4",
      "shadcn/ui",
      "Supabase",
      "Fabric.js",
      "Cloudflare Workers",
      "Google Drive API",
      "Lovable Connector Gateway",
    ],
    proves: [
      "Typed RPC + JWT middleware on edge runtime",
      "WYSIWYG canvas tooling with portable coordinate model",
      "Stable-URL pipeline — small system, huge UX win",
      "Runtime-driven architecture decisions (Workers constraints)",
    ],
    flow: [
      "Template",
      "Zones",
      "Distributors",
      "Render (browser)",
      "ServerFn",
      "Drive Upsert",
      "Audit",
    ],
    role: "Solo full-stack engineer",
    status: "Production",
    year: "2025",
    problem:
      "Producing 100+ distributor-personalized versions of one creative meant duplicating PSDs, hand-typing details, exporting one-by-one, manually uploading to per-distributor Drive folders, and re-sharing links every cycle. Hours of repetitive work, frequent typos, broken links on refresh.",
    solution:
      "A web app where distributors live in a typed CRUD with Excel import, templates are designed in a Fabric.js WYSIWYG with preset-driven percentage zones, generation renders client-side on Canvas, and a PATCH-by-filename upsert to per-distributor Drive folders keeps every public URL stable.",
    buildNotes: [
      "Two-step template flow: preset picker (1:1 / 9:16 + 4 layouts) → Fabric.js editor with auto-placed zones",
      "Percentage-based zone model materialized to pixels at the actual image resolution — one config, two aspect ratios",
      "Client-side PNG render via HTML Canvas (`render-personalized.ts`) → base64 → server fn",
      "Server ensures the distributor's permanent folder exists (lazy backfill on 404), then PATCH-upserts the file so `webViewLink` never changes",
      "`generation_runs` + `generated_assets` rows form a full audit trail; denormalized name snapshots survive renames/deletes",
      "Excel bulk import for distributors; logos to Supabase Storage scoped by user id",
    ],
    keyDecisions: [
      {
        title: "Percentage zones over pixel zones",
        detail:
          "Decouples template design from base-image resolution. Adding 9:16 alongside 1:1 became a one-day change instead of a refactor.",
      },
      {
        title: "Upsert-by-filename, not versioned filenames",
        detail:
          "Distributors keep one stable URL forever. Operationally invisible, and the single most important reason users trust the tool.",
      },
      {
        title: "Browser-side render, not server-side",
        detail:
          "Cloudflare Workers can't run sharp/canvas/puppeteer. Moving to browser Canvas is free, fast, and removes a class of cold-start/timeout failures.",
      },
      {
        title: "Connector Gateway over per-user OAuth",
        detail:
          "Every operator writes to the company's Drive — a single workspace connection beats forcing each operator through OAuth.",
      },
    ],
    result: [
      "~3 minutes manual work per distributor → 1 click",
      "~5 hours saved per 100-distributor campaign",
      "Zero broken-link reports — per-distributor folder URL is permanent",
      "Full audit history that survives schema churn (denormalized snapshots)",
    ],
    recruiterHighlights: [
      "Stable-URL Drive pipeline (folder bootstrap + permission + PATCH-by-name upsert + lazy backfill)",
      "Strict typed RPC on Cloudflare Workers with Supabase JWT middleware",
      "WYSIWYG Fabric.js editor with portable percentage-coordinate model",
      "Runtime-driven decision: server image deps → moved render to browser",
    ],
    metrics: [
      { label: "Per distributor", value: "~3 min → 1 click" },
      { label: "Per 100-distributor run", value: "~5 hr saved" },
      { label: "Drive URL stability", value: "Permanent" },
      { label: "Aspect ratios", value: "1:1 + 9:16" },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
