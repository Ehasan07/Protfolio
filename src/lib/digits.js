const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

// 2026 → ২০২৬ when the page is in Bangla.
export const localDigits = (n, lang) => (lang === "bn" ? String(n).replace(/\d/g, (d) => BN_DIGITS[d]) : String(n));
