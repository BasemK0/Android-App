"use client";

import { Home, Sparkles, Wand2, Image, Crown } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "create", label: "Create", icon: Sparkles },
  { id: "tools", label: "Tools", icon: Wand2 },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "premium", label: "Premium", icon: Crown },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative"
              style={{
                minWidth: "60px",
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "rgba(124, 58, 237, 0.15)",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                  }}
                />
              )}

              {/* Premium crown special styling */}
              {item.id === "premium" && !isActive && (
                <div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)" }}
                />
              )}

              <Icon
                size={22}
                style={{
                  color: isActive ? "#a78bfa" : "#64748b",
                  filter: isActive ? "drop-shadow(0 0 6px rgba(167, 139, 250, 0.6))" : "none",
                  transition: "all 0.2s ease",
                }}
              />
              <span
                className="text-xs font-medium relative z-10"
                style={{
                  color: isActive ? "#a78bfa" : "#64748b",
                  fontSize: "10px",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area for Android */}
      <div style={{ height: "env(safe-area-inset-bottom, 8px)" }} />
    </div>
  );
}
