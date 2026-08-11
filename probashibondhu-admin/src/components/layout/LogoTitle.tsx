import React from "react";
import { useLocation } from "react-router-dom";

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
    if (location.pathname === "/") {
      return { menu: "ProbashiBondhu", submenu: "Dashboard" };
    }

    if (location.pathname.startsWith("/reports")) {
      if (location.pathname.includes("claims"))
        return { menu: "Reports", submenu: "Claims" };

      if (location.pathname.includes("enrolled-policies"))
        return { menu: "Reports", submenu: "Enrolled Policies" };

      if (location.pathname.includes("agents-performance"))
        return { menu: "Reports", submenu: "Agents Performance" };

      return { menu: "Reports", submenu: "" };
    }

    if (location.pathname.startsWith("/admin")) {
      if (location.pathname.includes("agent-list"))
        return { menu: "Admin Panel", submenu: "Agents List" };

      if (location.pathname.includes("create-agent"))
        return { menu: "Admin Panel", submenu: "Create Agent" };

      return { menu: "Admin Panel", submenu: "" };
    }

    return { menu: "Dashboard", submenu: "" };
  };

  const { menu, submenu } = getMenuInfo();

  return (
    <div className="-mt-10 flex items-center gap-4 px-8 py-1">
      {/* Logo */}
      <img
        src="/bima-logo.png"
        alt="ProbashiBondhu"
        className="h-24 w-24 object-contain"
      />
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
              <MenuText menu={menu} />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
