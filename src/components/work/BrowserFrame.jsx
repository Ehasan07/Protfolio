import { Lock } from "lucide-react";

// A minimal browser window around a screenshot.
export default function BrowserFrame({ url, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line/10 bg-surface/80 shadow-card ${className}`}>
      <div className="flex items-center gap-3 border-b border-line/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-fg/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
          <Lock className="h-3 w-3 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
        <span className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}
