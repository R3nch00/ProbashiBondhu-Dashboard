// src/components/layout/PinkBar.tsx
import { FileBarChart, UserCircle } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function PinkBar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  return (
    <div className="relative ml-auto flex w-1/4 items-center justify-end gap-10 bg-[#e10078] px-8 py-4 text-white">
      <div
        className="absolute top-0 left-[-39px] h-full w-10 bg-[#e10078]"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 0)",
        }}
      />
      {/* Reports */}
      <div className="relative z-50">
        <button
          onClick={() => {
            setReportsOpen(!reportsOpen);
            setAdminOpen(false);
          }}
          className="flex items-center gap-2 text-base font-medium transition-colors hover:text-[#ffd6eb]"
        >
          <FileBarChart size={20} strokeWidth={1.8} />
          <span>Reports</span>
        </button>

        {reportsOpen && (
          <div
            className="absolute top-full left-0 z-50 mt-2 w-56 animate-[fadeIn_0.15s_ease-out] rounded-xl border border-gray-200 bg-white text-gray-800 shadow-lg"
            onMouseLeave={() => setReportsOpen(false)}
          >
            {[
              { label: "Enrolled Policies", to: "/reports/enrolled-policies" },
              { label: "Draft Policies", to: "/reports/draft-policies" },
              { label: "Submitted Claims", to: "/reports/submitted-claims" },
              { label: "Settled Claims", to: "/reports/settled-claims" },
              { label: "Pending Claims", to: "/reports/pending-claims" },
              { label: "Regretted Claims", to: "/reports/regretted-claims" },
            ].map((item, index, arr) => (
              <a
                key={item.to}
                href={item.to}
                className={`block px-4 py-3 transition-colors hover:bg-pink-50 hover:text-[#e10078] ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === arr.length - 1 ? "rounded-b-xl" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Admin Panel */}
      <div className="relative z-50">
        <button
          onClick={() => {
            setAdminOpen(!adminOpen);
            setReportsOpen(false);
          }}
          className="flex items-center gap-2 text-base font-medium transition-colors hover:text-[#ffd6eb]"
        >
          <UserCircle size={20} strokeWidth={1.8} />
          <span>Admin Panel</span>
        </button>

        {adminOpen && (
          <div
            className="absolute top-full right-0 z-50 mt-2 w-40 animate-[fadeIn_0.15s_ease-out] rounded-xl border border-gray-200 bg-white text-gray-800 shadow-lg"
            onMouseLeave={() => setAdminOpen(false)}
          >
            <Link
              to="/admin/create-agent"
              className="flex w-full items-center gap-2 rounded-t-xl px-4 py-3 font-semibold text-[#e10078] transition-colors hover:bg-pink-50"
            >
              <span className="text-lg">+</span> Create Agent
            </Link>

            <Link
              to="/admin/agent-list"

              className="flex w-full items-center gap-2 rounded-b-xl px-3 py-2 font-semibold text-[#e10078] hover:bg-pink-50"
            >
              <span className="text-lg">≡</span>
              Agent List
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
