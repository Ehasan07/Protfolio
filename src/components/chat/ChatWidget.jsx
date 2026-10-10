import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, FolderOpen, MessageCircle, RotateCcw, SendHorizontal, X } from "lucide-react";
import Logo from "../ui/Logo";
import { findProjectById, reply } from "./engine";
import { useSettings } from "../../context/SettingsContext";
import { useUI } from "../../context/UIContext";
import { scrollToId } from "../../lib/scroll";

const STORE_KEY = "ehasan:chat";
const NUDGE_KEY = "ehasan:chat-nudged";

const load = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) || "[]");
  } catch {
    return [];
  }
};

// **bold**, _italic_, and line breaks — enough for the engine's answers.
function RichText({ text }) {
  return text.split("\n").map((line, i, lines) => (
    <Fragment key={i}>
      {line.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, j) => {
        if (part.startsWith("**")) return <strong key={j} className="font-semibold text-fg">{part.slice(2, -2)}</strong>;
        if (part.startsWith("_") && part.endsWith("_") && part.length > 2) return <em key={j} className="text-muted">{part.slice(1, -1)}</em>;
        return part;
      })}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

const ACTION_ICONS = { link: ArrowUpRight, scroll: ArrowUpRight, project: FolderOpen, download: Download };

export default function ChatWidget() {
  const { t, lang } = useSettings();
  const { chatOpen: open, setChatOpen: setOpen, openProject } = useUI();
  const [messages, setMessages] = useState(load);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 300);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // One gentle nudge per session, a few seconds in.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const show = setTimeout(() => setNudge(true), 6000);
    const hide = setTimeout(() => setNudge(false), 14000);
    try {
      sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      /* ignore */
    }
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = (text) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { id: `u${Date.now()}`, role: "user", text: value }]);
    setInput("");
    setTyping(true);
    const answer = reply(value, lang);
    const delay = Math.min(450 + answer.text.length * 4, 1300);
    timers.current.push(
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { id: `b${Date.now()}`, role: "bot", ...answer }]);
      }, delay),
    );
  };

  const runAction = (a) => {
    if (a.type === "scroll") {
      if (window.innerWidth < 640) setOpen(false);
      scrollToId(a.value);
    } else if (a.type === "project") {
      const project = findProjectById(a.value);
      if (project) openProject(project);
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setTyping(false);
    setMessages([]);
  };

  // The greeting is never stored, so it always speaks the current page language.
  const thread = [{ id: "greet", role: "bot", text: t.chat.greet, chips: true }, ...messages];
  const last = thread[thread.length - 1];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            role="dialog"
            aria-label={t.chat.name}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[5.5rem] left-3 right-3 z-[75] flex h-[min(600px,calc(100svh-7.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-line/10 bg-elev/95 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-6 sm:w-[390px]"
          >
            {/* header */}
            <div className="relative flex items-center gap-3 border-b border-line/10 px-4 py-3.5">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(120deg, rgb(var(--primary) / 0.14), transparent 60%)" }}
              />
              <div className="relative">
                <Logo className="h-10 w-10" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-elev bg-[#28c840]" />
              </div>
              <div className="relative min-w-0 flex-1">
                <p className="font-display font-semibold leading-tight">{t.chat.name}</p>
                <p className="truncate text-xs text-muted">{t.chat.status}</p>
              </div>
              <button onClick={reset} className="icon-btn relative h-9 w-9" aria-label={t.chat.reset} title={t.chat.reset}>
                <RotateCcw className="h-4 w-4" />
              </button>
              <button onClick={() => setOpen(false)} className="icon-btn relative h-9 w-9" aria-label={t.chat.close}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
              {thread.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[86%] ${m.role === "user" ? "" : "space-y-2.5"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-md bg-primary text-on-primary"
                          : "rounded-bl-md border border-line/10 bg-surface/80 text-fg/85"
                      }`}
                    >
                      <RichText text={m.text} />
                    </div>
                    {m.actions?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.actions.map((a) => {
                          const Icon = ACTION_ICONS[a.type];
                          const cls =
                            "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-on-primary";
                          return a.type === "link" || a.type === "download" ? (
                            <a
                              key={a.label}
                              href={a.value}
                              target={a.type === "link" && a.value.startsWith("http") ? "_blank" : undefined}
                              rel="noreferrer"
                              download={a.type === "download" ? "S-M-Ehasanul-Haque-CV.pdf" : undefined}
                              className={cls}
                            >
                              {a.label} <Icon className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <button key={a.label} onClick={() => runAction(a)} className={cls}>
                              {a.label} <Icon className="h-3.5 w-3.5" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line/10 bg-surface/80 px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted"
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!typing && last.role === "bot" && last.chips && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-1.5 pt-1">
                  {(Array.isArray(last.chips) ? last.chips : t.chat.suggestions).map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-line/15 bg-bg/40 px-3 py-1.5 text-xs text-fg/80 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-line/10 p-3"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-line/10 bg-surface/60 py-1.5 pl-4 pr-1.5 transition focus-within:border-primary/50">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted/70"
                  aria-label={t.chat.placeholder}
                  maxLength={300}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-on-primary transition disabled:opacity-40"
                  aria-label="Send"
                >
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted/80">{t.chat.footer}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <div className="fixed bottom-5 right-4 z-[75] flex items-end gap-3 sm:right-6">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="mb-1.5 max-w-[220px] rounded-2xl rounded-br-md border border-line/10 bg-elev/95 px-4 py-2.5 text-left text-sm shadow-card backdrop-blur"
            >
              {t.chat.open} 👋
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={open ? t.chat.close : t.chat.open}
          aria-expanded={open}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-on-primary shadow-glow"
        >
          {!open && <span className="absolute inset-0 animate-ping2 rounded-full bg-primary/40 [animation-duration:2.6s]" />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "chat"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
