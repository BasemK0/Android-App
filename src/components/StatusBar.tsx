"use client";

import { Wifi, Battery, Signal } from "lucide-react";

export default function StatusBar() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return (
    <div
      className="flex items-center justify-between px-5 py-2"
      style={{
        background: "var(--bg-primary)",
        height: "44px",
        paddingTop: "env(safe-area-inset-top, 8px)",
      }}
    >
      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        {hours}:{minutes}
      </span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} style={{ color: "var(--text-primary)" }} />
        <Wifi size={14} style={{ color: "var(--text-primary)" }} />
        <Battery size={16} style={{ color: "var(--text-primary)" }} />
      </div>
    </div>
  );
}
