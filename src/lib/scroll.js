// One place for scrolling, so links, the command palette and the chat assistant
// all move the page the same way — through Lenis when it's running, natively otherwise.

let lenis = null;
let locks = 0;

export const setLenis = (instance) => {
  lenis = instance;
};

const NAV_OFFSET = -84;

export function scrollToId(id) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.3 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET, behavior: "smooth" });
}

// Overlays (menu, modal, palette) stack, so count locks instead of toggling.
export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  if (lenis) lenis.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  if (lenis) lenis.start();
  document.documentElement.style.overflow = "";
}
