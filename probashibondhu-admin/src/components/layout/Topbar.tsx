import {
  Menu,
  ChevronDown,
  UserCircle,
  FileBarChart,
} from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  showReportsDropdown?: boolean;
}

export function Topbar({
  title,
  subtitle,
  onMenuClick,
  showReportsDropdown,
}: TopbarProps) {
  const [reportsOpen, setReportsOpen] = useState(false);

  const reportMenuItems = [
    { label: "Enrolled Policies", to: "/reports/enrolled-policies" },
    { label: "Claims Report", to: "/reports/claims" },
    { label: "Agent Performance", to: "/reports/agents-performance" },
  ];

  return (
    <header className="sticky top-0 z-20 min-w-0 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="shrink-0 rounded-lg p-2 text-ink-500 hover:bg-ink-50 lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-ink-900 sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-sm text-ink-500">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showReportsDropdown && (
            <div className="relative">
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className="flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-50"
              >
                <FileBarChart size={16} />
                Reports
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    reportsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {reportsOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-lg">
                  <div className="bg-brand-500 px-4 py-3">
                    <h3 className="font-semibold text-white">Reports Menu</h3>
                  </div>
                  <div className="space-y-0">
                    {reportMenuItems.map((item) => (
                      <a
                        key={item.to}
                        href={item.to}
                        onClick={() => setReportsOpen(false)}
                        className="block px-4 py-3 text-sm text-ink-700 transition-colors hover:bg-ink-50"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button className="flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1.5 pl-1.5 pr-3 hover:bg-ink-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <UserCircle size={20} />
            </span>
            <span className="hidden text-sm font-semibold text-ink-700 sm:inline">
              Admin
            </span>
            <ChevronDown size={14} className="hidden text-ink-400 sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
}
