// src/components/layout/PinkBar.tsx
import { FileBarChart, UserCircle } from "lucide-react";
import React, { useState } from "react";

export function PinkBar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  return (
    <div
      className="ml-auto flex w-1/4 items-center justify-end gap-10 bg-[#e10078] px-8 py-4 text-white"
      style={{
        // Left side slightly angled, right side straight
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
      }}
    >
      {/* Reports */}
      <div className="relative">
        <button
          onClick={() => setReportsOpen(!reportsOpen)}
          className="flex items-center gap-2 hover:opacity-90"
        >
          <FileBarChart size={20} strokeWidth={1.8} />
          <span className="text-base font-medium">Reports</span>
        </button>

        {reportsOpen && (
          <div className="absolute left-0 mt-3 w-56 rounded-xl bg-white text-gray-800 shadow-lg">
            {/* submenu items here */}
          </div>
        )}
      </div>

      {/* Admin Panel */}
      <div className="relative">
        <button
          onClick={() => setAdminOpen(!adminOpen)}
          className="flex items-center gap-2 text-base font-medium hover:opacity-90"
        >
          <UserCircle size={20} strokeWidth={1.8} />
          <span>Admin Panel</span>
        </button>

        {adminOpen && (
          <div className="absolute right-0 mt-3 w-40 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-lg">
            <button className="flex w-full items-center gap-2 bg-[#e10078] px-3 py-2 font-semibold text-white hover:opacity-90">
              <span className="text-lg">+</span> Create Agent
            </button>
            <button className="flex w-full items-center gap-2 px-3 py-2 font-semibold text-[#e10078] hover:bg-pink-50">
              <span className="text-lg">≡</span> Agent List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
