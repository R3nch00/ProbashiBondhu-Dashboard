// src/components/layout/Header.tsx

import { PinkBar } from "./PinkBar";
import { LogoTitle } from "./LogoTitle";
import { DateFilter } from "./DateFilter";

export function Header() {
  return (
    <header className="sticky top-0 z-[9999] bg-white">
      {/* TOP ROW: Pink Bar */}
      <PinkBar />

      {/* SECOND ROW: Logo + Dynamic Menu/Submenu */}
      <LogoTitle />

      {/* THIRD ROW: Date Filter */}
    </header>
  );
}
