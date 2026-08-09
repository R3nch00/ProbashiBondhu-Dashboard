import { Menu, ChevronDown, UserCircle, FileBarChart } from "lucide-react";
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
    { label: "Draft Policies", to: "/reports/draft-policies" },
    { label: "Submitted Claims", to: "/reports/submitted-claims" },
    { label: "Settled Claims", to: "/reports/settled-claims" },
    { label: "Pending Claims", to: "/reports/pending-claims" },
    { label: "Regretted Claims", to: "/reports/regretted-claims" },
  ];

  return (
    <header className="border-ink-100 sticky top-0 z-20 min-w-0 border-b bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="text-ink-500 hover:bg-ink-50 shrink-0 rounded-lg p-2 lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <h1 className="text-ink-900 truncate text-xl font-bold sm:text-2xl">
              {title}
            </h1>
            {subtitle && <p className="text-ink-500 truncate text-sm">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showReportsDropdown && (
            <div className="relative">
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className="border-ink-200 text-ink-700 hover:bg-ink-50 flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold transition-colors"
              >
                <FileBarChart size={16} />
                Reports
                <ChevronDown
                  size={16}
                  className={`transition-transform ${reportsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {reportsOpen && (
                <div className="border-ink-200 absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border bg-white shadow-lg">
                  <div className="bg-brand-500 px-4 py-3">
                    <h3 className="font-semibold text-white">Reports Menu</h3>
                  </div>
                  <div className="space-y-0">
                    {reportMenuItems.map((item) => (
                      <a
                        key={item.to}
                        href={item.to}
                        onClick={() => setReportsOpen(false)}
                        className="text-ink-700 hover:bg-ink-50 block px-4 py-3 text-sm transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button className="border-ink-200 hover:bg-ink-50 flex items-center gap-2 rounded-full border bg-white py-1.5 pr-3 pl-1.5">
            <span className="bg-brand-100 text-brand-600 flex h-8 w-8 items-center justify-center rounded-full">
              <UserCircle size={20} />
            </span>
            <span className="text-ink-700 hidden text-sm font-semibold sm:inline">
              Admin
            </span>
            <ChevronDown size={14} className="text-ink-400 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
}
