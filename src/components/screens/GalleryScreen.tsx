"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Heart,
  Share2,
  Download,
  Trash2,
  Grid,
  List,
  Star,
} from "lucide-react";

const galleryItems = [
  { id: 1, style: "Anime", emoji: "🌸", color: "#7c3aed", date: "Today", liked: true, premium: false },
  { id: 2, style: "Cyberpunk", emoji: "🤖", color: "#06b6d4", date: "Today", liked: false, premium: true },
  { id: 3, style: "Oil Paint", emoji: "🎨", color: "#ec4899", date: "Yesterday", liked: true, premium: false },
  { id: 4, style: "Future Baby", emoji: "👶", color: "#f59e0b", date: "Yesterday", liked: false, premium: true },
  { id: 5, style: "Cartoon", emoji: "🎭", color: "#10b981", date: "2 days ago", liked: true, premium: false },
  { id: 6, style: "Watercolor", emoji: "💧", color: "#7c3aed", date: "3 days ago", liked: false, premium: false },
  { id: 7, style: "3D Render", emoji: "🎮", color: "#f97316", date: "3 days ago", liked: true, premium: true },
  { id: 8, style: "Sketch", emoji: "✏️", color: "#94a3b8", date: "1 week ago", liked: false, premium: false },
  { id: 9, style: "Neon Glow", emoji: "💜", color: "#a78bfa", date: "1 week ago", liked: true, premium: true },
];

export default function GalleryScreen() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState("All");
  const [likedItems, setLikedItems] = useState<Set<number>>(
    new Set(galleryItems.filter((i) => i.liked).map((i) => i.id))
  );

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filters = ["All", "Liked", "Art Styles", "Text-to-Image", "Enhanced", "Cartoon"];

  return (
    <div style={{ height: "calc(100vh - 44px - 72px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              My Gallery
            </h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {galleryItems.length} creations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              {viewMode === "grid" ? (
                <List size={16} style={{ color: "var(--text-secondary)" }} />
              ) : (
                <Grid size={16} style={{ color: "var(--text-secondary)" }} />
              )}
            </button>
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
            >
              <Filter size={16} style={{ color: "var(--text-secondary)" }} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search creations..."
            className="flex-1 text-sm bg-transparent outline-none"
            style={{ color: "var(--text-primary)" }}
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: activeFilter === filter
                  ? "linear-gradient(135deg, #7c3aed, #ec4899)"
                  : "var(--bg-card)",
                color: activeFilter === filter ? "white" : "var(--text-secondary)",
                border: activeFilter === filter ? "none" : "1px solid var(--border-color)",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-2">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl overflow-hidden"
                style={{ aspectRatio: "1" }}
              >
                {/* Image placeholder */}
                <div
                  className="w-full h-full flex items-center justify-center text-4xl"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)`,
                    border: `1px solid ${item.color}33`,
                  }}
                >
                  {item.emoji}
                </div>

                {/* Overlay */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <div className="flex justify-end">
                    {item.premium && (
                      <span className="badge-premium">PRO</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{item.style}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>

                {/* Like button */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <Heart
                    size={12}
                    style={{
                      color: likedItems.has(item.id) ? "#ec4899" : "white",
                      fill: likedItems.has(item.id) ? "#ec4899" : "none",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${item.color}22`,
                    border: `1px solid ${item.color}33`,
                  }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {item.style}
                    </p>
                    {item.premium && <span className="badge-premium">PRO</span>}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {item.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleLike(item.id)}>
                    <Heart
                      size={16}
                      style={{
                        color: likedItems.has(item.id) ? "#ec4899" : "var(--text-muted)",
                        fill: likedItems.has(item.id) ? "#ec4899" : "none",
                      }}
                    />
                  </button>
                  <button>
                    <Share2 size={16} style={{ color: "var(--text-muted)" }} />
                  </button>
                  <button>
                    <Download size={16} style={{ color: "var(--text-muted)" }} />
                  </button>
                  <button>
                    <Trash2 size={16} style={{ color: "var(--text-muted)" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div
          className="mt-4 rounded-2xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
        >
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Your Stats
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Created", value: "9", icon: "🎨" },
              { label: "Liked", value: String(likedItems.size), icon: "❤️" },
              { label: "Shared", value: "3", icon: "📤" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold gradient-text">{stat.value}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Styles */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Your Favorite Styles
          </h3>
          <div className="flex flex-col gap-2">
            {[
              { style: "Anime", count: 3, color: "#7c3aed" },
              { style: "Oil Paint", count: 2, color: "#ec4899" },
              { style: "Cartoon", count: 2, color: "#10b981" },
            ].map((item, i) => (
              <div key={item.style} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: item.color }}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {item.style}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {item.count} times
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(item.count / 3) * 100}%`, background: item.color }}
                    />
                  </div>
                </div>
                <Star size={12} style={{ color: "#f59e0b" }} fill="#f59e0b" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
