// src/components/layout/Header.tsx

import { PinkBar } from "./PinkBar";
import { LogoTitle } from "./LogoTitle";

export function Header() {
  return (
    <header className="sticky top-0 z-[9999] bg-white">
      {/* TOP ROW: Pink Bar */}
      <PinkBar />

      {/* SECOND ROW: Logo + Dynamic Menu/Submenu */}
      <LogoTitle />
    </header>
  );
}
