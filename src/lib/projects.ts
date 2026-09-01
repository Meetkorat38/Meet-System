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
  /** Shown when a project was a team effort — states what was and was not mine. */
  collaboration?: string;
};

export const projects: Project[] = [
  {
    slug: "foresight",
    title: "Foresight — AI Financial Intelligence",
    category: "AWS medallion data lake · Bedrock RAG · CFO analytics",
    oneLiner:
      "Spreadsheet sprawl becomes a governed AWS data lake a CFO can ask questions of in plain English.",
    summary:
      "Foresight is an AI financial intelligence platform for CFOs. Client finance data moves through a four-layer medallion lake on S3 — pseudo-bronze to bronze to silver to gold — and Claude on Amazon Bedrock generates KPIs, variance summaries, and narrative insight grounded in the modelled tables rather than the raw files.",
    elevatorPitch:
      "A four-layer medallion lake on S3 with Glue ETL and Athena over Parquet, with Claude on Bedrock answering in natural language above it. One rule shapes the whole design: Athena never touches the raw layers, and PII is stripped before data reaches silver — so the AI is structurally incapable of reading it. Inference stays in-region, so no financial record leaves the account.",
    description:
      "Built with the team for an Australian CFO-advisory practice, with a not-for-profit education provider as the pilot. Replaces Excel workbooks with query-ready tables covering delivery scheduling, supplier invoices, per-event P&L, aged receivables, and purchase-register spend.",
    tools: [
      "AWS S3",
      "AWS Glue",
      "Amazon Athena",
      "Amazon Bedrock",
      "Claude (Bedrock)",
      "Medallion architecture",
      "Parquet",
      "AWS KMS",
      "AWS CloudTrail",
      "AWS Secrets Manager",
      "AWS IAM",
      "OAuth connectors",
      "RAG",
    ],
    proves: [
      "Medallion data-lake design on AWS, not a notebook prototype",
      "Grounded RAG over governed tables instead of free-form prompting",
      "Privacy-by-design as an architectural constraint, not a checklist",
      "Data engineering under real regulatory obligations",
    ],
    flow: [
      "Finance systems",
      "Pseudo-bronze",
      "Bronze (Glue)",
      "Silver",
      "Gold",
      "Athena",
      "Bedrock + RAG",
      "CFO insight",
    ],
    role: "AI systems & data-platform engineer — team project",
    status: "Pilot",
    year: "2026",
    problem:
      "Finance for a multi-entity advisory client lived in Excel workbooks with no queryable source of truth. Scheduling, invoices, P&L, and receivables sat in separate files with inconsistent columns, so every board question meant rebuilding a spreadsheet by hand. Off-the-shelf tools got the arithmetic wrong by picking the wrong line items — and a CFO cannot act on a number nobody can trace.",
    solution:
      "A medallion lake on S3: raw workbooks land in pseudo-bronze, Glue ETL normalises them into bronze, and silver and gold hold the minimised, modelled tables. Athena queries those layers as Parquet; Claude on Bedrock turns a natural-language question into a query and grounds its answer in the rows that come back. Every figure traces to a table, and a person reviews before anything is treated as final.",
    buildNotes: [
      "Four-layer medallion split so raw PII and analytics-ready data never share a blast radius",
      "PII columns stripped before data reaches silver — the AI layer only ever sees minimised tables",
      "Athena scoped to silver and gold; it never queries pseudo-bronze or bronze directly",
      "Inference pinned to Bedrock in the client region so financial records never leave the account",
      "Connector-based access over OAuth (Xero, MYOB, Zoho, Salesforce) — fetch on demand rather than copy wholesale",
      "Credentials in Secrets Manager, KMS at rest, TLS in transit, CloudTrail on every data access",
      "Wrote the platform Data Privacy, Security & AI Usage Policy — the control set the build is measured against",
    ],
    keyDecisions: [
      {
        title: "Minimise before silver, not at query time",
        detail:
          "Stripping PII on the way into silver makes the AI layer structurally incapable of reading it. Filtering at query time would have left the raw columns one prompt-injection away from exposure.",
      },
      {
        title: "Grounded queries over a fine-tuned model",
        detail:
          "Claude generates SQL against known schemas and answers from the returned rows. Nothing is trained on client data, so there is no secondary-use problem and every number stays traceable to a table.",
      },
      {
        title: "Inference stays in-region on Bedrock",
        detail:
          "Data residency was a precondition, not a preference. Bedrock keeps the model call inside the same region and account as the lake — something external AI APIs could not offer.",
      },
      {
        title: "AI is advisory, with a human before any material action",
        detail:
          "Automated-decision transparency duties land in December 2026. Building human-in-the-loop review and contestability in from the start was far cheaper than retrofitting them after a client audit.",
      },
    ],
    result: [
      "Excel workbooks replaced by query-ready bronze-to-gold tables on S3",
      "Finance questions answered in natural language without hand-written SQL",
      "Privacy, security, and AI-usage controls documented and mapped to the AWS stack before pilot go-live",
      "Every AI-surfaced figure traceable to an underlying table and reviewable by a person",
    ],
    recruiterHighlights: [
      "Medallion data-lake architecture on S3, Glue, and Athena in a regulated setting",
      "Grounded RAG on Bedrock where accuracy is a compliance obligation, not a nice-to-have",
      "Authored the data-privacy and AI-usage policy the whole team builds against",
      "Least-privilege IAM, KMS, Secrets Manager, and CloudTrail treated as product requirements",
    ],
    metrics: [
      { label: "Lake layers", value: "4 · bronze → gold" },
      { label: "Query engine", value: "Athena on Parquet" },
      { label: "Inference", value: "Claude on Bedrock" },
      { label: "Residency", value: "In-region, KMS" },
    ],
    collaboration:
      "Built with the Because team on a shared budget — I do not claim sole authorship. My contribution was the platform Data Privacy, Security & AI Usage Policy that the build is measured against, plus the architecture and AI-layer work described here. The data lake was built alongside teammates.",
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
    slug: "cg-sanchar",
    title: "CG Sanchar — Multi-State WhatsApp Automation",
    category: "WhatsApp broadcast automation · multi-tenant · S3 + CloudFront",
    oneLiner:
      "One console generates, captions, reviews, and schedules branded creatives out to every state team's WhatsApp channel.",
    summary:
      "A scheduling and publishing tool for a multi-state education communications programme. Operators generate a state-branded creative or upload their own, get an auto-written caption, send it through review, and schedule it to the right WhatsApp channel over SwiftChat — with every state scoped to its own bots, channels, and people.",
    elevatorPitch:
      "The client security team refused to share IAM keys, so uploads run through a Lambda that mints time-limited presigned S3 URLs, and a private bucket sits behind CloudFront for delivery. Multi-state tenancy with three-level role scoping keeps each team inside its own channels. Around 170 creatives have shipped through the pipeline.",
    description:
      "Built and delivered against a live client through weekly requirement sessions — scoping, demoing, and shipping features week over week rather than against a fixed spec.",
    tools: [
      "React",
      "TypeScript",
      "Supabase",
      "AWS S3",
      "AWS CloudFront",
      "AWS Lambda",
      "Presigned URLs",
      "SwiftChat API",
      "WhatsApp Channels",
      "Role-based access control",
      "Lovable",
    ],
    proves: [
      "Multi-tenant access control across independent state teams",
      "Secure media pipeline designed to a client security team's constraints",
      "Client-facing delivery — requirements, demos, and launch coordination",
      "Content automation with a human review gate before publish",
    ],
    flow: [
      "Schedule",
      "Generate / upload",
      "Auto-caption",
      "Review",
      "Presigned upload",
      "S3 + CloudFront",
      "SwiftChat",
      "WhatsApp channel",
    ],
    role: "Lead engineer — build and client delivery",
    status: "Production",
    year: "2026",
    problem:
      "A national education communications programme needed branded posts going out across many state WhatsApp channels. Each state ran its own bots, channels, and staff, and every creative was produced and posted by hand — with nothing scoping one team out of another's channels, and no review step before something reached a public audience.",
    solution:
      "A single console where operators pick a channel, generate a state-branded creative with a fixed header panel or upload their own, get a caption written from the image and channel context, and schedule the post. Review sits between generation and publish. Uploads never touch shared credentials: a Lambda issues a short-lived presigned URL, the file goes straight to a private S3 bucket, and CloudFront serves it.",
    buildNotes: [
      "Multi-state tenancy — each state carries its own bots, channels, and team members",
      "Three-level access model: no access, view-only, and edit scoped to a user's own state",
      "Fixed header panel composited onto every generated creative so state branding stays consistent",
      "Captions auto-written from the image plus the selected channel, appending the bot link where one is set",
      "Custom uploads supported, with a toggle for whether the brand overlay is applied",
      "Image storage migrated off the app's own bucket onto the client AWS account mid-flight",
    ],
    keyDecisions: [
      {
        title: "Presigned URLs instead of shared IAM keys",
        detail:
          "The client security team would not hand over credentials, and they were right to refuse. A single Lambda endpoint mints a time-limited upload URL per file, so nothing long-lived is ever distributed — and file-size limits get enforced at the same layer.",
      },
      {
        title: "Private bucket behind CloudFront",
        detail:
          "The S3 bucket blocks public access entirely and CloudFront is the only public path to a creative. Delivery and storage permissions stop being the same decision.",
      },
      {
        title: "State-scoped roles over a single admin pool",
        detail:
          "Every team edits only its own state. With many teams publishing to public channels, the cost of a mis-scoped post is far higher than the cost of carrying a permission model.",
      },
      {
        title: "Review gate before anything reaches a channel",
        detail:
          "Generation is automated; publishing is not. An operator sees the creative and its caption before it goes out — the same human-in-the-loop rule that makes daily automated content safe to run.",
      },
    ],
    result: [
      "~170 creatives generated and published through the pipeline",
      "Manual per-state creative production replaced by generate, review, schedule",
      "No shared cloud credentials distributed — uploads run entirely on short-lived presigned URLs",
      "Each state team scoped to its own channels, with a review step before publish",
    ],
    recruiterHighlights: [
      "Designed a media pipeline around a client security team's hard constraints",
      "Multi-tenant role scoping across many independent state teams",
      "Ran the client relationship: weekly requirements, demos, and launch coordination",
      "Moved image storage onto the client's own AWS account without downtime",
    ],
    metrics: [
      { label: "Creatives shipped", value: "~170" },
      { label: "Scope", value: "Multi-state" },
      { label: "Access levels", value: "3 · none / view / edit" },
      { label: "Media delivery", value: "S3 + CloudFront" },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
