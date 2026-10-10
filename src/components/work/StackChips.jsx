import TechIcon, { hasTechIcon } from "../ui/TechIcon";

export default function StackChips({ items, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((name) => (
        <li key={name} className="chip">
          {hasTechIcon(name) && <TechIcon name={name} colored className="h-3.5 w-3.5" />}
          {name}
        </li>
      ))}
    </ul>
  );
}
