"use client";

import { useState } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  ChevronLeft,
  Wand2,
  Baby,
  Scissors,
  Play,
  Check,
  Loader,
  Image as ImageIcon,
  Type,
  Palette,
  Film,
  User,
} from "lucide-react";

interface CreateScreenProps {
  activeFeature?: string;
  onBack?: () => void;
}

const artStyles = [
  { id: "anime", name: "Anime", emoji: "🌸", premium: false },
  { id: "oil-paint", name: "Oil Paint", emoji: "🎨", premium: false },
  { id: "watercolor", name: "Watercolor", emoji: "💧", premium: false },
  { id: "sketch", name: "Sketch", emoji: "✏️", premium: false },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖", premium: true },
  { id: "3d-render", name: "3D Render", emoji: "🎮", premium: true },
  { id: "vintage", name: "Vintage", emoji: "📷", premium: false },
  { id: "neon", name: "Neon Glow", emoji: "💜", premium: true },
  { id: "cartoon", name: "Cartoon", emoji: "🎭", premium: false },
  { id: "pixel", name: "Pixel Art", emoji: "👾", premium: true },
  { id: "impressionist", name: "Impressionist", emoji: "🌅", premium: true },
  { id: "pop-art", name: "Pop Art", emoji: "🎪", premium: true },
];

const hairStyles = [
  { id: "short", name: "Short Cut", emoji: "💈" },
  { id: "long", name: "Long Waves", emoji: "🌊" },
  { id: "curly", name: "Curly", emoji: "🌀" },
  { id: "bun", name: "Top Bun", emoji: "🎀" },
  { id: "mohawk", name: "Mohawk", emoji: "⚡" },
  { id: "afro", name: "Afro", emoji: "✨" },
];

const beardStyles = [
  { id: "none", name: "Clean", emoji: "😊" },
  { id: "stubble", name: "Stubble", emoji: "🧔" },
  { id: "full", name: "Full Beard", emoji: "🧔‍♂️" },
  { id: "goatee", name: "Goatee", emoji: "😎" },
  { id: "mustache", name: "Mustache", emoji: "🥸" },
];

type SubFeature = "art-styles" | "text-to-image" | "cartoon" | "future-baby" | "hair-style";

