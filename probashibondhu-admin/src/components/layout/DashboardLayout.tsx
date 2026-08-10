import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { DateFilter } from "./DateFilter";

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="bg-ink-50 flex min-h-screen flex-col">
      {/* Sticky Header - appears on all pages */}
      <Header />

      {/* Show DateFilter ONLY on landing page */}
      {location.pathname === "/" && <DateFilter />}

      {/* Main Content - full width, no sidebar */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
