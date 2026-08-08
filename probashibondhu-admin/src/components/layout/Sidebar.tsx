import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileBarChart,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/agents", label: "Admin Panel", icon: Users },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink-900/40 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        className={`border-ink-100 fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-white transition-transform duration-300 lg:static lg:z-0 lg:w-64 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="from-brand-500 to-brand-700 font-num shadow-brand-200 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-sm">
              PB
            </div>
            <div>
              <p className="text-ink-900 text-sm font-bold leading-tight">
                ProbashiBondhu
              </p>
              <p className="text-ink-500 text-xs leading-tight">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-ink-400 hover:bg-ink-50 rounded-lg p-1.5 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "from-brand-500 to-brand-600 shadow-brand-200 bg-gradient-to-l text-white shadow-sm"
                    : "text-ink-600 hover:bg-brand-50 hover:text-brand-700"
                }`
              }
            >
              <item.icon size={19} strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="bg-ink-50 m-4 rounded-2xl p-4 text-center">
          <p className="text-ink-500 text-xs">Need Help?</p>
          <p className="font-num text-brand-600 mt-1 text-sm font-bold">
            16241
          </p>
        </div>
      </aside>
    </>
  );
}
