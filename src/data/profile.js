// Who I am, how to reach me, and the numbers the hero shows.
// Text that changes with the language toggle is written as { en, bn }.

export const profile = {
  name: "S M Ehasanul Haque",
  shortName: "Ehasan",
  initials: "EH",
  role: { en: "Odoo & Full-Stack Developer", bn: "Odoo ও ফুল-স্ট্যাক ডেভেলপার" },
  company: "DUPNO International",
  companyUrl: "https://dupno.com",
  location: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
  timezone: "Asia/Dhaka",
  email: "shiplulink2003@gmail.com",
  phone: "+880 1782-793008",
  phoneHref: "tel:+8801782793008",
  whatsapp: "https://wa.me/8801782793008",
  site: "https://ehasanlive.com",
  resume: "/resume.pdf",
  photo: "/profile.webp",
  github: "https://github.com/Ehasan07",
  linkedin: "https://www.linkedin.com/in/ehasan-shiplu-533748317/",
  facebook: "https://www.facebook.com/ehasan2003",
  card: "https://mycard.dupno.com/card/shiplu07/",

  headline: {
    en: "I build business software for Bangladesh.",
    bn: "আমি বাংলাদেশের ব্যবসার জন্য সফটওয়্যার বানাই।",
  },
  intro: {
    en: "Odoo modules for DUPNO's vehicle-tracking operations, and Bangla-first SaaS of my own — fleets, ledgers, receipts and payroll turned into software that ships.",
    bn: "DUPNO-এর ভেহিকল-ট্র্যাকিং অপারেশনের জন্য Odoo মডিউল, আর নিজের বাংলা-প্রথম SaaS — ফ্লিট, লেজার, রসিদ, বেতন — সবকিছুকে এমন সফটওয়্যারে রূপ দিই যা সত্যিই চালু হয়।",
  },
  signature: "বাংলায়, বাংলাদেশের ব্যবসার জন্য সফটওয়্যার",

  bio: [
    {
      en: "I'm an Odoo and full-stack developer at DUPNO International in Dhaka. At work I build Odoo 12 modules for the company's vehicle-tracking (VTS) operations — the fleet register, SIM recharge, Bengali voice campaigns, tracking certificates, equipment handover and the call-centre desk.",
      bn: "আমি ঢাকার DUPNO International-এ Odoo ও ফুল-স্ট্যাক ডেভেলপার। অফিসে কোম্পানির ভেহিকল-ট্র্যাকিং (VTS) অপারেশনের জন্য Odoo 12 মডিউল বানাই — ফ্লিট রেজিস্টার, সিম রিচার্জ, বাংলা ভয়েস ক্যাম্পেইন, ট্র্যাকিং সার্টিফিকেট, যন্ত্রপাতি হস্তান্তর আর কল-সেন্টার ডেস্ক।",
    },
    {
      en: "Outside them I build Bangla-first SaaS: a Hajj agency platform, a personal finance app, a trading ERP and a digital business card — each one deployed on a real server, with backups, used by real people.",
      bn: "এর বাইরে নিজের বাংলা-প্রথম SaaS বানাই: হজ এজেন্সির প্ল্যাটফর্ম, ব্যক্তিগত হিসাবের অ্যাপ, ট্রেডিং ERP আর ডিজিটাল বিজনেস কার্ড — প্রতিটি আসল সার্ভারে ডিপ্লয় করা, ব্যাকআপসহ, আসল মানুষ ব্যবহার করছে।",
    },
  ],

  facts: [
    { key: "base", en: "Dhaka, Bangladesh · GMT+6", bn: "ঢাকা, বাংলাদেশ · GMT+6" },
    { key: "work", en: "DUPNO International · since 2023", bn: "DUPNO International · ২০২৩ থেকে" },
    { key: "study", en: "B.Sc. CSE · Daffodil Institute of IT", bn: "বি.এসসি. সিএসই · ড্যাফোডিল ইনস্টিটিউট অফ আইটি" },
    { key: "lang", en: "Bangla · English", bn: "বাংলা · ইংরেজি" },
    { key: "open", en: "Freelance, contract & full-time", bn: "ফ্রিল্যান্স, কন্ট্রাক্ট ও ফুল-টাইম" },
  ],

  stats: [
    { value: 6, suffix: "", label: { en: "Odoo modules in production", bn: "প্রোডাকশনে Odoo মডিউল" } },
    { value: 4, suffix: "", label: { en: "SaaS products shipped", bn: "চালু SaaS প্রোডাক্ট" } },
    { value: 25, suffix: "+", label: { en: "Public repositories", bn: "পাবলিক রিপোজিটরি" } },
    { value: 2023, suffix: "", static: true, label: { en: "Shipping at DUPNO since", bn: "DUPNO-তে কাজ শুরু" } },
  ],

  // The rules from my GitHub profile — they say more about how I work than a skills list.
  principles: [
    {
      icon: "languages",
      title: { en: "Bangla first", bn: "বাংলা আগে" },
      text: {
        en: "Interfaces start in Bangla, with English one tap away — the people using the software think in Bangla.",
        bn: "ইন্টারফেস শুরু হয় বাংলায়, ইংরেজি এক ট্যাপ দূরে — যারা সফটওয়্যার ব্যবহার করেন তারা বাংলায় ভাবেন।",
      },
    },
    {
      icon: "coins",
      title: { en: "Money in paisa", bn: "টাকা হিসাব পয়সায়" },
      text: {
        en: "Amounts are integers in paisa, never floating point — totals match to the last taka, every time.",
        bn: "টাকার অঙ্ক পয়সায় পূর্ণসংখ্যা হিসেবে রাখি, কখনো ফ্লোটিং পয়েন্টে নয় — শেষ টাকা পর্যন্ত মিলে যায়।",
      },
    },
    {
      icon: "shield",
      title: { en: "Never break the system next door", bn: "পাশের সিস্টেম ভাঙবে না" },
      text: {
        en: "An add-on must never slow down or block the module it sits on. Mirrors are non-blocking; failures retry.",
        bn: "কোনো অ্যাড-অন যেন মূল মডিউলকে ধীর বা আটকে না দেয়। মিরর নন-ব্লকিং, ব্যর্থ হলে আবার চেষ্টা।",
      },
    },
    {
      icon: "rocket",
      title: { en: "It ships", bn: "চালু হতেই হবে" },
      text: {
        en: "Tested, deployed on a real server, with backups. Then I read it six months later — if it still makes sense, it's done.",
        bn: "টেস্ট করা, আসল সার্ভারে ডিপ্লয় করা, ব্যাকআপসহ। ছয় মাস পরেও পড়ে যদি বোঝা যায় — তবেই কাজ শেষ।",
      },
    },
  ],

  quote: {
    en: "Ship it. Read it six months later. If it still makes sense, it's done.",
    bn: "চালু করো। ছয় মাস পরে আবার পড়ো। তখনো বোঝা গেলে — কাজ শেষ।",
  },
};

export const socials = [
  { id: "github", label: "GitHub", href: profile.github, handle: "@Ehasan07" },
  { id: "linkedin", label: "LinkedIn", href: profile.linkedin, handle: "ehasan-shiplu" },
  { id: "whatsapp", label: "WhatsApp", href: profile.whatsapp, handle: profile.phone },
  { id: "facebook", label: "Facebook", href: profile.facebook, handle: "ehasan2003" },
  { id: "card", label: "MY-Card", href: profile.card, handle: "Digital card" },
];
