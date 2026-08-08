import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink-50">
      {/* Sticky Header - appears on all pages */}
      <Header />

      {/* Main Content - full width, no sidebar */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
