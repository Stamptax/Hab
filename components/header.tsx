"use client";

import TextPressure from "@/components/animations/TextPressure/TextPressure";
export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <TextPressure
              text="Hab"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#c026d3"
              strokeColor="#7c3aed"
              minFontSize={48}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
