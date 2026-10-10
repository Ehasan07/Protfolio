// The "EH" hexagon monogram from my GitHub banners. Follows the accent color.
export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="EH">
      <path d="M16 1.5 29 9v14l-13 7.5L3 23V9z" fill="rgb(var(--primary))" />
      <path d="M16 1.5 29 9v14l-13 7.5L3 23V9z" fill="none" stroke="rgb(var(--fg) / 0.15)" strokeWidth="0.6" />
      <g fill="rgb(var(--on-primary))">
        <rect x="8.4" y="11" width="2.2" height="10" rx="0.4" />
        <rect x="8.4" y="11" width="6.2" height="2.1" rx="0.4" />
        <rect x="8.4" y="14.95" width="5.2" height="2.1" rx="0.4" />
        <rect x="8.4" y="18.9" width="6.2" height="2.1" rx="0.4" />
        <rect x="17.2" y="11" width="2.2" height="10" rx="0.4" />
        <rect x="21.4" y="11" width="2.2" height="10" rx="0.4" />
        <rect x="17.2" y="14.95" width="6.4" height="2.1" rx="0.4" />
      </g>
    </svg>
  );
}
