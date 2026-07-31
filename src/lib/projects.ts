export type ProjectMetric = { label: string; value: string };

export type ProjectGalleryImage = {
  src: string;
  label: string;
};

export type ProjectSampleOutput = {
  topic: string;
  description?: string;
  videoSrc: string;
  series?: string;
};

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
  thumbnailSrc?: string;
  videoSrc?: string;
  gallery?: ProjectGalleryImage[];
  sampleOutputs?: ProjectSampleOutput[];
};

export const projects: Project[] = [
  {
    slug: "founder-video-pipeline",
    title: "Founder Voice",
    category: "Founder content automation · LinkedIn / Instagram",
    oneLiner:
      "Turn an approved founder script into a news-grounded, publish-ready short — avatar, b-roll, captions, music — delivered to Telegram.",
    summary:
      "Founder Voice converts founder opinions into complete LinkedIn and Instagram videos. Choose a founder, paste a script, follow the live pipeline, inspect the word-anchored edit plan and news references, then review the finished cut.",
    elevatorPitch:
      "A durable Inngest pipeline stitches Telegram workflow, AI script/voice, HeyGen avatars, news-grounded b-roll, captions, and FFmpeg compositing behind one approve action. Typical manual edit time drops from about three hours to about four minutes — with duplicate-render protection and live stage observability.",
    description:
      "Production platform for founder-led short-form: Telegram intake, voice cloning, AI avatars, b-roll, subtitles, automated rendering, and publish-ready delivery — orchestrated with Inngest, Supabase, and a multi-provider AI stack.",
    tools: [
      "Telegram",
      "Inngest",
      "OpenRouter",
      "ElevenLabs",
      "HeyGen",
      "FFmpeg",
      "Supabase",
      "Railway",
      "TypeScript",
      "React",
    ],
    proves: [
      "End-to-end founder content pipeline in production",
      "Word-level transcript anchors for edits and captions",
      "News-grounded b-roll research, not generic stock",
      "Durable multi-provider orchestration with Inngest",
    ],
    flow: [
      "Founder",
      "Script",
      "TTS + Avatar",
      "Edit plan",
      "News + B-roll",
      "Captions",
      "Composite",
      "Telegram",
    ],
    role: "Solo full-stack + AI infra engineer",
    status: "Production",
    year: "2025",
    problem:
      "Founder-led LinkedIn and Instagram video converts, but production does not scale. Ghostwriters and editors stitched voice, HeyGen, CapCut, captions, and stock b-roll by hand — hours per post, inconsistent style per founder, and no durable state when a provider failed mid-render.",
    solution:
      "Founder Voice: pick a founder profile (voice, avatar, caption style), paste an approved script, and send. A live pipeline renders the avatar, anchors every edit to exact transcript words, pulls real news references for b-roll, burns captions and music, then delivers the finished vertical video to Telegram — ready to publish.",
    buildNotes: [
      "Telegram workflow for intake and delivery — operators approve and receive without leaving chat",
      "Per-founder config (voice ID, HeyGen avatar, prompts, caption preset, music) so one pipeline serves many identities",
      "Word-anchored edit plan: every cut and caption lands on exact transcript words from ASR on the rendered avatar video",
      "News research feeds b-roll so visuals stay topical instead of generic stock loops",
      "Duplicate-render protection so retries and restarts do not burn credits twice",
      "Inngest durable steps with live pipeline UI — stage status and provider errors visible while the job runs",
    ],
    keyDecisions: [
      {
        title: "Approve-to-Telegram as the product loop",
        detail:
          "The operator experience is intentionally small: choose founder → paste script → watch pipeline → get MP4 in Telegram. Everything else (TTS, avatar, research, captions, composite) is infrastructure behind that loop.",
      },
      {
        title: "Word-level transcript anchors, not guessed timings",
        detail:
          "Edits and captions are tied to ASR on the rendered talking-head video so timing survives HeyGen lead-in and re-encode — the difference between “almost synced” and publishable.",
      },
      {
        title: "News-grounded b-roll over stock libraries",
        detail:
          "B-roll is driven by real news references for the script, so each founder video feels current and specific rather than filled with generic footage.",
      },
      {
        title: "Inngest for durable multi-provider orchestration",
        detail:
          "ElevenLabs, HeyGen, research, and render each fail independently. Named durable steps, concurrency keys, and event waits keep the pipeline retry-safe without a homegrown queue.",
      },
    ],
    result: [
      "Manual edit time: ~3 hours → ~4 minutes of unattended pipeline + one approve",
      "Publish-ready LinkedIn / Instagram verticals with avatar, captions, music, and topical b-roll",
      "Word-anchored edit plans operators can inspect before trusting the cut",
      "Duplicate-render protection and live stage observability in production",
    ],
    recruiterHighlights: [
      "Shipped a full founder content product: Telegram → multi-AI render → Telegram delivery",
      "Transcript-anchored editing as a reliability feature, not a caption afterthought",
      "News-grounded b-roll pipeline instead of stock filler",
      "Durable Inngest orchestration across voice, avatar, research, and FFmpeg",
    ],
    metrics: [
      { label: "Manual → auto", value: "~3 hr → ~4 min" },
      { label: "Output", value: "LinkedIn / IG short" },
      { label: "Delivery", value: "Telegram" },
      { label: "Status", value: "Production" },
    ],
    thumbnailSrc: "/portfolio/case-study-thumbnails/founder-voice.png",
    videoSrc: "/portfolio/founder-voice-showcase.mp4",
    gallery: [
      {
        src: "/portfolio/founder/new-script.png",
        label: "Script intake — paste an approved founder script",
      },
      {
        src: "/portfolio/founder/pipeline.png",
        label: "Live pipeline — avatar, edit plan, news, captions",
      },
    ],
  },
  {
    slug: "swiftee",
    title: "Swiftee Educational Video Platform",
    category: "Educational AI video · Hindi / Hinglish · Slipchat",
    oneLiner:
      "One topic in → a publish-ready 60-second Hindi educational short with mascot, voice, subtitles, and thumbnail.",
    summary:
      "Swiftee turns a single topic into a 10-slide Hinglish script, then generates mascot, voiceover, b-roll, subtitles, music, and thumbnail in parallel — stitching a finished 9:16 video for Slipchat’s rural-learning catalog.",
    elevatorPitch:
      "Configurable storytelling presets drive an Inngest durable pipeline (Gemini, Kie.ai, ElevenLabs, Rendi/FFmpeg). Jobs show slide-by-slide progress; only failed slides need regeneration. Operators get a finished short in minutes instead of a multi-day creative cycle.",
    description:
      "Mascot-based educational video generator for vernacular short-form: AI script, character animation, voiceover, image/video generation, subtitle burn-in, music, and automated render — controlled by presets so every episode stays on-brand.",
    tools: [
      "TanStack Start",
      "TypeScript",
      "Supabase",
      "Inngest",
      "Gemini",
      "Kie.ai",
      "ElevenLabs",
      "Rendi (FFmpeg)",
      "Lovable AI Gateway",
    ],
    proves: [
      "Topic → finished 9:16 educational short in production",
      "Parallel multi-asset AI generation with slide-level recovery",
      "Hinglish script + scannable Latin subtitles for vernacular audiences",
      "Preset-driven storytelling that stays stable mid-render",
    ],
    flow: [
      "Topic",
      "10-slide script",
      "Mascot + images",
      "Voiceover",
      "Subtitles",
      "Music + thumb",
      "FFmpeg merge",
      "9:16 MP4",
    ],
    role: "Lead engineer",
    status: "Production",
    year: "2025",
    problem:
      "Slipchat needs Hindi educational shorts at catalog scale for rural learners. Manual production — brief, script, storyboard, art, voice, edit, subtitles, music, export — took days per episode, drifted in quality, and could not keep up with curriculum demand.",
    solution:
      "Operators submit one topic against a storytelling preset. Swiftee writes a 10-slide Hinglish script, then runs mascot, voiceover, b-roll, subtitles, music, and thumbnail generation in parallel. The job dashboard shows slide-by-slide progress; failed slides regenerate without re-running the whole video. Output is a publish-ready 60-second 9:16 short.",
    buildNotes: [
      "Configurable storytelling presets: slide count, voice, subtitle style, b-roll type, timing, and AI system prompts",
      "Preset snapshotted onto each job so creative tweaks never break in-flight renders",
      "Parallel asset generation — script, mascot/images, VO, captions, music, thumbnail — then a single FFmpeg stitch",
      "Slide-level progress UI; regenerate only the failed slide instead of the entire episode",
      "Hinglish script with a transliteration pass so on-screen captions stay easy to scan",
      "Rendi (FFmpeg-as-a-service) for normalize → concat → narration → music → burn SRT in one merge",
    ],
    keyDecisions: [
      {
        title: "Topic → short as the product contract",
        detail:
          "The success metric is a finished 60-second Hindi educational video, not a pile of intermediate assets. Everything in the pipeline exists to protect that outcome.",
      },
      {
        title: "Parallel production with slide-level recovery",
        detail:
          "Assets generate in parallel for speed; the dashboard tracks each slide so a single Kie/ElevenLabs failure does not force a full restart.",
      },
      {
        title: "Presets for vernacular storytelling consistency",
        detail:
          "Mascot tone, voice, subtitle look, and prompt packs live in presets — curriculum teams get repeatable episodes without re-tuning the model stack every run.",
      },
      {
        title: "Inngest + Rendi for long media jobs",
        detail:
          "Image/i2v and FFmpeg steps take minutes. Durable Inngest steps checkpoint provider waits; Rendi owns FFmpeg so the app runtime stays free of native binaries.",
      },
    ],
    result: [
      "Topic → finished 9:16 Hindi short in minutes instead of days",
      "10-slide Hinglish episodes with mascot, VO, subtitles, music, and thumbnail",
      "Slide-by-slide ops: regenerate failures without re-rendering the whole video",
      "Preset-locked output suitable for Slipchat’s rural education catalog",
    ],
    recruiterHighlights: [
      "Shipped vernacular educational video automation end-to-end for Slipchat",
      "Parallel AI production pipeline with slide-level failure recovery",
      "Preset architecture that keeps storytelling stable under iteration",
      "Production FFmpeg merge via Rendi on a durable Inngest workflow",
    ],
    metrics: [
      { label: "Length", value: "60s · 9:16" },
      { label: "Slides", value: "10" },
      { label: "Language", value: "Hindi / Hinglish" },
      { label: "Cycle time", value: "Days → minutes" },
    ],
    thumbnailSrc: "/portfolio/case-study-thumbnails/swiftee.png",
    videoSrc: "/portfolio/swiftee-showcase.mp4",
    sampleOutputs: [
      {
        series: "Educational shorts",
        topic: "How The Amul Revolution Changed India",
        description:
          "The White Revolution that transformed dairy farming.",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/32240e78-f433-4743-ae8b-6393bbe44203.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy8zMjI0MGU3OC1mNDMzLTQ3NDMtYWU4Yi02MzkzYmJlNDQyMDMubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1NCwiZXhwIjoyMTAwODMxNTU0fQ.4FdsZsZX5oBmmstY0oY6AlxhVXh1YFOowc6RPB1ZoOA",
      },
      {
        series: "Educational shorts",
        topic: "Who Hid The Treasure Of Padmanabhaswamy Temple",
        description: "The mystery behind one of the world's richest temples. (v1)",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/67914d98-0411-40ea-9a6a-6a6aa45a9569.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy82NzkxNGQ5OC0wNDExLTQwZWEtOWE2YS02YTZhYTQ1YTk1NjkubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1NSwiZXhwIjoyMTAwODMxNTU1fQ.6Z8VSAVcBq-tBqFTzaN-Bqg9aFLuDy4LyjjxdUkOV0I",
      },
      {
        series: "Educational shorts",
        topic: "The First Indian To Travel Into Space",
        description: "The incredible journey of Rakesh Sharma.",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/8dcd4853-7dbc-4af0-ad7f-dd3f9d265495.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy84ZGNkNDg1My03ZGJjLTRhZjAtYWQ3Zi1kZDNmOWQyNjU0OTUubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1NiwiZXhwIjoyMTAwODMxNTU2fQ.w_a-64mFmj9CL_SBfBTmy6iGdkvtVmHLv3A3znHDpaA",
      },
      {
        series: "Educational shorts",
        topic: "Who Hid The Treasure Of Padmanabhaswamy Temple",
        description: "The mystery behind one of the world's richest temples. (v2)",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/ea516091-3b8f-4d78-926f-036246134b71.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy9lYTUxNjA5MS0zYjhmLTRkNzgtOTI2Zi0wMzYyNDYxMzRiNzEubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1NiwiZXhwIjoyMTAwODMxNTU2fQ.ExAhnPCE7Qzf-NI5zpbyFUFXGVZo1jvRwSzE88dgZzw",
      },
      {
        series: "Chintu Mastermind",
        topic: "Why blood is red",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/3e75941e-b132-401b-b45b-4e54ffc14e8c.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy8zZTc1OTQxZS1iMTMyLTQwMWItYjQ1Yi00ZTU0ZmZjMTRlOGMubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1NywiZXhwIjoyMTAwODMxNTU3fQ.nbHKXzNRB7yaEQ33ysRK-VVUSHq2k30_2sRkxAOoJ-0",
      },
      {
        series: "Chintu Mastermind",
        topic: "Why songs get stuck in your head",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/1b3e1e93-3c1e-430f-8548-4ad8e4a7ad0a.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy8xYjNlMWU5My0zYzFlLTQzMGYtODU0OC00YWQ4ZTRhN2FkMGEubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1NywiZXhwIjoyMTAwODMxNTU3fQ.N1tf4ukIaMgBdptg1D71-c494xXRtrYtL4OoYnqUols",
      },
      {
        series: "Chintu Mastermind",
        topic: "What is a black hole?",
        videoSrc:
          "https://upaiwipfawvofthppwlu.supabase.co/storage/v1/object/sign/swiftee-videos/2b9d1a53-de72-4eac-85e9-9a9e6097bfe4.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lN2E4NzhjMC1jNjhhLTQxMDItYTZlNy05OWRiNWFjNDRmZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzd2lmdGVlLXZpZGVvcy8yYjlkMWE1My1kZTcyLTRlYWMtODVlOS05YTllNjA5N2JmZTQubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NTQ3MTU1OCwiZXhwIjoyMTAwODMxNTU4fQ.W1Snf42UVfnS9yypoZCOepWIdnUGlb3JEJ0yNGRCmxE",
      },
    ],
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
    thumbnailSrc: "/portfolio/case-study-thumbnails/lead-qualification.png",
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
    thumbnailSrc: "/portfolio/case-study-thumbnails/autograde.png",
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
    thumbnailSrc:
      "/portfolio/case-study-thumbnails/personalized-creative-distribution.png",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
