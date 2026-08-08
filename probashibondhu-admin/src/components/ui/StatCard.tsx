import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
  active?: boolean;
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  iconBg,
  iconColor,
  onClick,
  active,
}: StatCardProps) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border bg-white p-4 text-left shadow-sm transition-all hover:shadow-md ${
        active ? "border-brand-400 ring-brand-100 ring-2" : "border-ink-100"
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      <span
        className="absolute inset-y-0 left-0 w-1.5 rounded-r-full"
        style={{ background: accent }}
      />
      <div className="flex-1 pl-2">
        <p className="text-ink-500 text-sm">{label}</p>
        <p className="font-num text-ink-900 mt-1 text-2xl font-bold">
          {value}
          {sub && (
            <span className="font-num text-ink-400 ml-2 text-sm font-medium">{sub}</span>
          )}
        </p>
      </div>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ background: iconBg, color: iconColor }}
      >
        <Icon size={20} strokeWidth={2} />
      </span>
    </Comp>
  );
}
