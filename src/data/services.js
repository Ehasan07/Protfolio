// What a client can hire me for, and how a project with me runs.

export const services = [
  {
    id: "odoo",
    icon: "boxes",
    featured: true,
    title: { en: "Odoo module development", bn: "Odoo মডিউল ডেভেলপমেন্ট" },
    text: {
      en: "Custom Odoo modules that fit how your team already works — approvals, audit trails, Bengali PDF reports and integrations that never block the core system.",
      bn: "আপনার টিম যেভাবে কাজ করে সেভাবে কাস্টম Odoo মডিউল — অনুমোদন, অডিট ট্রেইল, বাংলা PDF রিপোর্ট, আর এমন ইন্টিগ্রেশন যা মূল সিস্টেমকে কখনো আটকায় না।",
    },
    points: [
      { en: "Models, views, wizards & record rules", bn: "মডেল, ভিউ, উইজার্ড ও রেকর্ড রুল" },
      { en: "QWeb reports in Bangla with QR", bn: "QR-সহ বাংলা QWeb রিপোর্ট" },
      { en: "Sync with Sheets, SMS, PBX & APIs", bn: "Sheets, SMS, PBX ও API-র সাথে সিঙ্ক" },
    ],
  },
  {
    id: "saas",
    icon: "building",
    featured: true,
    title: { en: "Business SaaS & ERP", bn: "বিজনেস SaaS ও ERP" },
    text: {
      en: "Accounting, stock, POS and payroll products built for Bangladesh — double-entry, money in paisa, Bangla first and multi-tenant when you need it.",
      bn: "বাংলাদেশের জন্য হিসাব, স্টক, POS ও বেতনের সফটওয়্যার — ডাবল-এন্ট্রি, পয়সায় হিসাব, বাংলা-প্রথম, প্রয়োজনে মাল্টি-টেন্যান্ট।",
    },
    points: [
      { en: "Ledgers, statements & trial balance", bn: "লেজার, স্টেটমেন্ট ও ট্রায়াল ব্যালেন্স" },
      { en: "Multi-tenant with row-level security", bn: "row-level security-সহ মাল্টি-টেন্যান্ট" },
      { en: "Offline-first PWAs for the field", bn: "মাঠপর্যায়ের জন্য অফলাইন-ফার্স্ট PWA" },
    ],
  },
  {
    id: "web",
    icon: "layers",
    title: { en: "Full-stack web apps", bn: "ফুল-স্ট্যাক ওয়েব অ্যাপ" },
    text: {
      en: "From database schema to the last button: Django or Next.js, typed APIs, auth and admin dashboards.",
      bn: "ডেটাবেস স্কিমা থেকে শেষ বাটন পর্যন্ত: Django বা Next.js, টাইপড API, অথেনটিকেশন ও অ্যাডমিন ড্যাশবোর্ড।",
    },
  },
  {
    id: "payments",
    icon: "wallet",
    title: { en: "Payments & integrations", bn: "পেমেন্ট ও ইন্টিগ্রেশন" },
    text: {
      en: "bKash, SSLCommerz, mobile top-up, voice and SMS gateways — with reconciliation so the numbers always match.",
      bn: "বিকাশ, SSLCommerz, মোবাইল টপ-আপ, ভয়েস ও SMS গেটওয়ে — রিকনসিলিয়েশনসহ, যাতে হিসাব সবসময় মেলে।",
    },
  },
  {
    id: "ui",
    icon: "pen",
    title: { en: "Landing pages & UI", bn: "ল্যান্ডিং পেজ ও UI" },
    text: {
      en: "Fast, responsive pages that explain your product clearly — in Bangla, English or both.",
      bn: "দ্রুত, রেসপন্সিভ পেজ যা আপনার প্রোডাক্ট পরিষ্কারভাবে বোঝায় — বাংলা, ইংরেজি বা দুটোতেই।",
    },
  },
  {
    id: "ops",
    icon: "server",
    title: { en: "Deployment & care", bn: "ডিপ্লয়মেন্ট ও রক্ষণাবেক্ষণ" },
    text: {
      en: "Linux, Nginx and Docker on your own server, with backups, monitoring and updates after launch.",
      bn: "নিজের সার্ভারে লিনাক্স, Nginx ও Docker — ব্যাকআপ, মনিটরিং আর লঞ্চের পরে আপডেটসহ।",
    },
  },
];

export const process = [
  {
    step: "01",
    title: { en: "Understand", bn: "বোঝা" },
    text: {
      en: "We talk through how your business runs today — the sheets, the receipts, the words your team uses.",
      bn: "আপনার ব্যবসা আজ কীভাবে চলে তা নিয়ে কথা বলি — শিট, রসিদ, আর আপনার টিম যে শব্দ ব্যবহার করে।",
    },
  },
  {
    step: "02",
    title: { en: "Plan", bn: "পরিকল্পনা" },
    text: {
      en: "A data model, the key screens and a clear scope with milestones, before any code.",
      bn: "কোড লেখার আগে ডেটা মডেল, মূল স্ক্রিন আর মাইলস্টোনসহ পরিষ্কার স্কোপ।",
    },
  },
  {
    step: "03",
    title: { en: "Build in the open", bn: "খোলামেলা ডেভেলপমেন্ট" },
    text: {
      en: "Regular demos on a staging link, so you see progress and steer early.",
      bn: "স্টেজিং লিংকে নিয়মিত ডেমো — অগ্রগতি দেখবেন, শুরুতেই দিক ঠিক করতে পারবেন।",
    },
  },
  {
    step: "04",
    title: { en: "Ship & support", bn: "লঞ্চ ও সাপোর্ট" },
    text: {
      en: "Deployed on a real server with backups, a handover guide, and fixes after launch.",
      bn: "ব্যাকআপসহ আসল সার্ভারে ডিপ্লয়, হ্যান্ডওভার গাইড, আর লঞ্চের পরে ফিক্স।",
    },
  },
];
