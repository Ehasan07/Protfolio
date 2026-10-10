import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import TechIcon from "./ui/TechIcon";
import Logo from "./ui/Logo";
import { profile } from "../data/profile";
import { useSettings } from "../context/SettingsContext";
import { localDigits } from "../lib/digits";

const ORBIT = ["Odoo 12", "Python", "Django", "PostgreSQL", "Next.js", "TypeScript", "React", "Docker"];

// Photo card that tilts toward the pointer, with my core stack orbiting around it.
export default function HeroPortrait() {
  const { tr, lang, reducedMotion } = useSettings();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const shine = useTransform(
    px,
    (x) => `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) ${(x + 0.5) * 100}%, transparent 70%)`,
  );

  const onMove = (e) => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[min(72vw,330px)] sm:w-[340px] lg:w-[300px] xl:w-[360px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 1100 }}
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(var(--primary) / 0.22), transparent)" }}
      />

      {/* orbit */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 hidden aspect-square w-[135%] -translate-x-1/2 -translate-y-1/2 sm:block"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-line/15" />
        <div className="absolute inset-[9%] rounded-full border border-line/[0.06]" />
        <div className="absolute inset-0 animate-orbit">
          {ORBIT.map((name, i) => {
            const angle = (i / ORBIT.length) * Math.PI * 2;
            return (
              <div
                key={name}
                className="absolute"
                style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <div className="grid h-11 w-11 animate-orbit-rev place-items-center rounded-2xl border border-line/10 bg-elev/90 shadow-card backdrop-blur">
                    <TechIcon name={name} colored className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* photo card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-line/15 bg-surface shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)]"
      >
        <img
          src={profile.photo}
          alt={profile.name}
          width="720"
          height="960"
          fetchPriority="high"
          className="h-full w-full scale-[1.06] object-cover object-[50%_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ background: shine }}
        />

        <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 text-white backdrop-blur-md">
          <Logo className="h-9 w-9 shrink-0" />
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-semibold">{profile.name}</p>
            <p className="truncate text-xs text-white/70">
              {tr(profile.role)} · {profile.company.split(" ")[0]}
            </p>
          </div>
        </div>
      </motion.div>

      {/* floating chips */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-[14%] z-10 hidden rounded-2xl border border-line/10 bg-elev/90 px-3 py-2 shadow-card backdrop-blur sm:block xl:-left-10"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Odoo 12</p>
        <p className="text-sm font-semibold">
          {localDigits(6, lang)} <span className="font-normal text-muted">{tr({ en: "modules live", bn: "মডিউল চালু" })}</span>
        </p>
      </motion.div>
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-3 top-[52%] z-10 hidden items-center gap-2 rounded-2xl border border-line/10 bg-elev/90 px-3 py-2 shadow-card backdrop-blur sm:flex xl:-right-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-primary" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="text-sm font-medium">{tr({ en: "4 SaaS shipped", bn: "৪টি SaaS চালু" })}</span>
      </motion.div>
    </motion.div>
  );
}
