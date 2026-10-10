import { Lock } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

export default function StatusBadge({ status }) {
  const { t } = useSettings();
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-primary">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-primary" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        {t.work.live}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/[0.07] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-muted">
      <Lock className="h-3 w-3" />
      {t.work.private}
    </span>
  );
}
