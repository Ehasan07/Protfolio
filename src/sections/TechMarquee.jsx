import TechIcon from "../components/ui/TechIcon";
import { marqueeTech } from "../data/skills";

// Endless strip of the stack under the hero. Pauses on hover.
export default function TechMarquee() {
  const row = [...marqueeTech, ...marqueeTech];
  return (
    <div className="relative border-y border-line/10 bg-elev/40 py-5 backdrop-blur-sm" aria-label="Tech stack">
      <div className="mask-fade-x pause-on-hover flex overflow-hidden">
        <ul className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10 [--marquee-speed:55s]">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= marqueeTech.length}
              className="group flex items-center gap-2.5 whitespace-nowrap text-muted transition-colors hover:text-fg"
            >
              <TechIcon name={name} className="h-5 w-5 opacity-80 transition-opacity group-hover:opacity-100" colored />
              <span className="font-display text-lg font-medium">{name}</span>
              <span className="ml-8 h-1 w-1 rounded-full bg-line/25" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
