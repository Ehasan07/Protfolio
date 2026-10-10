import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock, Copy, Loader2, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import SectionHeader from "../components/ui/SectionHeader";
import Reveal from "../components/ui/Reveal";
import SocialIcon from "../components/ui/SocialIcon";
import Magnetic from "../components/ui/Magnetic";
import { profile } from "../data/profile";
import { useSettings } from "../context/SettingsContext";
import { useUI } from "../context/UIContext";
import useDhakaTime from "../hooks/useDhakaTime";

// EmailJS is used when these are set at build time (see .env.example).
// Without them the form opens the visitor's mail app with the message filled in.
const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const hasEmailJS = Boolean(EMAILJS.service && EMAILJS.template && EMAILJS.publicKey);

const channels = [
  { id: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: true },
  { id: "whatsapp", label: "WhatsApp", value: profile.phone, href: profile.whatsapp },
  { id: "phone", label: "Phone", value: profile.phone, href: profile.phoneHref },
  { id: "linkedin", label: "LinkedIn", value: "ehasan-shiplu", href: profile.linkedin },
];

export default function Contact() {
  const { t, lang } = useSettings();
  const { notify } = useUI();
  const time = useDhakaTime(lang);
  const [form, setForm] = useState({ name: "", email: "", kind: 0, message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | opened | failed

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const kindLabel = t.contact.kinds[form.kind];

  const composeText = () =>
    `Hi Ehasan,\n\n${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}\nProject type: ${kindLabel}`;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!hasEmailJS) {
      const subject = `[ehasanlive.com] ${kindLabel} — ${form.name}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeText())}`;
      setStatus("opened");
      return;
    }
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS.service,
        EMAILJS.template,
        {
          name: form.name,
          from_name: form.name,
          email: form.email,
          reply_to: form.email,
          project_type: kindLabel,
          message: form.message,
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus("sent");
      setForm({ name: "", email: "", kind: 0, message: "" });
    } catch (err) {
      console.error("EmailJS:", err);
      setStatus("failed");
    }
  };

  const whatsappHref = `${profile.whatsapp}?text=${encodeURIComponent(form.message ? composeText() : "Hi Ehasan, I found you on ehasanlive.com.")}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify(t.contact.copied);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const feedback = {
    sent: { icon: CheckCircle2, text: t.contact.sent, tone: "text-primary border-primary/30 bg-primary/10" },
    opened: { icon: CheckCircle2, text: t.contact.opened, tone: "text-primary border-primary/30 bg-primary/10" },
    failed: { icon: AlertCircle, text: t.contact.failed, tone: "text-red-400 border-red-400/30 bg-red-400/10" },
  }[status];

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="min-w-0">
            <SectionHeader index="06" eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />

            <Reveal delay={0.1} className="mt-10">
              <p className="eyebrow mb-4">{t.contact.direct}</p>
              <ul className="space-y-2.5">
                {channels.map((c) => (
                  <li key={c.id} className="group flex items-center gap-2">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-line/10 bg-elev/60 p-3 sm:gap-4 sm:p-3.5 transition-all hover:border-primary/40 hover:bg-primary/[0.06]"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface text-primary transition-transform group-hover:scale-105">
                        <SocialIcon id={c.id} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-muted">{c.label}</span>
                        <span className="block break-words font-medium">{c.value.replace("@", "@\u200b")}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted max-[374px]:hidden transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                    {c.copy && (
                      <button onClick={copyEmail} className="icon-btn h-auto w-11 shrink-0 self-stretch rounded-2xl border border-line/10 bg-elev/60" aria-label={t.contact.copy}>
                        <Copy className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-dashed border-line/15 p-4 text-sm text-muted">
                <Clock className="h-4 w-4 text-accent" />
                {t.contact.localTime}: <span className="font-mono text-fg">{time}</span>
                <span className="text-muted/70">GMT+6</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="min-w-0 lg:pt-6">
            <form onSubmit={onSubmit} className="card relative overflow-hidden p-6 sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full"
                style={{ background: "radial-gradient(closest-side, rgb(var(--accent) / 0.12), transparent)" }}
              />
              <div className="relative grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">{t.contact.name}</span>
                  <input required name="name" autoComplete="name" value={form.name} onChange={set("name")} className="field" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-muted">{t.contact.email}</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={set("email")}
                    className="field"
                  />
                </label>
              </div>

              <fieldset className="relative mt-6">
                <legend className="mb-3 text-sm text-muted">{t.contact.kind}</legend>
                <div className="flex flex-wrap gap-2">
                  {t.contact.kinds.map((k, i) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setForm((f) => ({ ...f, kind: i }))}
                      aria-pressed={form.kind === i}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        form.kind === i
                          ? "border-primary bg-primary text-on-primary"
                          : "border-line/15 text-fg/80 hover:border-primary/50"
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="relative mt-6 block">
                <span className="mb-2 block text-sm text-muted">{t.contact.message}</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder={t.contact.messagePh}
                  className="field resize-none"
                />
              </label>

              <div className="relative mt-7 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <button type="submit" disabled={status === "sending"} className="btn-primary px-6 py-3.5">
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> {t.contact.sending}
                      </>
                    ) : (
                      <>
                        {t.contact.send} <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </Magnetic>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3.5">
                  <FaWhatsapp className="h-4 w-4 text-[#25d366]" /> {t.contact.viaWhatsapp}
                </a>
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`relative mt-5 flex items-start gap-2 rounded-xl border p-3 text-sm ${feedback.tone}`}
                    role="status"
                  >
                    <feedback.icon className="mt-0.5 h-4 w-4 shrink-0" />
                    {feedback.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
