"use client";

import {
  Sparkles,
  Wand2,
  Image,
  Scissors,
  Baby,
  Palette,
  Camera,
  ChevronRight,
  Star,
  TrendingUp,
  Zap,
  Crown,
} from "lucide-react";

interface HomeScreenProps {
  onNavigate: (tab: string, feature?: string) => void;
}

const quickActions = [
  {
    id: "art-styles",
    icon: Palette,
    label: "AI Art",
    sublabel: "Selfie to Art",
    gradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
    tab: "create",
    feature: "art-styles",
  },
  {
    id: "text-to-image",
    icon: Sparkles,
    label: "Text→Image",
    sublabel: "AI Generate",
    gradient: "linear-gradient(135deg, #06b6d4, #7c3aed)",
    tab: "create",
    feature: "text-to-image",
  },
  {
    id: "enhance",
    icon: Zap,
    label: "Enhance",
    sublabel: "Portrait AI",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
    tab: "tools",
    feature: "enhance",
  },
  {
    id: "bg-remove",
    icon: Scissors,
    label: "BG Remove",
    sublabel: "Clean Cut",
    gradient: "linear-gradient(135deg, #f97316, #ec4899)",
    tab: "tools",
    feature: "bg-remove",
  },
];

const featuredTools = [
  {
    id: "cartoon",
    icon: "🎨",
    title: "Cartoon Style",
    description: "Turn photos into animated cartoon art",
    badge: "HOT",
    badgeColor: "#ec4899",
    tab: "create",
    feature: "cartoon",
  },
  {
    id: "future-baby",
    icon: "👶",
    title: "Future Baby",
    description: "Generate your future baby portrait",
    badge: "NEW",
    badgeColor: "#7c3aed",
    tab: "create",
    feature: "future-baby",
  },
  {
    id: "hair-style",
    icon: "💇",
    title: "Hair & Beard",
    description: "Try different hairstyles & beard styles",
    badge: "FREE",
    badgeColor: "#10b981",
    tab: "create",
    feature: "hair-style",
  },
  {
    id: "filters",
    icon: "✨",
    title: "AI Filters",
    description: "100+ AI-powered photo filters",
    badge: "PRO",
    badgeColor: "#f59e0b",
    tab: "tools",
    feature: "filters",
  },
];

const recentCreations = [
  { id: 1, style: "Anime", color: "#7c3aed", emoji: "🌸" },
  { id: 2, style: "Oil Paint", color: "#ec4899", emoji: "🎨" },
  { id: 3, style: "Cartoon", color: "#06b6d4", emoji: "🎭" },
  { id: 4, style: "Sketch", color: "#10b981", emoji: "✏️" },
];

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div
      className="scroll-container"
      style={{ height: "calc(100vh - 44px - 72px)", overflowY: "auto" }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Good morning 👋
            </p>
            <h1 className="text-2xl font-bold">
              <span className="gradient-text">FaceVerse</span>
              <span style={{ color: "var(--text-primary)" }}> Editor</span>
            </h1>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="notif-dot" />
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
          }}
        >
          {/* Glow orbs */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #7c3aed, transparent)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #ec4899, transparent)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: "rgba(124, 58, 237, 0.3)", color: "#a78bfa" }}
              >
                ✨ AI POWERED
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">
              Transform Your Photos
            </h2>
            <p className="text-sm mb-4" style={{ color: "#94a3b8" }}>
              Create stunning AI art from your selfies in seconds
            </p>
            <button
              onClick={() => onNavigate("create", "art-styles")}
              className="btn-primary px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
            >
              <Sparkles size={16} />
              Try Now — It&apos;s Free
            </button>
          </div>

          {/* Floating emoji art */}
          <div
            className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl float"
            style={{ filter: "drop-shadow(0 0 15px rgba(124, 58, 237, 0.5))" }}
          >
            🎨
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Quick Actions
          </h2>
          <button
            onClick={() => onNavigate("create")}
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--accent-purple)" }}
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.tab, action.feature)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: action.gradient,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  <Icon size={24} color="white" />
                </div>
                <div className="text-center">
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {action.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
                    {action.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl p-4"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "50M+", label: "Users", icon: "👥" },
              { value: "200+", label: "AI Styles", icon: "🎨" },
              { value: "4.9★", label: "Rating", icon: "⭐" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg mb-0.5">{stat.icon}</div>
                <div
                  className="text-base font-bold gradient-text"
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Featured Tools
          </h2>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} style={{ color: "var(--accent-purple)" }} />
            <span className="text-xs" style={{ color: "var(--accent-purple)" }}>
              Trending
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.tab, tool.feature)}
              className="card p-4 text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{tool.icon}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: `${tool.badgeColor}22`,
                    color: tool.badgeColor,
                    border: `1px solid ${tool.badgeColor}44`,
                  }}
                >
                  {tool.badge}
                </span>
              </div>
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {tool.title}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {tool.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Creations */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Recent Creations
          </h2>
          <button
            onClick={() => onNavigate("gallery")}
            className="flex items-center gap-1 text-xs"
            style={{ color: "var(--accent-purple)" }}
          >
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {recentCreations.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1"
              style={{
                background: `${item.color}22`,
                border: `1px solid ${item.color}44`,
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-medium" style={{ color: item.color, fontSize: "9px" }}>
                {item.style}
              </span>
            </div>
          ))}
          {/* Add new */}
          <button
            onClick={() => onNavigate("create")}
            className="flex-shrink-0 w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1"
            style={{
              border: "2px dashed var(--border-color)",
              background: "transparent",
            }}
          >
            <Camera size={20} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
              New
            </span>
          </button>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="px-5 mb-6">
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(249, 115, 22, 0.15))",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)" }}
          >
            <Crown size={24} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold" style={{ color: "#f59e0b" }}>
              Upgrade to Premium
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Unlock 200+ styles & unlimited exports
            </p>
          </div>
          <button
            onClick={() => onNavigate("premium")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #f59e0b, #f97316)" }}
          >
            Try Free
          </button>
        </div>
      </div>

      {/* Trending Styles */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Trending Styles
          </h2>
          <div className="flex items-center gap-1">
            <Star size={12} style={{ color: "#f59e0b" }} fill="#f59e0b" />
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              This week
            </span>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {[
            { name: "Anime", emoji: "🌸", count: "2.1M" },
            { name: "Cyberpunk", emoji: "🤖", count: "1.8M" },
            { name: "Watercolor", emoji: "💧", count: "1.5M" },
            { name: "3D Render", emoji: "🎮", count: "1.2M" },
            { name: "Vintage", emoji: "📷", count: "980K" },
          ].map((style) => (
            <button
              key={style.name}
              onClick={() => onNavigate("create", "art-styles")}
              className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
            >
              <span className="text-base">{style.emoji}</span>
              <div className="text-left">
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {style.name}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
                  {style.count} uses
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
