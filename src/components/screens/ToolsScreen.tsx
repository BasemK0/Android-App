"use client";

import { useState } from "react";
import {
  Zap,
  Scissors,
  Sparkles,
  Sun,
  Contrast,
  Droplets,
  Eye,
  Sliders,
  Camera,
  Loader,
  Check,
  ChevronRight,
  Wand2,
  Layers,
  Eraser,
} from "lucide-react";

interface ToolsScreenProps {
  activeFeature?: string;
}

type SubFeature = "enhance" | "bg-remove" | "filters" | "object-edit";

const filters = [
  { id: "vivid", name: "Vivid", emoji: "🌈", premium: false },
  { id: "cinematic", name: "Cinematic", emoji: "🎬", premium: false },
  { id: "golden-hour", name: "Golden Hour", emoji: "🌅", premium: false },
  { id: "moody", name: "Moody", emoji: "🌑", premium: false },
  { id: "neon-dream", name: "Neon Dream", emoji: "💜", premium: true },
  { id: "vintage-film", name: "Vintage Film", emoji: "📽️", premium: true },
  { id: "arctic", name: "Arctic", emoji: "❄️", premium: false },
  { id: "sunset", name: "Sunset", emoji: "🌇", premium: false },
  { id: "forest", name: "Forest", emoji: "🌿", premium: true },
  { id: "ocean", name: "Ocean", emoji: "🌊", premium: true },
  { id: "fire", name: "Fire", emoji: "🔥", premium: true },
  { id: "galaxy", name: "Galaxy", emoji: "🌌", premium: true },
];

