import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import HeroPortrait from "../components/HeroPortrait";
import Magnetic from "../components/ui/Magnetic";
import CountUp from "../components/ui/CountUp";
import { profile } from "../data/profile";
import { useSettings } from "../context/SettingsContext";
import useDhakaTime from "../hooks/useDhakaTime";
import { scrollToId } from "../lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

// Each letter slides up out of a mask, one after another.
function SplitLine({ text, delay = 0, className = "" }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`} aria-hidden>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", rotate: 6 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.028, ease: EASE }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t, tr, lang } = useSettings();
  const time = useDhakaTime(lang);
  const [word, setWord] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % t.hero.rotating.length), 2600);
    return () => clearInterval(id);
  }, [t.hero.rotating.length]);

  return (
    <section id="top" ref={ref} className="relative flex overflow-x-clip min-h-[100svh] flex-col pb-10 pt-28 sm:pt-32">
      <div className="container grid flex-1 items-center gap-14 lg:grid-cols-[1.3fr_0.9fr] lg:gap-8">
        <motion.div style={{ y, opacity: fade }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-7 flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 py-1.5 pl-2.5 pr-3.5 text-xs font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-primary" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {t.hero.available}
            </span>
            <span className="eyebrow">
              {t.hero.localTime} · {time} · GMT+6
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,9.5vw,6.6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <span className="sr-only">{profile.name}</span>
            <SplitLine text="S M Ehasanul" delay={0.25} />
            <SplitLine text="Haque" delay={0.55} className="text-gradient animate-shimmer" />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 flex flex-wrap items-baseline gap-x-3 font-display text-2xl font-medium sm:text-3xl"
          >
            <span className="text-muted">{t.hero.build}</span>
            <span className="relative inline-flex h-[1.3em] min-w-[12ch] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${lang}-${word}`}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="whitespace-nowrap text-accent"
                >
                  {t.hero.rotating[word]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {tr(profile.intro)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("work");
                }}
                className="btn-primary group px-6 py-3.5"
              >
                {t.hero.cta}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <a href={profile.resume} download="S-M-Ehasanul-Haque-CV.pdf" className="btn-ghost px-6 py-3.5">
              <Download className="h-4 w-4" />
              {t.hero.cv}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="group inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-fg/80 hover:text-primary"
            >
              <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                {t.hero.talk}
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 font-['Anek_Bangla'] text-lg text-accent/90"
            lang="bn"
          >
            {profile.signature}
          </motion.p>
        </motion.div>

        <HeroPortrait />
      </div>

      <div className="container mt-14">
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: EASE }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line/10 bg-line/10 lg:grid-cols-4"
        >
          {profile.stats.map((s) => (
            <div key={s.label.en} className="flex flex-col gap-1 bg-bg/85 px-5 py-5 backdrop-blur sm:px-7 sm:py-6">
              <dt className="order-2 text-xs text-muted sm:text-sm">{tr(s.label)}</dt>
              <dd className="order-1 font-display text-3xl font-semibold sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} staticValue={s.static} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mx-auto mt-8 hidden flex-col items-center gap-2 text-muted hover:text-fg md:flex"
        aria-label={t.hero.scroll}
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-line/25 pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-primary"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="eyebrow text-[10px]">{t.hero.scroll}</span>
      </motion.button>
    </section>
  );
}
