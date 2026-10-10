import {
  SiOdoo, SiPython, SiDjango, SiPostgresql, SiRedis, SiTypescript, SiNextdotjs, SiReact, SiNestjs,
  SiTrpc, SiPrisma, SiDrizzle, SiTailwindcss, SiJavascript, SiLinux, SiNginx, SiDocker, SiHetzner,
  SiGooglecloud, SiGit, SiGithub, SiVite, SiFramer, SiHtml5, SiCss3, SiGunicorn, SiCloudflare,
  SiBootstrap, SiDaisyui, SiSqlite, SiTurborepo, SiPwa, SiGooglesheets, SiGoogleappsscript,
  SiAsterisk, SiXml,
} from "react-icons/si";
import {
  Braces, Brush, Clock, CreditCard, FlaskConical, FolderLock, Smartphone, Wallet, Webhook, Code2,
} from "lucide-react";

// name → [icon, brand color]. Colors that vanish on a dark or light background
// (pure black/white logos) are left out so the icon follows the text color.
const ICONS = {
  "Odoo 12": [SiOdoo, "#a5729a"],
  "Odoo ORM": [SiOdoo, "#a5729a"],
  Python: [SiPython, "#4b8bbe"],
  "QWeb / XML": [SiXml, "#e8a33d"],
  PostgreSQL: [SiPostgresql, "#4f8cc9"],
  "Cron jobs": [Clock],
  "cron retries": [Clock],
  Django: [SiDjango, "#2ba977"],
  "Django REST": [SiDjango, "#2ba977"],
  NestJS: [SiNestjs, "#e0234e"],
  tRPC: [SiTrpc, "#398ccb"],
  Prisma: [SiPrisma],
  Drizzle: [SiDrizzle, "#c5f74f"],
  Redis: [SiRedis, "#dc382d"],
  SQLite: [SiSqlite, "#4ea8de"],
  TypeScript: [SiTypescript, "#3178c6"],
  "Next.js": [SiNextdotjs],
  React: [SiReact, "#61dafb"],
  "Tailwind CSS": [SiTailwindcss, "#38bdf8"],
  JavaScript: [SiJavascript, "#f7df1e"],
  "Framer Motion": [SiFramer, "#bb4bff"],
  HTML: [SiHtml5, "#e34f26"],
  CSS: [SiCss3, "#2965f1"],
  Vite: [SiVite, "#a78bfa"],
  Linux: [SiLinux, "#fcc624"],
  Nginx: [SiNginx, "#22a447"],
  Docker: [SiDocker, "#2496ed"],
  Gunicorn: [SiGunicorn, "#499848"],
  Hetzner: [SiHetzner, "#d50c2d"],
  "Google Cloud": [SiGooglecloud, "#4285f4"],
  "Google Cloud TTS": [SiGooglecloud, "#4285f4"],
  Cloudflare: [SiCloudflare, "#f38020"],
  Git: [SiGit, "#f05032"],
  GitHub: [SiGithub],
  Playwright: [FlaskConical, "#2ead33"],
  bKash: [Wallet, "#e2136e"],
  SSLCommerz: [CreditCard, "#3b82f6"],
  "SSL Wireless": [Smartphone, "#3b82f6"],
  "Google Sheets": [SiGooglesheets, "#34a853"],
  "Apps Script": [SiGoogleappsscript, "#4285f4"],
  "Asterisk PBX": [SiAsterisk, "#f68f1e"],
  SFTP: [FolderLock],
  "REST APIs": [Webhook],
  "REST API": [Webhook],
  "Fetch API": [Webhook],
  Turborepo: [SiTurborepo, "#ef4444"],
  PWA: [SiPwa, "#8b5cf6"],
  Bootstrap: [SiBootstrap, "#7952b3"],
  DaisyUI: [SiDaisyui, "#5a0ef8"],
  Canvas: [Brush],
  JSON: [Braces],
};

// eslint-disable-next-line react-refresh/only-export-components
export const hasTechIcon = (name) => Boolean(ICONS[name]);

export default function TechIcon({ name, className = "h-4 w-4", colored = false }) {
  const [Icon = Code2, color] = ICONS[name] ?? [];
  return <Icon aria-hidden className={className} style={colored && color ? { color } : undefined} />;
}
