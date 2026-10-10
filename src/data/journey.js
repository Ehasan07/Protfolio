// Work history, education, and the "how I got here" timeline from my GitHub profile.

export const experience = [
  {
    id: "dupno",
    company: "DUPNO International",
    url: "https://dupno.com",
    role: { en: "Odoo & Full-Stack Developer", bn: "Odoo ও ফুল-স্ট্যাক ডেভেলপার" },
    period: { en: "2023 — Present", bn: "২০২৩ — বর্তমান" },
    location: { en: "Dhaka · On-site", bn: "ঢাকা · অন-সাইট" },
    summary: {
      en: "Building the software behind DUPNO's vehicle-tracking (VTS) business — internal Odoo modules, client-facing web pages, and MY-Card, a SaaS I took from concept to production.",
      bn: "DUPNO-এর ভেহিকল-ট্র্যাকিং (VTS) ব্যবসার পেছনের সফটওয়্যার বানাই — ইন্টারনাল Odoo মডিউল, ক্লায়েন্টদের ওয়েব পেজ, আর MY-Card, যে SaaS ধারণা থেকে প্রোডাকশন পর্যন্ত নিজে নিয়ে গেছি।",
    },
    points: [
      {
        en: "Designed, built and shipped six Odoo 12 modules: fleet register, SIM recharge, Bengali voice campaigns, tracking certificates, asset handover and the call-centre desk.",
        bn: "ছয়টি Odoo 12 মডিউল ডিজাইন, তৈরি ও চালু করেছি: ফ্লিট রেজিস্টার, সিম রিচার্জ, বাংলা ভয়েস ক্যাম্পেইন, ট্র্যাকিং সার্টিফিকেট, অ্যাসেট হ্যান্ডওভার ও কল-সেন্টার ডেস্ক।",
      },
      {
        en: "Launched and maintain mycard.dupno.com end to end — authentication, card builder, QR, payments, admin and data export.",
        bn: "mycard.dupno.com শুরু থেকে শেষ নিজে চালু করেছি ও রক্ষণাবেক্ষণ করি — অথেনটিকেশন, কার্ড বিল্ডার, QR, পেমেন্ট, অ্যাডমিন ও ডেটা এক্সপোর্ট।",
      },
      {
        en: "Integrated third-party services — SSL Wireless, Google Cloud TTS, Google Sheets, Asterisk PBX — and run live deployments and server updates.",
        bn: "থার্ড-পার্টি সেবা যুক্ত করেছি — SSL Wireless, Google Cloud TTS, Google Sheets, Asterisk PBX — এবং লাইভ ডিপ্লয়মেন্ট ও সার্ভার আপডেট চালাই।",
      },
      {
        en: "Built responsive client pages for DUPNO products and take part in code reviews and debugging across the team.",
        bn: "DUPNO-এর প্রোডাক্টের জন্য রেসপন্সিভ পেজ বানিয়েছি, আর টিমের কোড রিভিউ ও ডিবাগিংয়ে অংশ নিই।",
      },
    ],
    stack: ["Odoo 12", "Python", "Django", "PostgreSQL", "JavaScript", "Nginx"],
  },
];

export const education = [
  {
    id: "diit",
    school: { en: "Daffodil Institute of IT", bn: "ড্যাফোডিল ইনস্টিটিউট অফ আইটি" },
    degree: { en: "B.Sc. in Computer Science & Engineering", bn: "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে বি.এসসি." },
    period: { en: "2023 — Present", bn: "২০২৩ — বর্তমান" },
    courses: ["Data Structures", "Algorithms", "OOP", "Database Systems", "Web Engineering"],
  },
];

export const timeline = [
  {
    when: "2026",
    title: { en: "Full SaaS products, on my own servers", bn: "নিজের সার্ভারে পূর্ণ SaaS প্রোডাক্ট" },
    text: {
      en: "Taka Tracker, Trade ERP and Hajj Tracking in TypeScript — and ehasanlive.com rebuilt.",
      bn: "TypeScript-এ টাকা ট্র্যাকার, ট্রেড ERP ও হজ ট্র্যাকিং — আর ehasanlive.com নতুন করে।",
    },
  },
  {
    when: "2025",
    title: { en: "From prototype to paid SaaS", bn: "প্রোটোটাইপ থেকে পেইড SaaS" },
    text: {
      en: "Python, canvas experiments, the Digital E-Card — then MY-Card, a Django SaaS with bKash and SSLCommerz payments.",
      bn: "পাইথন, ক্যানভাস এক্সপেরিমেন্ট, ডিজিটাল ই-কার্ড — তারপর MY-Card, বিকাশ ও SSLCommerz পেমেন্টসহ Django SaaS।",
    },
  },
  {
    when: { en: "At DUPNO", bn: "DUPNO-তে" },
    title: { en: "Odoo for real operations", bn: "আসল অপারেশনের জন্য Odoo" },
    text: {
      en: "Odoo 12 modules for the VTS operations: fleet register, SIM recharge, voice campaigns, certificates, asset handover, call desk.",
      bn: "VTS অপারেশনের জন্য Odoo 12 মডিউল: ফ্লিট রেজিস্টার, সিম রিচার্জ, ভয়েস ক্যাম্পেইন, সার্টিফিকেট, অ্যাসেট হ্যান্ডওভার, কল ডেস্ক।",
    },
  },
  {
    when: "2024",
    title: { en: "Games, React and first client pages", bn: "গেম, রিঅ্যাক্ট আর প্রথম ক্লায়েন্ট পেজ" },
    text: {
      en: "Alpha Clash Pro, Tic-Tac-Toe and React World Tour — and the first pages for DUPNO.",
      bn: "আলফা ক্ল্যাশ প্রো, টিক-ট্যাক-টো, রিঅ্যাক্ট ওয়ার্ল্ড ট্যুর — আর DUPNO-এর প্রথম পেজগুলো।",
    },
  },
  {
    when: { en: "Jan — May 2024", bn: "জানু — মে ২০২৪" },
    title: { en: "Five assignments, five shipped pages", bn: "পাঁচ অ্যাসাইনমেন্ট, পাঁচটি পেজ" },
    text: {
      en: "AMA Travel, a hockey club, JS problem solving, P-Paribahan tickets and Retro Forum.",
      bn: "AMA ট্রাভেল, হকি ক্লাব, JS প্রবলেম সলভিং, পি-পরিবহন টিকিট ও রেট্রো ফোরাম।",
    },
  },
  {
    when: { en: "Jan 2024", bn: "জানু ২০২৪" },
    title: { en: "Hello, GitHub", bn: "হ্যালো, গিটহাব" },
    text: {
      en: "First repository, first portfolio, and a Figma design rebuilt in HTML and CSS.",
      bn: "প্রথম রিপোজিটরি, প্রথম পোর্টফোলিও, আর একটি Figma ডিজাইন HTML ও CSS-এ।",
    },
  },
];
