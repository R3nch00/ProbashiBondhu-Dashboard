import React from "react";
import { Link, useLocation } from "react-router-dom";

// Separate cylinder function
function CylinderShape() {
  return <div className="mb-2 h-2 w-32 rounded-full bg-gray-500"></div>;
}

// Menu component (pink)
function MenuText({ menu }: { menu: string }) {
  return <span className="text-[#e10078]">{menu}</span>;
}

// Submenu component (gray-500)
function SubmenuText({ submenu }: { submenu: string }) {
  return <span className="text-gray-500"> {submenu}</span>;
}
export function LogoTitle() {
  const location = useLocation();

  const getMenuInfo = () => {
    // Define all submenu mappings here
    const routeMap: Record<string, { menu: string; submenu: string }> = {
      "/reports/enrolled-policies": { menu: "Reports", submenu: "Enrolled Policies" },
      "/reports/draft-policies": { menu: "Reports", submenu: "Draft Policies" },
      "/reports/submitted-claims": { menu: "Reports", submenu: "Submitted Claims" },
      "/reports/settled-claims": { menu: "Reports", submenu: "Settled Claims" },
      "/reports/pending-claims": { menu: "Reports", submenu: "Pending Claims" },
      "/reports/regretted-claims": { menu: "Reports", submenu: "Regretted Claims" },
      "/reports/agents-performance": { menu: "Reports", submenu: "Agents Performance" },

      "/admin/agent-list": { menu: "Admin Panel", submenu: "Agent List" },
      "/admin/create-agent": { menu: "Admin Panel", submenu: "Create Agent" },
    };

    // Dashboard root
    if (location.pathname === "/") {
      return { menu: "ProbashiBondhu", submenu: "Dashboard" };
    }

    // If exact match found in map
    if (routeMap[location.pathname]) {
      return routeMap[location.pathname];
    }

    // Fallbacks
    if (location.pathname.startsWith("/reports")) {
      return { menu: "Reports", submenu: null };
    }
    if (location.pathname.startsWith("/admin")) {
      return { menu: "Admin Panel", submenu: null };
    }

    return { menu: "Dashboard", submenu: null };
  };

  const { menu, submenu } = getMenuInfo();

  return (
    <div className="-mt-10 flex items-center gap-4 px-8 py-1">
      {/* Logo - clicking redirects to Dashboard */}
      <Link to="/">
        <img
          src="/bima-logo.png"
          alt="ProbashiBondhu"
          className="h-24 w-24 cursor-pointer object-contain"
        />
      </Link>
      {/* Cylinder above title */}
      <div className="flex min-w-0 flex-col">
        <CylinderShape />

        {/* Title text */}
        <div>
          {/* First line always pink */}
          <p className="text-4xl font-medium tracking-tight text-[#e10078]">
            {location.pathname === "/" ? "ProbashiBondhu" : <MenuText menu={menu} />}
          </p>

          {/* Second line: landing page shows Dashboard in gray, other pages show submenu in gray */}
          <p className="text-5xl font-semibold text-gray-500">
            {location.pathname === "/" ? (
              "Dashboard"
            ) : submenu ? (
              <SubmenuText submenu={submenu} />
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