export default function CreateScreen({ activeFeature, onBack }: CreateScreenProps) {
  const [currentFeature, setCurrentFeature] = useState<SubFeature>(
    (activeFeature as SubFeature) || "art-styles"
  );
  const [selectedStyle, setSelectedStyle] = useState("anime");
  const [selectedHair, setSelectedHair] = useState("short");
  const [selectedBeard, setSelectedBeard] = useState("none");
  const [textPrompt, setTextPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    setIsGenerated(false);
    setTimeout(() => {
      setIsProcessing(false);
      setIsGenerated(true);
    }, 2500);
  };

  const handleUpload = () => {
    setImageUploaded(true);
    setIsGenerated(false);
  };

  const subFeatures = [
    { id: "art-styles", label: "Art Styles", icon: Palette },
    { id: "text-to-image", label: "Text→Image", icon: Type },
    { id: "cartoon", label: "Cartoon", icon: Film },
    { id: "future-baby", label: "Future Baby", icon: Baby },
    { id: "hair-style", label: "Hair & Beard", icon: User },
  ];

  return (
    <div style={{ height: "calc(100vh - 44px - 72px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <button onClick={onBack}>
              <ChevronLeft size={24} style={{ color: "var(--text-primary)" }} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold gradient-text">Create</h1>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              AI-powered creation tools
            </p>
          </div>
        </div>

        {/* Sub-feature tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {subFeatures.map((feat) => {
            const Icon = feat.icon;
            const isActive = currentFeature === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  setCurrentFeature(feat.id as SubFeature);
                  setIsGenerated(false);
                  setImageUploaded(false);
                }}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #7c3aed, #ec4899)"
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
        {/* ART STYLES */}
        {currentFeature === "art-styles" && (
          <div>
            {/* Upload Area */}
            <button
              onClick={handleUpload}
              className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-3"
              style={{ height: imageUploaded ? "120px" : "160px" }}
            >
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                    style={{ background: "rgba(124, 58, 237, 0.2)" }}
                  >
                    🤳
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Photo ready!
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Tap to change photo
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Check size={12} style={{ color: "#10b981" }} />
                      <span className="text-xs" style={{ color: "#10b981" }}>
                        Selfie detected
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(124, 58, 237, 0.15)" }}
                  >
                    <Camera size={28} style={{ color: "var(--accent-purple)" }} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Upload your selfie
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Tap to take photo or choose from gallery
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                      style={{ background: "rgba(124, 58, 237, 0.2)", color: "#a78bfa" }}
                    >
                      <Camera size={12} /> Camera
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                      style={{ background: "rgba(124, 58, 237, 0.2)", color: "#a78bfa" }}
                    >
                      <Upload size={12} /> Gallery
                    </div>
                  </div>
                </>
              )}
            </button>

            {/* Style Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Choose Art Style
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {artStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className="relative rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all"
                    style={{
                      background:
                        selectedStyle === style.id
                          ? "rgba(124, 58, 237, 0.2)"
                          : "var(--bg-card)",
                      border:
                        selectedStyle === style.id
                          ? "1px solid rgba(124, 58, 237, 0.6)"
                          : "1px solid var(--border-color)",
                    }}
                  >
                    {style.premium && (
                      <div
                        className="absolute top-1 right-1 text-xs px-1 rounded"
                        style={{
                          background: "linear-gradient(135deg, #f59e0b, #f97316)",
                          color: "white",
                          fontSize: "8px",
                          fontWeight: "700",
                        }}
                      >
                        PRO
                      </div>
                    )}
                    <span className="text-xl">{style.emoji}</span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color:
                          selectedStyle === style.id
                            ? "#a78bfa"
                            : "var(--text-secondary)",
                        fontSize: "10px",
                      }}
                    >
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Style Intensity
                </span>
                <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>
                  75%
                </span>
              </div>
              <input type="range" className="w-full" defaultValue={75} />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold"
            >
              {isProcessing ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Generating AI Art...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  {imageUploaded ? "Generate Art" : "Upload & Generate"}
                </>
              )}
            </button>

            {/* Result Preview */}
            {isGenerated && (
              <div className="mt-4">
                <div
                  className="rounded-2xl p-4 flex items-center gap-4"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <div className="text-4xl">🎨</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#10b981" }}>
                      ✨ Art Generated!
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Your {artStyles.find((s) => s.id === selectedStyle)?.name} style is ready
                    </p>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TEXT TO IMAGE */}
        {currentFeature === "text-to-image" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(124, 58, 237, 0.1))",
                border: "1px solid rgba(6, 182, 212, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} style={{ color: "#06b6d4" }} />
                <span className="text-sm font-semibold" style={{ color: "#06b6d4" }}>
                  AI Image Generator
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Describe any image and our AI will create it for you
              </p>
            </div>

            {/* Text Input */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-primary)" }}>
                Describe your image
              </label>
              <textarea
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="e.g., A futuristic portrait of a woman with neon lights, cyberpunk style, ultra realistic..."
                className="w-full rounded-xl p-3 text-sm resize-none"
                rows={4}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Be descriptive for better results
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {textPrompt.length}/500
                </span>
              </div>
            </div>

            {/* Style Presets */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Style Preset
              </h3>
              <div className="flex gap-2 flex-wrap">
                {[
                  { name: "Realistic", emoji: "📸" },
                  { name: "Anime", emoji: "🌸" },
                  { name: "Digital Art", emoji: "🖥️" },
                  { name: "Fantasy", emoji: "🧙" },
                  { name: "Sci-Fi", emoji: "🚀" },
                  { name: "Portrait", emoji: "👤" },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    className="style-chip px-3 py-1.5 text-xs flex items-center gap-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {preset.emoji} {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Size */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Image Size
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Square", ratio: "1:1", icon: "⬛" },
                  { label: "Portrait", ratio: "3:4", icon: "📱" },
                  { label: "Landscape", ratio: "4:3", icon: "🖼️" },
                ].map((size) => (
                  <button
                    key={size.label}
                    className="rounded-xl p-2 text-center"
                    style={{
                      background: size.label === "Square" ? "rgba(124, 58, 237, 0.2)" : "var(--bg-card)",
                      border: size.label === "Square" ? "1px solid rgba(124, 58, 237, 0.6)" : "1px solid var(--border-color)",
                    }}
                  >
                    <div className="text-lg mb-1">{size.icon}</div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                      {size.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>
                      {size.ratio}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Suggestions */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Try These Prompts
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  "A glowing portrait with aurora borealis background",
                  "Futuristic city at night with neon reflections",
                  "Magical forest with floating lanterns",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setTextPrompt(prompt)}
                    className="text-left px-3 py-2 rounded-xl text-xs"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing || !textPrompt}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold"
              style={{ opacity: !textPrompt ? 0.6 : 1 }}
            >
              {isProcessing ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Creating Image...
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Generate Image
                </>
              )}
            </button>

            {isGenerated && (
              <div className="mt-4">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(6, 182, 212, 0.1)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">🖼️</div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#06b6d4" }}>
                        Image Generated!
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        Your AI artwork is ready
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2 rounded-xl text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}
                    >
                      Save to Gallery
                    </button>
                    <button
                      className="flex-1 py-2 rounded-xl text-xs font-semibold"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CARTOON */}
        {currentFeature === "cartoon" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(124, 58, 237, 0.1))",
                border: "1px solid rgba(236, 72, 153, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Film size={16} style={{ color: "#ec4899" }} />
                <span className="text-sm font-semibold" style={{ color: "#ec4899" }}>
                  Cartoon Style Video
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Transform your photo into an animated cartoon character
              </p>
            </div>

            <button onClick={handleUpload} className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-3" style={{ height: "150px" }}>
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🤳</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Photo ready!</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Tap to change</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-4xl">📸</div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Upload Photo</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Best results with clear face photos</p>
                </>
              )}
            </button>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Cartoon Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Disney Style", emoji: "🏰", premium: false },
                  { name: "Anime Style", emoji: "🌸", premium: false },
                  { name: "Pixar 3D", emoji: "🎬", premium: true },
                  { name: "Comic Book", emoji: "💥", premium: true },
                ].map((style) => (
                  <button
                    key={style.name}
                    className="rounded-xl p-3 flex items-center gap-3 relative"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    {style.premium && (
                      <div className="absolute top-2 right-2 badge-premium">PRO</div>
                    )}
                    <span className="text-2xl">{style.emoji}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Output Format</h3>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl text-xs font-medium text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}>
                  📸 Image
                </button>
                <button className="flex-1 py-2 rounded-xl text-xs font-medium" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                  🎬 Video (PRO)
                </button>
              </div>
            </div>

            <button onClick={handleProcess} disabled={isProcessing} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold">
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Creating Cartoon...</>
              ) : (
                <><Play size={18} /> Create Cartoon</>
              )}
            </button>

            {isGenerated && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(236, 72, 153, 0.1)", border: "1px solid rgba(236, 72, 153, 0.3)" }}>
                <p className="text-sm font-semibold" style={{ color: "#ec4899" }}>🎨 Cartoon Created!</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Your cartoon portrait is ready to save</p>
              </div>
            )}
          </div>
        )}

        {/* FUTURE BABY */}
        {currentFeature === "future-baby" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1))",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Baby size={16} style={{ color: "#f59e0b" }} />
                <span className="text-sm font-semibold" style={{ color: "#f59e0b" }}>
                  Future Baby Generator
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                See what your future baby might look like using AI
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={handleUpload} className="upload-area flex flex-col items-center justify-center gap-2" style={{ height: "120px" }}>
                <div className="text-3xl">👩</div>
                <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>Mom&apos;s Photo</p>
                <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>Tap to upload</p>
              </button>
              <button className="upload-area flex flex-col items-center justify-center gap-2" style={{ height: "120px" }}>
                <div className="text-3xl">👨</div>
                <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>Dad&apos;s Photo</p>
                <p className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px" }}>Tap to upload</p>
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Baby Age</h3>
              <div className="flex gap-2">
                {["Newborn", "1 Year", "3 Years", "5 Years"].map((age) => (
                  <button
                    key={age}
                    className="flex-1 py-2 rounded-xl text-xs font-medium"
                    style={{
                      background: age === "1 Year" ? "rgba(124, 58, 237, 0.2)" : "var(--bg-card)",
                      border: age === "1 Year" ? "1px solid rgba(124, 58, 237, 0.6)" : "1px solid var(--border-color)",
                      color: age === "1 Year" ? "#a78bfa" : "var(--text-secondary)",
                    }}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Baby Gender</h3>
              <div className="flex gap-3">
                {[
                  { label: "👧 Girl", color: "#ec4899" },
                  { label: "👦 Boy", color: "#06b6d4" },
                  { label: "🎲 Surprise", color: "#7c3aed" },
                ].map((gender) => (
                  <button
                    key={gender.label}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                    style={{
                      background: `${gender.color}22`,
                      border: `1px solid ${gender.color}44`,
                      color: gender.color,
                    }}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleProcess} disabled={isProcessing} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold">
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Generating Baby...</>
              ) : (
                <><Baby size={18} /> Generate Future Baby</>
              )}
            </button>

            {isGenerated && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                <p className="text-sm font-semibold" style={{ color: "#f59e0b" }}>👶 Baby Generated!</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Your future baby portrait is ready!</p>
              </div>
            )}
          </div>
        )}

        {/* HAIR & BEARD */}
        {currentFeature === "hair-style" && (
          <div>
            <div
              className="rounded-2xl p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <User size={16} style={{ color: "#10b981" }} />
                <span className="text-sm font-semibold" style={{ color: "#10b981" }}>
                  Hair & Beard Changer
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Try different hairstyles and beard styles virtually
              </p>
            </div>

            <button onClick={handleUpload} className="upload-area w-full mb-4 flex flex-col items-center justify-center gap-2" style={{ height: "130px" }}>
              {imageUploaded ? (
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🤳</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Photo ready!</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Tap to change</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-3xl">📸</div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Upload Your Photo</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Front-facing photo works best</p>
                </>
              )}
            </button>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Hair Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {hairStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedHair(style.id)}
                    className="rounded-xl p-2.5 flex flex-col items-center gap-1"
                    style={{
                      background: selectedHair === style.id ? "rgba(16, 185, 129, 0.2)" : "var(--bg-card)",
                      border: selectedHair === style.id ? "1px solid rgba(16, 185, 129, 0.6)" : "1px solid var(--border-color)",
                    }}
                  >
                    <span className="text-xl">{style.emoji}</span>
                    <span className="text-xs" style={{ color: selectedHair === style.id ? "#10b981" : "var(--text-secondary)", fontSize: "10px" }}>
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Beard Style</h3>
              <div className="grid grid-cols-3 gap-2">
                {beardStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedBeard(style.id)}
                    className="rounded-xl p-2.5 flex flex-col items-center gap-1"
                    style={{
                      background: selectedBeard === style.id ? "rgba(6, 182, 212, 0.2)" : "var(--bg-card)",
                      border: selectedBeard === style.id ? "1px solid rgba(6, 182, 212, 0.6)" : "1px solid var(--border-color)",
                    }}
                  >
                    <span className="text-xl">{style.emoji}</span>
                    <span className="text-xs" style={{ color: selectedBeard === style.id ? "#06b6d4" : "var(--text-secondary)", fontSize: "10px" }}>
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Color */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Hair Color</h3>
              <div className="flex gap-2">
                {[
                  { color: "#1a1a1a", name: "Black" },
                  { color: "#8B4513", name: "Brown" },
                  { color: "#FFD700", name: "Blonde" },
                  { color: "#FF4500", name: "Red" },
                  { color: "#808080", name: "Gray" },
                  { color: "#9B59B6", name: "Purple" },
                  { color: "#00CED1", name: "Teal" },
                ].map((c) => (
                  <button
                    key={c.name}
                    className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white transition-all"
                    style={{ background: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <button onClick={handleProcess} disabled={isProcessing} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold">
              {isProcessing ? (
                <><Loader size={18} className="animate-spin" /> Applying Style...</>
              ) : (
                <><Wand2 size={18} /> Apply Style</>
              )}
            </button>

            {isGenerated && (
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                <p className="text-sm font-semibold" style={{ color: "#10b981" }}>✨ Style Applied!</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>Your new look is ready to save</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
