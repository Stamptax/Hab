"use client";

import MagnetLines from "@/components/animations/MagnetLines/MagnetLines";

export function MagnetBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      <div className="absolute inset-0 flex items-center justify-center">
        <MagnetLines
          rows={20}
          columns={20}
          containerWidth="max(100vw, 100vh)"
          containerHeight="max(100vw, 100vh)"
          lineColor="pink"
          lineWidth="0.3vmin"
          lineHeight="3vmin"
          baseAngle={0}
        />
      </div>
    </div>
  );
}
