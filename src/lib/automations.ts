export type AutomationAsset = {
  id: string;
  label: string;
  type: "video" | "audio" | "slides" | "image" | "dashboard";
  /** Set to a URL or `/public/...` path when you have real output files */
  src?: string;
  duration?: string;
  meta?: string;
  /** Video orientation — use "portrait" for 9:16 reels. Defaults to landscape. */
  aspect?: "portrait" | "landscape";
};

export type AutomationLink = {
  label: string;
  href: string;
  /** Highlights the link as the primary call-to-action */
  primary?: boolean;
};

export type Automation = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric: string;
  flow: [string, string, string];
  problem: string;
  workflow: string;
  /** Ordered, plain-language architecture steps shown as a numbered list */
  architecture?: string[];
  outcome: string;
  assets: AutomationAsset[];
  /** Live demo / reference links (e.g. deployed chatbots) */
  links?: AutomationLink[];
};

export const automations: Automation[] = [
  {
    id: "panchang-video",
    title: "Lion Kitchen Panchang Video Automation",
    category: "AI Content",
    description:
      "Daily Panchang videos generated automatically using mascot-driven AI content workflows.",
    tags: ["n8n", "OpenRouter", "ElevenLabs", "Video Generation"],
    metric: "Daily",
    flow: ["Calendar", "AI Agent", "Video"],
    problem:
      "Daily mascot-driven Panchang videos were unsustainable to produce by hand.",
    workflow:
      "Cron n8n workflow → Panchang data → OpenRouter script → ElevenLabs voice → mascot video compose → publish.",
    outcome: "Fully unattended daily video — script to publish with zero manual touch.",
    assets: [
      {
        id: "panchang-day-1",
        label: "Daily Panchang — Edition 1",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1780983643/FInal%20Merged%20Video%20of%20Lion%20Panchang/lcxklmgkzdzdz0enm25s.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "panchang-day-2",
        label: "Daily Panchang — Edition 2",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1781258462/FInal%20Merged%20Video%20of%20Lion%20Panchang/fmcpt1gpphrafgo8x1wa.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "panchang-day-3",
        label: "Daily Panchang — Edition 3",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1781688738/FInal%20Merged%20Video%20of%20Lion%20Panchang/m7585uwcfyoc44e8pw6k.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "panchang-day-4",
        label: "Daily Panchang — Edition 4",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1782120285/FInal%20Merged%20Video%20of%20Lion%20Panchang/rxu10r5b8juoe0pimjns.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "panchang-day-5",
        label: "Daily Panchang — Edition 5",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1782202298/FInal%20Merged%20Video%20of%20Lion%20Panchang/kdsxvpruhcxw8d9vvrvl.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "panchang-day-6",
        label: "Daily Panchang — Edition 6",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1782369246/FInal%20Merged%20Video%20of%20Lion%20Panchang/ltbedadaz37ukkuwj68b.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "panchang-day-7",
        label: "Daily Panchang — Edition 7",
        type: "video",
        aspect: "portrait",
        src: "https://res.cloudinary.com/dhweqbxwt/video/upload/v1782549174/FInal%20Merged%20Video%20of%20Lion%20Panchang/np294sru5vf7vmtru47o.mp4",
        meta: "Mascot · voice · auto-publish",
      },
      {
        id: "script-preview",
        label: "Generated script",
        type: "dashboard",
        meta: "OpenRouter · daily cron",
      },
    ],
  },
  {
    id: "song-pipeline",
    title: "Personalized Jingle Generator (650+)",
    category: "Media",
    description:
      "Bilingual brand jingles generated per business at scale — custom English and Hindi/Hinglish songs written and sung by AI, personalized to each store.",
    tags: ["n8n", "OpenRouter", "Lyria 3 Pro", "Google Drive", "Gemini", "GPT-5.5"],
    metric: "650+ jingles",
    flow: ["Sheet", "AI + Lyria", "Drive"],
    problem:
      "650+ stores each needed their own personalized jingle — in English and Hindi — which is impossible to write, sing, and produce by hand.",
    workflow:
      "Store data sheet → AI builds a pronunciation-safe lyric + Lyria prompt per store → Lyria 3 Pro sings the English & Hindi versions → audio saved to Drive and status written back.",
    architecture: [
      "Google Sheets holds every store's profile — name, city, category, fabric and tailoring specialty — plus a status column for batch tracking.",
      "n8n filters to pending rows and processes one store at a time with rate-limit pauses.",
      "A pronunciation step builds an exact, singable spelling of each store and city name for both English and Hindi.",
      "An OpenRouter agent (Gemini 3.1 Pro, GPT-5.5 fallback) writes a full bilingual jingle package — title, lyrics, style, and a Lyria prompt — validated against a strict schema.",
      "Google Lyria 3 Pro generates the actual sung audio for the English and Hindi/Hinglish versions via streaming.",
      "If Lyria's safety filter blocks a track, a dedicated rewrite agent produces a safer version and retries automatically.",
      "Finished MP3s are uploaded to a per-store Google Drive folder and the sheet is updated with links and status.",
    ],
    outcome:
      "650+ personalized, brand-safe jingles — two languages each — produced through one durable, self-healing pipeline.",
    assets: [
      {
        id: "darshan-en",
        label: "Darshan Tailors & Drapers — English",
        type: "audio",
        src: "/portfolio/Darshan_Tailors_Drapers_1364_English.mp3",
        meta: "Lyria 3 Pro · personalized jingle",
      },
      {
        id: "darshan-hi",
        label: "Darshan Tailors & Drapers — Hindi",
        type: "audio",
        src: "/portfolio/Darshan_Tailors_Drapers_1364_Hindi.mp3",
        meta: "Lyria 3 Pro · personalized jingle",
      },
      {
        id: "aaalski-en",
        label: "Aaalski — English",
        type: "audio",
        src: "/portfolio/Aaalski_4938_English.mp3",
        meta: "Lyria 3 Pro · personalized jingle",
      },
      {
        id: "aaalski-hi",
        label: "Aaalski — Hindi",
        type: "audio",
        src: "/portfolio/Aaalski_4938_Hindi.mp3",
        meta: "Lyria 3 Pro · personalized jingle",
      },
      {
        id: "sheet-status",
        label: "Batch status sheet",
        type: "dashboard",
        meta: "650+ rows · auto-updated",
      },
    ],
  },
  {
    id: "slides-system",
    title: "600+ Slide Generation System",
    category: "Content",
    description:
      "Curriculum slide decks generated end-to-end — each slide is an AI-rendered 16:9 visual built from a content sheet, then assembled into Google Slides with speaker notes.",
    tags: ["n8n", "OpenRouter", "Nano Banana Pro", "Google Slides", "Gemini"],
    metric: "600+ slides",
    flow: ["Sheet", "AI Image", "Slides"],
    problem:
      "Building 600+ on-brand teaching slides by hand — one custom visual per lesson block — would take weeks and inevitably drift off-style.",
    workflow:
      "Google Sheet of lesson blocks → AI writes an image prompt per row → Nano Banana Pro renders a 16:9 slide → pushed into Google Slides as a full-bleed background with auto speaker notes.",
    architecture: [
      "Google Sheets holds the curriculum — each row is a lesson block with a visual-aid description, week, and slide note.",
      "n8n loops through one row at a time; rows marked N/A are skipped automatically.",
      "An OpenRouter agent (Gemini 3 Flash) turns each description into a single production-ready image prompt with strict brand rules — palette, layout, and 16:9 ratio.",
      "The prompt is sent to Kie.ai's Nano Banana Pro model, which renders the slide image.",
      "A polling loop watches the job state (success / generating / fail) until the final image URL is ready.",
      "The Google Slides API creates a blank slide and sets the rendered image as a full-bleed background.",
      "Speaker notes — week, block, and description — are written onto each slide, then the loop moves to the next row.",
    ],
    outcome:
      "600+ consistent, on-brand teaching slides produced unattended — from a single spreadsheet to a finished Google Slides deck.",
    assets: [
      {
        id: "deck-preview",
        label: "Generated slide deck",
        type: "slides",
        src: "https://docs.google.com/presentation/d/1GsrOkbvv7g0tZcMybRegghptfwHtZUhoE2UzfMbhk3Y/embed?start=false&loop=false",
        meta: "AI-rendered · live Google Slides deck",
      },
    ],
    links: [
      {
        label: "Open the full deck",
        href: "https://docs.google.com/presentation/d/1GsrOkbvv7g0tZcMybRegghptfwHtZUhoE2UzfMbhk3Y/edit?usp=sharing",
      },
    ],
  },
  {
    id: "whatsapp-dist",
    title: "WhatsApp Distributor Automation",
    category: "Ops",
    description:
      "Personalized creative assets distributed to distributor networks via WhatsApp.",
    tags: ["WhatsApp API", "Canvas", "Automation"],
    metric: "500+ recipients",
    flow: ["CRM", "Canvas", "WhatsApp"],
    problem:
      "500+ personalized creatives per campaign was a multi-hour manual job.",
    workflow:
      "Canvas template per distributor from CRM → WhatsApp Business API dispatch with tracking.",
    outcome: "Hours of manual work collapsed to a 2-click campaign run.",
    assets: [
      {
        id: "creative-a",
        label: "Distributor creative A",
        type: "image",
        meta: "Co-branded · 1:1",
      },
      {
        id: "creative-b",
        label: "Distributor creative B",
        type: "image",
        meta: "Co-branded · 9:16",
      },
      {
        id: "delivery-log",
        label: "Delivery tracking",
        type: "dashboard",
        meta: "500+ sent · read receipts",
      },
    ],
  },
  {
    id: "lead-qual",
    title: "AI Lead Qualification Chatbot",
    category: "Conversational AI",
    description:
      "Conversational AI that replaces boring lead forms — it chats with Meta-ad visitors using a company knowledge bank, qualifies them, verifies their number over OTP, and syncs clean leads to the client's CRM.",
    tags: ["AI Chatbot", "Meta Ads", "MSG91", "DLT OTP", "CRM"],
    metric: "Live",
    flow: ["Meta Ad", "AI Chat", "CRM"],
    problem:
      "Meta-ad traffic dropped off at static, boring lead forms — and the leads that did come through were unqualified and unverified.",
    workflow:
      "Meta ad → AI chatbot with company knowledge → natural qualifying conversation → OTP verification (DLT + MSG91) → verified lead to client CRM + analytics dashboard.",
    architecture: [
      "Leads arrive from Meta ad campaigns and land in an AI chatbot instead of a static form.",
      "The chatbot is built on the company's own knowledge bank, so it answers questions and holds a natural conversation.",
      "Instead of a boring form, it asks the right qualifying questions and extracts the exact values the business needs.",
      "Phone numbers are verified in-chat via OTP using DLT-approved templates through MSG91.",
      "Verified, qualified leads are pushed straight to the client's CRM.",
      "The same leads flow into our dashboard, where they can be filtered and analyzed.",
    ],
    outcome:
      "Higher-converting, fully verified leads captured through natural conversation — synced to CRM and ready to action.",
    assets: [
      {
        id: "leadqual-chat-analysis",
        label: "Conversation analysis",
        type: "image",
        src: "/portfolio/leadqual-chat-analysis.png",
        meta: "Per-lead chat breakdown",
      },
      {
        id: "leadqual-leads",
        label: "Lead queue & qualification",
        type: "image",
        src: "/portfolio/leadqual-leads.png",
        meta: "Hot / warm · call queue",
      },
      {
        id: "leadqual-analytics",
        label: "Funnel & analytics",
        type: "image",
        src: "/portfolio/leadqual-analytics.png",
        meta: "Reach → verified → captured",
      },
    ],
    links: [
      { label: "NAMTECH — Live in production", href: "https://chat.namtech.ac/", primary: true },
      { label: "Annalaxmi — Live", href: "https://annalaxmi.com/join" },
    ],
  },
  {
    id: "voice-analysis",
    title: "AI Voice Calling & Call Analysis",
    category: "Voice AI",
    description:
      "An AI voice agent that places real phone calls over SIP, then turns every recording into structured insight — summary, sentiment, and next actions on a live dashboard.",
    tags: ["ElevenLabs", "Vobiz SIP", "VoIP", "Webhooks", "AI Analysis"],
    metric: "Live",
    flow: ["SIP Call", "AI Agent", "Analysis"],
    problem:
      "Outreach calls carried valuable signal, but recordings were never reviewed and the insight was lost.",
    workflow:
      "Vobiz SIP trunk connects to an ElevenLabs voice agent → AI runs the live call → post-call webhook → our app extracts summary, sentiment, and actions into a dashboard.",
    architecture: [
      "Vobiz provides the SIP trunking, carrying calls over SIP / VoIP protocols to and from real phone numbers.",
      "The trunk connects to an ElevenLabs voice agent that holds the call logic, prompt, and knowledge base.",
      "ElevenLabs runs the live conversation end-to-end — speaking, listening, and following the call flow.",
      "When the call ends, an ElevenLabs webhook posts the recording and transcript to our custom app.",
      "The app uses AI to extract structured data — summary, sentiment, outcome, and follow-up actions.",
      "Everything lands in a dashboard with conversation history, analytics, and per-call detail.",
    ],
    outcome:
      "Every call is placed, transcribed, and analyzed automatically — searchable insight and analytics with zero manual review.",
    assets: [
      {
        id: "voice-conversations",
        label: "Conversations dashboard",
        type: "image",
        src: "/portfolio/voice-conversations.png",
        meta: "Status · sentiment · outcomes",
      },
      {
        id: "voice-call-detail",
        label: "Call detail — recording & transcript",
        type: "image",
        src: "/portfolio/voice-call-detail.png",
        meta: "AI summary · full transcript",
      },
      {
        id: "voice-analytics",
        label: "Performance analytics",
        type: "image",
        src: "/portfolio/voice-analytics.png",
        meta: "Funnel · connect rate · trends",
      },
    ],
  },
  {
    id: "content-repurpose",
    title: "Content Repurposing Workflow",
    category: "AI Content",
    description:
      "Transform long-form content into multiple social media formats automatically.",
    tags: ["OpenAI", "Automation", "Content Pipeline"],
    metric: "Multi-format",
    flow: ["Content", "Workflow", "Distribution"],
    problem: "Long-form published once, never adapted per platform.",
    workflow:
      "Source doc → format-specific prompts → threads, posts, scripts, newsletter snippets.",
    outcome: "One piece becomes a full multi-channel content drop.",
    assets: [
      {
        id: "linkedin",
        label: "LinkedIn post output",
        type: "image",
        meta: "From 1 source doc",
      },
      {
        id: "thread",
        label: "Twitter thread",
        type: "slides",
        meta: "8 posts · auto-split",
      },
      {
        id: "video-script",
        label: "Short-form script",
        type: "video",
        duration: "0:60",
        meta: "Vertical · hook-first",
      },
    ],
  },
  {
    id: "internal-ops",
    title: "Internal Business Automation",
    category: "Internal",
    description:
      "Operational workflow automation for repetitive business processes.",
    tags: ["n8n", "API", "Automation"],
    metric: "Weekly saves",
    flow: ["Input", "Workflow", "Output"],
    problem: "Recurring ops tasks burned hours across multiple SaaS tools.",
    workflow:
      "n8n stitches APIs/webhooks, normalizes data, writes back to tools of record.",
    outcome: "Hours of weekly manual work replaced with reliable runs.",
    assets: [
      {
        id: "run-log",
        label: "Automation run log",
        type: "dashboard",
        meta: "Retries · status · audit",
      },
      {
        id: "integration-map",
        label: "Integration map",
        type: "image",
        meta: "APIs · webhooks · sync",
      },
    ],
  },
];

export const automationStats = [
  { value: "8", label: "workflows" },
  { value: "650+", label: "jingles" },
  { value: "600+", label: "slides" },
  { value: "Daily", label: "automations" },
];
