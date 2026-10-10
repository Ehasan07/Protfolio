// Tools grouped the way I actually use them. Icon names map to <TechIcon>.

export const skillGroups = [
  {
    id: "odoo",
    title: { en: "Odoo & Python", bn: "Odoo ও পাইথন" },
    blurb: {
      en: "Odoo 12 modules in production at DUPNO — models, views, reports, security and the cron jobs that keep integrations honest.",
      bn: "DUPNO-তে প্রোডাকশনে চলা Odoo 12 মডিউল — মডেল, ভিউ, রিপোর্ট, সিকিউরিটি আর ইন্টিগ্রেশন ঠিক রাখার ক্রন জব।",
    },
    items: ["Odoo 12", "Python", "QWeb / XML", "PostgreSQL", "Odoo ORM", "Cron jobs"],
  },
  {
    id: "backend",
    title: { en: "Backend & data", bn: "ব্যাকএন্ড ও ডেটা" },
    blurb: {
      en: "APIs and data models that keep money exact — double-entry ledgers, row-level security, typed end to end.",
      bn: "এমন API ও ডেটা মডেল যাতে টাকার হিসাব নিখুঁত থাকে — ডাবল-এন্ট্রি লেজার, row-level security, শুরু থেকে শেষ টাইপড।",
    },
    items: ["Django", "Django REST", "NestJS", "tRPC", "Prisma", "Drizzle", "PostgreSQL", "Redis", "SQLite"],
  },
  {
    id: "frontend",
    title: { en: "Frontend", bn: "ফ্রন্টএন্ড" },
    blurb: {
      en: "Bangla-first interfaces that work on a shop-counter phone, with motion where it helps.",
      bn: "দোকানের কাউন্টারের ফোনেও চলে এমন বাংলা-প্রথম ইন্টারফেস, প্রয়োজনমতো অ্যানিমেশনসহ।",
    },
    items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "JavaScript", "Framer Motion", "HTML", "CSS", "Vite"],
  },
  {
    id: "devops",
    title: { en: "Servers & delivery", bn: "সার্ভার ও ডেলিভারি" },
    blurb: {
      en: "I deploy what I build: Linux boxes, Nginx, Docker, backups, and tests before release.",
      bn: "যা বানাই, নিজেই ডিপ্লয় করি: লিনাক্স সার্ভার, Nginx, Docker, ব্যাকআপ, আর রিলিজের আগে টেস্ট।",
    },
    items: ["Linux", "Nginx", "Docker", "Gunicorn", "Hetzner", "Google Cloud", "Cloudflare", "Git", "GitHub", "Playwright"],
  },
  {
    id: "integrations",
    title: { en: "Integrations & payments", bn: "ইন্টিগ্রেশন ও পেমেন্ট" },
    blurb: {
      en: "The Bangladeshi services businesses already run on — wired in with retries and reconciliation.",
      bn: "বাংলাদেশের ব্যবসা যেসব সেবায় চলে — রিট্রাই আর মিলিয়ে দেখার ব্যবস্থাসহ যুক্ত করা।",
    },
    items: ["bKash", "SSLCommerz", "SSL Wireless", "Google Cloud TTS", "Google Sheets", "Apps Script", "Asterisk PBX", "SFTP", "REST APIs"],
  },
];

// From "What I do in Odoo" on my GitHub profile.
export const odooCapabilities = [
  {
    area: { en: "Models & ORM", bn: "মডেল ও ORM" },
    detail: {
      en: "New models, inheriting existing ones, computed fields with search, onchange, constraints",
      bn: "নতুন মডেল, পুরনো মডেল ইনহেরিট, search-সহ computed field, onchange, constraint",
    },
  },
  {
    area: { en: "Views", bn: "ভিউ" },
    detail: {
      en: "Kanban, list, form and search views in XML; menus and actions per role",
      bn: "XML-এ কানবান, লিস্ট, ফর্ম ও সার্চ ভিউ; রোল অনুযায়ী মেনু ও অ্যাকশন",
    },
  },
  {
    area: { en: "Reports", bn: "রিপোর্ট" },
    detail: {
      en: "QWeb PDF in Bengali with seals and QR codes",
      bn: "সিল ও QR কোডসহ বাংলায় QWeb PDF",
    },
  },
  {
    area: { en: "Security", bn: "সিকিউরিটি" },
    detail: {
      en: "Groups, access rights, record rules, approval workflows with audit trails",
      bn: "গ্রুপ, অ্যাক্সেস রাইট, রেকর্ড রুল, অডিট ট্রেইলসহ অনুমোদন ওয়ার্কফ্লো",
    },
  },
  {
    area: { en: "Automation", bn: "অটোমেশন" },
    detail: {
      en: "Scheduled actions for sync, retries, balance checks and reconciliation",
      bn: "সিঙ্ক, রিট্রাই, ব্যালেন্স চেক ও রিকনসিলিয়েশনের জন্য শিডিউলড অ্যাকশন",
    },
  },
  {
    area: { en: "Integrations", bn: "ইন্টিগ্রেশন" },
    detail: {
      en: "Google Sheets / Apps Script, SSL Wireless, Google Cloud TTS, SFTP, Asterisk PBX, REST endpoints",
      bn: "Google Sheets / Apps Script, SSL Wireless, Google Cloud TTS, SFTP, Asterisk PBX, REST এন্ডপয়েন্ট",
    },
  },
];

// The scrolling strip under the hero.
export const marqueeTech = [
  "Odoo 12", "Python", "Django", "PostgreSQL", "TypeScript", "Next.js", "React", "NestJS",
  "tRPC", "Prisma", "Drizzle", "Tailwind CSS", "Redis", "Docker", "Nginx", "Linux",
  "Google Cloud", "Hetzner", "bKash", "SSLCommerz",
];
