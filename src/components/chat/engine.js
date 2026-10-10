// Fabrito's brain: keyword intents over the portfolio data. No network calls —
// every answer comes from src/data, so it can never say something the site doesn't.
import { moreProjects, odooModules, products } from "../../data/projects";
import { profile } from "../../data/profile";
import { skillGroups } from "../../data/skills";
import { education, experience } from "../../data/journey";
import { services } from "../../data/services";

const BENGALI = /[ঀ-৿]/;

// ASCII keys match at a word start ("live" ≠ "deliver"); short ones ("hi", "cv")
// must be the whole word, or "his" would greet. Bengali has no \b, so substring.
const escape = (k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const has = (text, key) => {
  if (BENGALI.test(key)) return text.includes(key);
  const tail = key.length <= 3 ? "\\b" : "";
  return new RegExp(`\\b${escape(key)}${tail}`).test(text);
};
const any = (text, keys) => keys.some((k) => has(text, k));

const ALIASES = {
  hajj: ["hajj", "umrah", "হজ", "ওমরা"],
  takatracker: ["taka tracker", "takatracker", "টাকা ট্র্যাকার", "finance app"],
  "trade-erp": ["trade erp", "trade-erp", "rod", "cement", "ট্রেড"],
  mycard: ["my-card", "mycard", "my card", "business card", "মাই-কার্ড", "মাই কার্ড"],
  fleet: ["fleet", "vts fleet", "google sheet", "ফ্লিট"],
  recharge: ["recharge", "top-up", "topup", "রিচার্জ"],
  voice: ["voice", "tts", "ভয়েস"],
  certificate: ["certificate", "brta", "btrc", "সার্টিফিকেট"],
  assets: ["asset", "handover", "হ্যান্ডওভার"],
  desk: ["call desk", "support desk", "pbx", "call centre", "call center", "কল সেন্টার"],
};

const INTENTS = {
  bot: ["who are you", "your name", "fabrito", "are you a bot", "are you ai", "তুমি কে", "আপনি কে", "ফ্যাব্রিটো"],
  thanks: ["thank", "thx", "ধন্যবাদ", "dhonnobad", "thanks"],
  cv: ["cv", "resume", "résumé", "bio data", "biodata", "সিভি", "রিজিউম", "বায়োডাটা"],
  hire: [
    "hire", "contact", "email", "e-mail", "phone", "whatsapp", "call", "reach", "freelance", "available", "availability",
    "price", "pricing", "cost", "rate", "budget", "quote", "work with", "work together", "jogajog", "number",
    "যোগাযোগ", "হায়ার", "নম্বর", "ফোন", "দাম", "খরচ", "বাজেট", "ইমেইল", "হোয়াটসঅ্যাপ",
  ],
  odoo: ["odoo", "ওডু"],
  live: ["live", "demo", "link", "url", "visit", "লাইভ", "ডেমো", "লিংক"],
  projects: ["project", "build", "built", "portfolio", "saas", "product", "app", "প্রজেক্ট", "প্রোডাক্ট", "বানা", "kaj", "banay", "what has he made"],
  skills: [
    "skill", "stack", "tech", "language", "framework", "know", "python", "django", "react", "typescript",
    "postgres", "database", "frontend", "backend", "next.js", "nextjs", "দক্ষতা", "স্ট্যাক", "টেক", "জানে",
  ],
  experience: ["experience", "job", "company", "dupno", "career", "years", "অভিজ্ঞতা", "চাকরি", "অফিস", "কোম্পানি"],
  education: ["education", "study", "degree", "university", "college", "diit", "daffodil", "শিক্ষা", "পড়াশোনা", "পড়ে"],
  services: ["service", "offer", "help me", "can you build", "সেবা", "সার্ভিস"],
  location: ["where", "location", "based", "dhaka", "timezone", "time zone", "local time", "কোথায়", "ঢাকা", "সময়"],
  greet: ["hi", "hello", "hey", "yo", "salam", "assalamu", "good morning", "good evening", "হাই", "হ্যালো", "আসসালামু", "সালাম", "কেমন", "kemon"],
};

const L = (lang, en, bn) => (lang === "bn" ? bn : en);
const pick = (lang, v) => (v && typeof v === "object" ? v[lang] ?? v.en : v);

const contactActions = (lang) => [
  { type: "link", label: "WhatsApp", value: profile.whatsapp },
  { type: "link", label: L(lang, "Email", "ইমেইল"), value: `mailto:${profile.email}` },
  { type: "scroll", label: L(lang, "Contact form", "কন্টাক্ট ফর্ম"), value: "contact" },
];

function productAnswer(p, lang) {
  const lines = [
    `**${p.title}** — ${pick(lang, p.kicker)}, ${p.year}.`,
    pick(lang, p.summary),
    "",
    ...p.highlights.slice(0, 3).map((h) => `• ${pick(lang, h)}`),
    "",
    `${L(lang, "Stack", "স্ট্যাক")}: ${p.stack.join(", ")}`,
  ];
  if (p.note) lines.push(`_${pick(lang, p.note)}_`);
  const actions = [];
  if (p.live) actions.push({ type: "link", label: L(lang, "Visit live", "লাইভ দেখুন"), value: p.live });
  actions.push({ type: "project", label: L(lang, "Case study", "বিস্তারিত"), value: p.id });
  if (p.code) actions.push({ type: "link", label: "GitHub", value: p.code });
  return { text: lines.join("\n"), actions };
}

function moduleAnswer(m, lang) {
  return {
    text: `**${m.title}** — ${L(lang, "an Odoo 12 module at DUPNO.", "DUPNO-তে একটি Odoo 12 মডিউল।")}\n${pick(lang, m.summary)}\n\n${L(lang, "Built with", "ব্যবহৃত")}: ${m.stack.join(", ")}`,
    actions: [{ type: "project", label: L(lang, "See screens", "স্ক্রিন দেখুন"), value: m.id }],
  };
}

function findProject(text) {
  for (const [id, keys] of Object.entries(ALIASES)) {
    if (any(text, keys)) {
      return products.find((p) => p.id === id) ?? odooModules.find((m) => m.id === id);
    }
  }
  return moreProjects.find((p) => text.includes(p.title.toLowerCase()));
}

export function findProjectById(id) {
  return (
    products.find((p) => p.id === id) ??
    (odooModules.find((m) => m.id === id) && { ...odooModules.find((m) => m.id === id), kind: "odoo" })
  );
}

const ANSWERS = {
  greet: (lang) => ({
    text: L(
      lang,
      "Hello! Ask me about Ehasan's SaaS products, his Odoo modules, his stack — or how to hire him.",
      "হ্যালো! এহসানের SaaS প্রোডাক্ট, Odoo মডিউল, স্ট্যাক — বা কীভাবে হায়ার করবেন, জিজ্ঞেস করুন।",
    ),
    chips: true,
  }),
  bot: (lang) => ({
    text: L(
      lang,
      "I'm **Fabrito**, Ehasan's assistant on this site. My answers come straight from the portfolio — for anything else, message him directly.",
      "আমি **ফ্যাব্রিটো**, এই সাইটে এহসানের অ্যাসিস্ট্যান্ট। আমার উত্তর সরাসরি পোর্টফোলিও থেকে — অন্য কিছু জানতে সরাসরি ওকে মেসেজ করুন।",
    ),
    actions: contactActions(lang),
  }),
  thanks: (lang) => ({
    text: L(lang, "Anytime! Anything else you'd like to know?", "স্বাগতম! আর কিছু জানতে চান?"),
    chips: true,
  }),
  cv: (lang) => ({
    text: L(lang, "Here's Ehasan's CV as a PDF.", "এই নিন এহসানের সিভি (PDF)।"),
    actions: [{ type: "download", label: L(lang, "Download CV", "সিভি ডাউনলোড"), value: profile.resume }],
  }),
  hire: (lang) => ({
    text: L(
      lang,
      `Ehasan is open to **freelance, contract and full-time** work.\n\n• Email: **${profile.email}**\n• WhatsApp / phone: **${profile.phone}**\n\nPricing depends on scope — share what you need and he'll reply with a plan and timeline.`,
      `এহসান **ফ্রিল্যান্স, কন্ট্রাক্ট ও ফুল-টাইম** কাজের জন্য ফ্রি আছে।\n\n• ইমেইল: **${profile.email}**\n• হোয়াটসঅ্যাপ / ফোন: **${profile.phone}**\n\nখরচ নির্ভর করে কাজের পরিধির উপর — কী দরকার জানালে ও পরিকল্পনা ও সময়সীমা জানাবে।`,
    ),
    actions: contactActions(lang),
  }),
  odoo: (lang) => ({
    text: [
      L(
        lang,
        "At **DUPNO International** Ehasan has built **six Odoo 12 modules** that run the vehicle-tracking operations:",
        "**DUPNO International**-এ এহসান **ছয়টি Odoo 12 মডিউল** বানিয়েছে, যেগুলো ভেহিকল-ট্র্যাকিং অপারেশন চালায়:",
      ),
      ...odooModules.map((m) => `• **${m.title}**`),
      "",
      L(
        lang,
        "Models & ORM, XML views, Bengali QWeb PDFs with QR, record rules and approval workflows, cron sync — plus integrations with Google Sheets, SSL Wireless, Cloud TTS, SFTP and Asterisk PBX.",
        "মডেল ও ORM, XML ভিউ, QR-সহ বাংলা QWeb PDF, রেকর্ড রুল ও অনুমোদন ওয়ার্কফ্লো, ক্রন সিঙ্ক — সাথে Google Sheets, SSL Wireless, Cloud TTS, SFTP ও Asterisk PBX ইন্টিগ্রেশন।",
      ),
    ].join("\n"),
    actions: [{ type: "scroll", label: L(lang, "See the modules", "মডিউলগুলো দেখুন"), value: "work" }],
  }),
  live: (lang) => ({
    text: [
      L(lang, "These are live right now:", "এগুলো এখন লাইভ:"),
      ...products.filter((p) => p.live).map((p) => `• **${p.title}** — ${p.live.replace("https://", "")}`),
    ].join("\n"),
    actions: products.filter((p) => p.live).map((p) => ({ type: "link", label: p.title, value: p.live })),
  }),
  projects: (lang) => ({
    text: [
      L(lang, "Ehasan's main products:", "এহসানের মূল প্রোডাক্টগুলো:"),
      ...products.map((p) => `• **${p.title}** — ${pick(lang, p.kicker)}`),
      "",
      L(
        lang,
        `Plus six Odoo modules at DUPNO and ${moreProjects.length} smaller client pages, apps and experiments. Ask about any of them by name.`,
        `সাথে DUPNO-তে ছয়টি Odoo মডিউল আর ${moreProjects.length}টি ছোট ক্লায়েন্ট পেজ, অ্যাপ ও এক্সপেরিমেন্ট। যেকোনোটির নাম লিখে জিজ্ঞেস করুন।`,
      ),
    ].join("\n"),
    actions: [{ type: "scroll", label: L(lang, "Open the work", "কাজগুলো দেখুন"), value: "work" }],
    chips: ["Hajj Tracking", "Taka Tracker", "Trade ERP", "MY-Card"],
  }),
  skills: (lang) => ({
    text: skillGroups.map((g) => `**${pick(lang, g.title)}** — ${g.items.join(", ")}`).join("\n\n"),
    actions: [{ type: "scroll", label: L(lang, "See the stack", "স্ট্যাক দেখুন"), value: "skills" }],
  }),
  experience: (lang) => {
    const job = experience[0];
    return {
      text: `**${pick(lang, job.role)}** · ${job.company} · ${pick(lang, job.period)}\n\n${pick(lang, job.summary)}`,
      actions: [{ type: "scroll", label: L(lang, "Full journey", "পুরো যাত্রা"), value: "journey" }],
    };
  },
  education: (lang) => {
    const e = education[0];
    return {
      text: `**${pick(lang, e.degree)}**\n${pick(lang, e.school)} · ${pick(lang, e.period)}`,
      actions: [{ type: "scroll", label: L(lang, "Journey", "যাত্রা"), value: "journey" }],
    };
  },
  services: (lang) => ({
    text: [
      L(lang, "What Ehasan can build for you:", "এহসান আপনার জন্য যা বানাতে পারে:"),
      ...services.map((s) => `• **${pick(lang, s.title)}**`),
    ].join("\n"),
    actions: [
      { type: "scroll", label: L(lang, "Services", "সেবা"), value: "services" },
      { type: "scroll", label: L(lang, "Start a project", "প্রজেক্ট শুরু করুন"), value: "contact" },
    ],
  }),
  location: (lang) => {
    const time = new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    return {
      text: L(
        lang,
        `He's based in **Dhaka, Bangladesh** (GMT+6) — it's ${time} there now. Remote work across time zones is fine.`,
        `ও থাকে **ঢাকা, বাংলাদেশে** (GMT+6) — এখন সেখানে ${time}। অন্য টাইমজোনের সাথে রিমোট কাজেও সমস্যা নেই।`,
      ),
    };
  },
  fallback: (lang) => ({
    text: L(
      lang,
      "I'm not sure about that one. I know his **products**, **Odoo work**, **stack**, **experience** and how to **contact** him.",
      "এটা নিশ্চিত জানি না। আমি ওর **প্রোডাক্ট**, **Odoo-র কাজ**, **স্ট্যাক**, **অভিজ্ঞতা** আর **যোগাযোগের** তথ্য জানি।",
    ),
    chips: true,
  }),
};

const ORDER = ["bot", "thanks", "cv", "hire", "odoo", "live", "projects", "skills", "experience", "education", "services", "location"];

export function reply(input, uiLang) {
  const text = input.toLowerCase().trim();
  const lang = BENGALI.test(input) ? "bn" : uiLang;

  const project = findProject(text);
  if (project) {
    if (products.includes(project)) return productAnswer(project, lang);
    if (odooModules.includes(project)) return moduleAnswer(project, lang);
    return {
      text: `**${project.title}** — ${pick(lang, project.summary)}\n${L(lang, "Stack", "স্ট্যাক")}: ${project.stack.join(", ")}`,
      actions: [{ type: "link", label: "GitHub", value: project.code }],
    };
  }

  // A bare greeting; longer messages that happen to start with "hi" fall through to the real question.
  if (any(text, INTENTS.greet) && text.split(/\s+/).length <= 3) return ANSWERS.greet(lang);

  const intent = ORDER.find((id) => any(text, INTENTS[id]));
  return (ANSWERS[intent] ?? ANSWERS.fallback)(lang);
}

export const replyLanguage = (input, uiLang) => (BENGALI.test(input) ? "bn" : uiLang);
