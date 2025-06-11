"use client";

import { useState } from "react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">Hab</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
