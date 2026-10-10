import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Command, Menu, Moon, Search, SlidersHorizontal, Sun, X } from "lucide-react";
import Logo from "../ui/Logo";
import SocialIcon from "../ui/SocialIcon";
import { useSettings } from "../../context/SettingsContext";
import { useUI } from "../../context/UIContext";
import useActiveSection from "../../hooks/useActiveSection";
import { NAV_SECTIONS } from "../../data/nav";
import { socials } from "../../data/profile";
import { lockScroll, scrollToId, unlockScroll } from "../../lib/scroll";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Navbar() {
  const { t, lang, toggleLang, toggleTheme, resolvedTheme } = useSettings();
  const { setPaletteOpen, setSettingsOpen } = useUI();
  const active = useActiveSection(NAV_SECTIONS);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y > 600 && y > prev + 2) setHidden(true);
    else if (y < prev - 2 || y < 600) setHidden(false);
  });

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    // Let the menu start closing before Lenis takes over scrolling.
    setTimeout(() => scrollToId(id), menuOpen ? 220 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !menuOpen ? -96 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container pt-3">
          <nav
            aria-label="Main"
            className={`mx-auto flex h-[3.6rem] items-center justify-between gap-2 rounded-full border pl-2.5 pr-1.5 transition-[background-color,border-color,box-shadow] duration-500 ${
              scrolled || menuOpen
                ? "border-line/10 bg-elev/75 shadow-card backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            <a href="#top" onClick={go("top")} className="group flex items-center gap-2.5 rounded-full pr-2" aria-label="Ehasan — home">
              <span className="transition-transform duration-500 group-hover:rotate-[60deg]">
                <Logo className="h-9 w-9" />
              </span>
              <span className="font-display text-[1.05rem] font-semibold tracking-tight">
                ehasan<span className="text-primary">live</span>
              </span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                      active === id ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-fg/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.nav[id]}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setPaletteOpen(true)}
                className="hidden h-9 items-center gap-2 rounded-full border border-line/10 bg-surface/50 pl-3 pr-1.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-fg xl:flex"
              >
                <Search className="h-3.5 w-3.5" />
                {t.nav.search}
                <kbd className="ml-2 flex items-center gap-0.5 rounded-full bg-fg/[0.06] px-2 py-0.5 font-mono text-[10px]">
                  {isMac ? <Command className="h-2.5 w-2.5" /> : "Ctrl"}K
                </kbd>
              </button>
              <button onClick={() => setPaletteOpen(true)} className="icon-btn xl:hidden" aria-label={t.nav.search}>
                <Search className="h-[18px] w-[18px]" />
              </button>

              <button
                onClick={toggleLang}
                className="icon-btn w-auto px-2.5 font-mono text-xs font-medium"
                aria-label={lang === "en" ? "বাংলায় দেখুন" : "View in English"}
              >
                {lang === "en" ? "বাং" : "EN"}
              </button>

              <button onClick={toggleTheme} className="icon-btn" aria-label={t.nav.theme}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={resolvedTheme}
                    initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {resolvedTheme === "dark" ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <button onClick={() => setSettingsOpen(true)} className="icon-btn hidden sm:inline-flex" aria-label={t.nav.settings}>
                <SlidersHorizontal className="h-[18px] w-[18px]" />
              </button>

              <a href="#contact" onClick={go("contact")} className="btn-primary ml-1.5 hidden px-4 py-2.5 md:inline-flex">
                {t.nav.hire}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="icon-btn lg:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? t.nav.close : t.nav.menu}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-8 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-1 flex-col gap-1">
              {NAV_SECTIONS.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    className={`flex items-baseline gap-4 border-b border-line/10 py-3.5 font-display text-4xl font-semibold ${
                      active === id ? "text-primary" : ""
                    }`}
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    {t.nav[id]}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex gap-1">
                {socials.slice(0, 4).map((s) => (
                  <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="icon-btn border border-line/10" aria-label={s.label}>
                    <SocialIcon id={s.id} />
                  </a>
                ))}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSettingsOpen(true);
                }}
                className="btn-ghost px-4 py-2.5"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t.nav.settings}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
