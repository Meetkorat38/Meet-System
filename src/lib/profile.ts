export const profile = {
  name: "Meet Korat",
  title: "AI Automation Engineer",
  email: "meetkorat903@gmail.com",
  linkedin: "https://www.linkedin.com/in/meet-korat-335632245/",
  github: "https://github.com/Meetkorat38",
  /** No public X/Twitter on CV or personal site — omit from UI when empty */
  twitter: "",
  website: "https://koratmeet.in",
  location: "Nava Naroda, Ahmedabad, India",
  avatar: "/avatar.png",

  summary:
    "AI Automation Engineer with experience building production-ready AI systems using LLMs, Voice AI, workflow automation, cloud infrastructure, and product engineering.",

  heroHeadline:
    "I build AI-powered systems that automate real business operations.",

  heroSubtext:
    "Over the past several months I've designed and delivered founder content automation platforms, educational video generators, AI lead qualification systems, paper evaluation platforms, and workflow automation solutions — turning complex business problems into scalable AI-assisted systems.",

  identity:
    "I build AI-powered operational systems that automate business processes, content generation, lead qualification, evaluation workflows, and internal operations. My work combines AI models, workflow automation, cloud infrastructure, APIs, and product engineering to build production-ready systems that solve real business problems.",

  whatIBring:
    "I don't simply integrate AI APIs. I design complete AI-powered operational systems that combine cloud infrastructure, workflow orchestration, automation, media generation, and product thinking to solve real business problems. My focus is building systems that businesses can reliably use in production — not isolated AI demonstrations.",

  careerGoal:
    "Join an AI-first product company or startup as an AI Automation Engineer or Applied AI Systems Engineer — building scalable AI products, learning from experienced engineers, and growing into a senior engineering role.",

  targetRoles: [
    "AI Automation Engineer",
    "Applied AI Systems Engineer",
    "AI Product Engineer",
    "Founding Engineer",
  ],

  stats: [
    { label: "Production projects", value: "5+" },
    { label: "AI providers integrated", value: "10+" },
    { label: "Songs generated", value: "650+" },
    { label: "Slides automated", value: "600+" },
  ],

  availability: {
    status: "Open to work",
    detail:
      "Actively interviewing for AI Automation Engineer and Applied AI Systems Engineer roles. Open to remote, hybrid, or relocation. Available to start immediately.",
    workArrangement: ["Remote", "Hybrid", "On-site (Ahmedabad)", "Relocation"],
  },
};

/**
 * Question/answer pairs written for how people and AI assistants actually ask
 * about a candidate. Feeds the on-page FAQ, FAQPage structured data, and the
 * /llms-full.txt corpus from one source.
 */
