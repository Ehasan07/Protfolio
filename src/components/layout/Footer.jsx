import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Logo from "../ui/Logo";
import SocialIcon from "../ui/SocialIcon";
import Magnetic from "../ui/Magnetic";
import { NAV_SECTIONS } from "../../data/nav";
import { profile, socials } from "../../data/profile";
import { useSettings } from "../../context/SettingsContext";
import { scrollToId } from "../../lib/scroll";

export default function Footer() {
  const { t, tr } = useSettings();
  const year = new Date().getFullYear();
  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line/10 bg-elev/50">
      <div aria-hidden className="dot-grid mask-fade-b absolute inset-0 opacity-60" />
      <div className="container relative pb-10 pt-20">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            {t.footer.cta}
          </motion.h2>
          <Magnetic strength={0.35}>
            <a
              href="#contact"
              onClick={go("contact")}
              className="group grid h-32 w-32 shrink-0 place-items-center rounded-full bg-primary text-center text-sm font-semibold text-on-primary transition-shadow hover:shadow-glow sm:h-36 sm:w-36"
            >
              <span className="flex flex-col items-center gap-1">
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
                {t.nav.hire}
              </span>
            </a>
          </Magnetic>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="mt-12 inline-block break-all font-display text-xl text-muted transition-colors hover:text-primary sm:text-3xl"
        >
          {profile.email}
        </a>

        <div className="mt-16 grid gap-10 border-t border-line/10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <div>
                <p className="font-display font-semibold">{profile.name}</p>
                <p className="text-sm text-muted">{tr(profile.role)}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm italic leading-relaxed text-muted">“{tr(profile.quote)}”</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className="text-muted transition-colors hover:text-fg">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.resume} download className="text-muted transition-colors hover:text-fg">
                  CV
                </a>
              </li>
            </ul>
          </nav>

          <ul className="flex flex-wrap content-start gap-2">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line/10 text-fg/70 transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary"
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. {t.footer.rights} · {t.footer.built}
          </p>
          <button onClick={() => scrollToId("top")} className="group inline-flex items-center gap-2 hover:text-fg">
            {t.footer.top}
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line/15 transition-transform group-hover:-translate-y-1">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