export default function ToolsScreen({ activeFeature }: ToolsScreenProps) {
  const [currentFeature, setCurrentFeature] = useState<SubFeature>(
    (activeFeature as SubFeature) || "enhance"
  );
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("vivid");
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [sharpness, setSharpness] = useState(50);

  const handleProcess = () => {
    setIsProcessing(true);
    setIsProcessed(false);
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2000);
  };

  const handleUpload = () => {
    setImageUploaded(true);
    setIsProcessed(false);
  };

  const subFeatures = [
    { id: "enhance", label: "Enhance", icon: Zap },
    { id: "bg-remove", label: "BG Remove", icon: Scissors },
    { id: "filters", label: "AI Filters", icon: Sparkles },
    { id: "object-edit", label: "Object Edit", icon: Eraser },
  ];

  return (
    <div style={{ height: "calc(100vh - 44px - 72px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <div className="mb-4">
          <h1 className="text-xl font-bold gradient-text-cyan">Tools</h1>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Professional AI editing tools
          </p>
        </div>

        {/* Sub-feature tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {subFeatures.map((feat) => {
            const Icon = feat.icon;
            const isActive = currentFeature === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  setCurrentFeature(feat.id as SubFeature);
                  setIsProcessed(false);
                  setImageUploaded(false);
                }}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #06b6d4, #7c3aed)"
                    : "var(--bg-card)",
                  color: isActive ? "white" : "var(--text-secondary)",
                  border: isActive ? "none" : "1px solid var(--border-color)",
                }}
              >
                <Icon size={12} />
                {feat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        {/* PORTRAIT ENHANCE */}
        {currentFeature === "enhance" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} style={{ color: "#10b981" }} />
                <span className="text-sm font-semibold" style={{ color: "#10b981" }}>
                  AI Portrait Enhancer
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Improve lighting, color, and clarity with one tap
              </p>
            </div>

            {/* Upload */}
            <button
              onClick={handleUpload}
              className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-2"
              style={{ height: "130px" }}
            >
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🤳</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Photo loaded</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Check size={12} style={{ color: "#10b981" }} />
                      <span className="text-xs" style={{ color: "#10b981" }}>Ready to enhance</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Camera size={28} style={{ color: "var(--accent-cyan)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Upload Portrait</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Tap to select photo</p>
                </>
              )}
            </button>

            {/* Quick Enhance */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Quick Enhance
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Auto Enhance", icon: Wand2, color: "#7c3aed", desc: "One-tap AI fix" },
                  { name: "Skin Smooth", icon: Eye, color: "#ec4899", desc: "Smooth skin texture" },
                  { name: "Eye Enhance", icon: Eye, color: "#06b6d4", desc: "Brighten & sharpen eyes" },
                  { name: "Teeth Whiten", icon: Sparkles, color: "#10b981", desc: "Natural whitening" },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.name}
                      className="card p-3 flex items-center gap-3"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${tool.color}22` }}
                      >
                        <Icon size={18} style={{ color: tool.color }} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                          {tool.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
                          {tool.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Manual Adjustments */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Manual Adjustments
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Brightness", icon: Sun, value: brightness, setter: setBrightness, color: "#f59e0b" },
                  { label: "Contrast", icon: Contrast, value: contrast, setter: setContrast, color: "#7c3aed" },
                  { label: "Saturation", icon: Droplets, value: saturation, setter: setSaturation, color: "#ec4899" },
                  { label: "Sharpness", icon: Sliders, value: sharpness, setter: setSharpness, color: "#06b6d4" },
                ].map((adj) => {
                  const Icon = adj.icon;
                  return (
                    <div key={adj.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon size={14} style={{ color: adj.color }} />
                          <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                            {adj.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: adj.color }}>
                          {adj.value}
                        </span>
                      </div>
                      <input
                        type="range"
                        className="w-full"
                        value={adj.value}
                        onChange={(e) => adj.setter(Number(e.target.value))}
                        min={0}
                        max={100}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Enhancing...</>
              ) : (
                <><Zap size={18} /> Enhance Portrait</>
              )}
            </button>

            {isProcessed && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#10b981" }}>✨ Enhancement Complete!</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Portrait quality improved by 85%</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BACKGROUND REMOVAL */}
        {currentFeature === "bg-remove" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(236, 72, 153, 0.1))",
                border: "1px solid rgba(249, 115, 22, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Scissors size={16} style={{ color: "#f97316" }} />
                <span className="text-sm font-semibold" style={{ color: "#f97316" }}>
                  Background Remover
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Remove or replace backgrounds with AI precision
              </p>
            </div>

            <button onClick={handleUpload} className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-2" style={{ height: "140px" }}>
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🤳</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Photo loaded</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Ready to remove background</p>
                  </div>
                </div>
              ) : (
                <>
                  <Scissors size={28} style={{ color: "#f97316" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Upload Photo</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>AI will detect & remove background</p>
                </>
              )}
            </button>

            {/* Background Options */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Replace Background With
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: "Transparent", emoji: "⬜", color: "transparent" },
                  { name: "White", emoji: "🤍", color: "#ffffff" },
                  { name: "Black", emoji: "🖤", color: "#000000" },
                  { name: "Blur", emoji: "🌫️", color: "#94a3b8" },
                  { name: "Beach", emoji: "🏖️", color: "#f59e0b" },
                  { name: "City", emoji: "🌆", color: "#7c3aed" },
                  { name: "Forest", emoji: "🌲", color: "#10b981" },
                  { name: "Custom", emoji: "🖼️", color: "#ec4899" },
                ].map((bg) => (
                  <button
                    key={bg.name}
                    className="rounded-xl p-2 flex flex-col items-center gap-1"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <span className="text-xl">{bg.emoji}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
                      {bg.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Edge Refinement */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Edge Refinement
                </h3>
                <span className="text-xs" style={{ color: "#f97316" }}>Auto</span>
              </div>
              <div className="flex gap-2">
                {["Smooth", "Sharp", "Feather", "Hair Detail"].map((opt) => (
                  <button
                    key={opt}
                    className="flex-1 py-1.5 rounded-lg text-xs"
                    style={{
                      background: opt === "Smooth" ? "rgba(249, 115, 22, 0.2)" : "var(--bg-card)",
                      border: opt === "Smooth" ? "1px solid rgba(249, 115, 22, 0.5)" : "1px solid var(--border-color)",
                      color: opt === "Smooth" ? "#f97316" : "var(--text-secondary)",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleProcess} disabled={isProcessing} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold" style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}>
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Removing Background...</>
              ) : (
                <><Scissors size={18} /> Remove Background</>
              )}
            </button>

            {isProcessed && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(249, 115, 22, 0.1)", border: "1px solid rgba(249, 115, 22, 0.3)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#f97316" }}>✂️ Background Removed!</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Clean cutout ready to download</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}>
                      Save PNG
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI FILTERS */}
        {currentFeature === "filters" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1))",
                border: "1px solid rgba(124, 58, 237, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} style={{ color: "#a78bfa" }} />
                <span className="text-sm font-semibold" style={{ color: "#a78bfa" }}>
                  AI Filters & Effects
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                100+ AI-powered filters to transform your photos
              </p>
            </div>

            <button onClick={handleUpload} className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-2" style={{ height: "120px" }}>
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🤳</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Photo loaded</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Select a filter below</p>
                  </div>
                </div>
              ) : (
                <>
                  <Camera size={24} style={{ color: "#a78bfa" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Upload Photo</p>
                </>
              )}
            </button>

            {/* Filter Categories */}
            <div className="flex gap-2 mb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {["All", "Portrait", "Landscape", "Artistic", "Vintage", "Moody"].map((cat) => (
                <button
                  key={cat}
                  className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: cat === "All" ? "linear-gradient(135deg, #7c3aed, #ec4899)" : "var(--bg-card)",
                    color: cat === "All" ? "white" : "var(--text-secondary)",
                    border: cat === "All" ? "none" : "1px solid var(--border-color)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    border: selectedFilter === filter.id
                      ? "2px solid #a78bfa"
                      : "1px solid var(--border-color)",
                  }}
                >
                  <div
                    className="h-20 flex items-center justify-center text-3xl"
                    style={{
                      background: selectedFilter === filter.id
                        ? "rgba(124, 58, 237, 0.2)"
                        : "var(--bg-card)",
                    }}
                  >
                    {filter.emoji}
                  </div>
                  <div
                    className="py-1.5 px-2 flex items-center justify-between"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    <span className="text-xs font-medium" style={{ color: "var(--text-primary)", fontSize: "10px" }}>
                      {filter.name}
                    </span>
                    {filter.premium && (
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#f59e0b", fontSize: "8px" }}
                      >
                        PRO
                      </span>
                    )}
                  </div>
                  {selectedFilter === filter.id && (
                    <div
                      className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "#a78bfa" }}
                    >
                      <Check size={10} color="white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Filter Intensity */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Filter Intensity
                </span>
                <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>80%</span>
              </div>
              <input type="range" className="w-full" defaultValue={80} />
            </div>

            <button onClick={handleProcess} disabled={isProcessing} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold">
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Applying Filter...</>
              ) : (
                <><Sparkles size={18} /> Apply Filter</>
              )}
            </button>

            {isProcessed && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.3)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#a78bfa" }}>✨ Filter Applied!</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {filters.find((f) => f.id === selectedFilter)?.name} filter ready
                    </p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* OBJECT EDIT */}
        {currentFeature === "object-edit" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))",
                border: "1px solid rgba(6, 182, 212, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Eraser size={16} style={{ color: "#06b6d4" }} />
                <span className="text-sm font-semibold" style={{ color: "#06b6d4" }}>
                  Object Editor
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Remove, replace, or edit objects in your photos
              </p>
            </div>

            <button onClick={handleUpload} className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-2" style={{ height: "140px" }}>
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🖼️</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Photo loaded</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Tap on objects to edit</p>
                  </div>
                </div>
              ) : (
                <>
                  <Layers size={28} style={{ color: "#06b6d4" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Upload Photo</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Select objects to remove or replace</p>
                </>
              )}
            </button>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Editing Tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Object Remove", icon: Eraser, color: "#ec4899", desc: "Erase unwanted objects" },
                  { name: "Object Replace", icon: Wand2, color: "#7c3aed", desc: "Replace with AI content" },
                  { name: "Inpainting", icon: Layers, color: "#06b6d4", desc: "Fill areas with AI" },
                  { name: "Expand Image", icon: ChevronRight, color: "#10b981", desc: "Extend photo borders" },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button key={tool.name} className="card p-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${tool.color}22` }}>
                        <Icon size={18} style={{ color: tool.color }} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{tool.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>{tool.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Brush Size
              </h3>
              <input type="range" className="w-full" defaultValue={30} />
            </div>

            <button onClick={handleProcess} disabled={isProcessing} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold" style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}>
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Processing...</>
              ) : (
                <><Wand2 size={18} /> Apply Edit</>
              )}
            </button>

            {isProcessed && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.3)" }}>
                <p className="text-sm font-semibold" style={{ color: "#06b6d4" }}>✅ Edit Applied!</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Object editing complete</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