export const faq = [
  {
    question: "Who is Meet Korat?",
    answer:
      "Meet Korat is an AI Automation Engineer based in Ahmedabad, India. He builds production AI systems that automate real business operations — combining LLMs, Voice AI, workflow orchestration, cloud infrastructure, and product engineering. He currently works at Team Because and has shipped five production systems covering content automation, educational video generation, lead qualification, and paper evaluation.",
  },
  {
    question: "What does Meet Korat build?",
    answer:
      "Complete AI-powered operational systems rather than isolated API demos. His shipped work includes Foresight (an AI financial intelligence platform for CFOs built on an AWS medallion data lake with Claude on Bedrock, built with the team), Swiftee (a Hindi educational video platform generating 60-second shorts from a topic prompt), an AI lead qualification system with Voice AI and SIP calling, AutoGrade (a vision-LLM paper evaluation platform for handwritten and Gujarati scripts), and CG Sanchar (multi-state WhatsApp broadcast automation on S3, CloudFront, and presigned-URL uploads).",
  },
  {
    question: "What is Meet Korat's technical stack?",
    answer:
      "LLMs and AI: OpenAI, Claude, Gemini, OpenRouter, Grok, Kie AI, prompt engineering. Workflow and orchestration: n8n, Inngest, webhooks, REST APIs, background jobs, event-driven workflows. Voice AI: ElevenLabs, SIP trunking, voice cloning, speech-to-text, text-to-speech. Backend and cloud: Node.js, FastAPI, Supabase, PostgreSQL, Firebase, Railway, Vercel, AWS, Amazon S3, Amazon Bedrock, AWS Lambda, OpenSearch. Frontend and media: React, Next.js, Tailwind CSS, FFmpeg, HeyGen, subtitle generation, AI video editing, image processing.",
  },
  {
    question: "What has Meet Korat actually shipped to production?",
    answer:
      "Five production systems, plus eight internal automations. Measurable output includes 650+ personalized jingles generated, 600+ slides automated, and a founder content pipeline that cut turnaround from roughly three hours of manual work to about four minutes. Each project has a full case study covering the problem, solution, architecture, key engineering decisions, and results.",
  },
  {
    question: "Is Meet Korat available for hire?",
    answer:
      "Yes. He is actively interviewing for AI Automation Engineer and Applied AI Systems Engineer roles and is available to start immediately. He is open to remote, hybrid, on-site in Ahmedabad, or relocation.",
  },
  {
    question: "What roles is Meet Korat targeting?",
    answer:
      "AI Automation Engineer, Applied AI Systems Engineer, AI Product Engineer, and Founding Engineer. His goal is to join an AI-first product company or startup building scalable AI products, learn from experienced engineers, and grow into a senior engineering role.",
  },
  {
    question: "Where is Meet Korat based?",
    answer:
      "Nava Naroda, Ahmedabad, Gujarat, India. He works remotely and is open to relocation.",
  },
  {
    question: "How do I contact Meet Korat?",
    answer:
      "Email meetkorat903@gmail.com, or connect on LinkedIn at https://www.linkedin.com/in/meet-korat-335632245/. His code is on GitHub at https://github.com/Meetkorat38, his portfolio is at https://koratmeet.in, and his CV is downloadable at https://koratmeet.in/cv.pdf.",
  },
];

export const experience = [
  {
    role: "AI Automation Engineer",
    org: "Team Because",
    orgUrl: "https://teambecause.com/",
    period: "Dec 2025 — Present",
    highlights: [
      "Build production AI applications using modern LLM APIs",
      "Design automation workflows for internal operations",
      "Develop AI-powered content generation systems",
      "Build AI lead qualification platforms and Voice AI applications",
      "Deploy cloud-based AI applications across frontend, backend, APIs, and databases",
      "Contribute to Foresight, a team-built AI financial intelligence platform — AWS medallion data lake, Bedrock RAG, and the data-privacy and AI-usage policy the build follows",
      "Run client delivery directly: weekly requirement sessions, demos, and launch coordination",
      "Collaborate with marketing, design, and product teams on AI-powered solutions",
    ],
  },
];

export const toolGroups = [
  {
    group: "LLMs & AI",
    items: [
      "OpenAI",
      "Claude",
      "Gemini",
      "OpenRouter",
      "Grok",
      "Kie AI",
      "Prompt Engineering",
      "LLM Integration",
    ],
  },
  {
    group: "Workflow & Orchestration",
    items: [
      "n8n",
      "Inngest",
      "Webhooks",
      "REST APIs",
      "Background Jobs",
      "Event-driven Workflows",
    ],
  },
  {
    group: "Voice AI",
    items: [
      "ElevenLabs",
      "SIP Trunking",
      "Voice Cloning",
      "Speech-to-Text",
      "Text-to-Speech",
    ],
  },
  {
    group: "Backend & Cloud",
    items: [
      "Node.js",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Firebase",
      "Railway",
      "Vercel",
      "AWS",
      "Amazon S3",
      "Amazon Bedrock",
      "AWS Lambda",
      "OpenSearch",
    ],
  },
  {
    group: "Frontend & Media",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Lovable",
      "FFmpeg",
      "HeyGen",
      "Subtitle Generation",
      "AI Video Editing",
      "Image Processing",
    ],
  },
  {
    group: "Product & Strategy",
    items: [
      "AI Product Design",
      "Workflow Architecture",
      "Business Process Automation",
      "Product Strategy",
      "AI System Integration",
      "Rapid Prototyping",
    ],
  },
];

export const currentLearning = [
  "Amazon Web Services (AWS)",
  "Amazon Bedrock",
  "FastAPI",
  "Serverless Architectures",
  "IAM & Lambda",
  "OpenSearch & Vector Search",
  "Data Engineering Concepts",
  "AI Infrastructure",
  "Cloud-based AI Systems",
];
