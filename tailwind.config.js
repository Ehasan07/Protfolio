/** @type {import('tailwindcss').Config} */

// Every color is a CSS variable (see src/index.css) so dark/light mode and the
// accent presets only swap variables — no component ever hard-codes a palette.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        bg: token("bg"),
        elev: token("elev"),
        surface: token("surface"),
        fg: token("fg"),
        muted: token("muted"),
        line: token("line"),
        primary: token("primary"),
        accent: token("accent"),
        odoo: token("odoo"),
        "on-primary": token("on-primary"),
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Anek Bangla"', "system-ui", "sans-serif"],
        sans: ['"Geist"', '"Anek Bangla"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", '"Anek Bangla"', "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--primary) / 0.25), 0 10px 40px -10px rgb(var(--primary) / 0.45)",
        card: "0 1px 0 0 rgb(var(--fg) / 0.04) inset, 0 20px 50px -30px rgb(0 0 0 / 0.6)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        orbit: { to: { transform: "rotate(360deg)" } },
        "orbit-rev": { to: { transform: "rotate(-360deg)" } },
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.95)" },
        },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        ping2: { "75%, 100%": { transform: "scale(2.2)", opacity: "0" } },
      },
      animation: {
        marquee: "marquee var(--marquee-speed, 40s) linear infinite",
        orbit: "orbit 40s linear infinite",
        "orbit-rev": "orbit-rev 40s linear infinite",
        aurora: "aurora 22s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        ping2: "ping2 1.8s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
