"use client";

import { useState } from "react";
import {
  Crown,
  Check,
  Sparkles,
  Zap,
  Star,
  Shield,
  Infinity,
  ChevronRight,
  X,
} from "lucide-react";

const plans = [
  {
    id: "weekly",
    name: "Weekly",
    price: "$2.99",
    period: "/week",
    originalPrice: null,
    popular: false,
    color: "#7c3aed",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    originalPrice: "$14.99",
    popular: true,
    color: "#ec4899",
    savings: "Save 33%",
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$59.99",
    period: "/year",
    originalPrice: "$119.88",
    popular: false,
    color: "#f59e0b",
    savings: "Save 50%",
  },
];

const premiumFeatures = [
  {
    icon: Sparkles,
    title: "200+ AI Art Styles",
    desc: "Access all premium art styles including Cyberpunk, 3D Render, Neon Glow",
    free: "12 styles",
    premium: "200+ styles",
    color: "#7c3aed",
  },
  {
    icon: Zap,
    title: "Unlimited Generations",
    desc: "Generate as many images as you want without daily limits",
    free: "5/day",
    premium: "Unlimited",
    color: "#10b981",
  },
  {
    icon: Star,
    title: "HD Export Quality",
    desc: "Export images in 4K resolution without watermarks",
    free: "720p + watermark",
    premium: "4K, no watermark",
    color: "#f59e0b",
  },
  {
    icon: Crown,
    title: "Priority Processing",
    desc: "Your images are processed first with faster AI models",
    free: "Standard queue",
    premium: "Priority queue",
    color: "#ec4899",
  },
  {
    icon: Shield,
    title: "Commercial License",
    desc: "Use your AI creations for commercial purposes",
    free: "Personal only",
    premium: "Commercial use",
    color: "#06b6d4",
  },
  {
    icon: Infinity,
    title: "Cloud Storage",
    desc: "Store all your creations in the cloud forever",
    free: "50 photos",
    premium: "Unlimited",
    color: "#f97316",
  },
];

const freeFeatures = [
  "12 basic AI art styles",
  "5 generations per day",
  "720p export with watermark",
  "Basic portrait enhancement",
  "Background removal (3/day)",
  "50 photo cloud storage",
];

const premiumOnlyFeatures = [
  "200+ premium AI art styles",
  "Unlimited daily generations",
  "4K export, no watermark",
  "Advanced portrait AI tools",
  "Unlimited background removal",
  "Unlimited cloud storage",
  "Priority AI processing",
  "Commercial license",
  "Exclusive new styles first",
  "24/7 premium support",
];

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div style={{ height: "calc(100vh - 44px - 72px)", display: "flex", flexDirection: "column" }}>
      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div
          className="relative overflow-hidden px-5 pt-6 pb-8"
          style={{
            background: "linear-gradient(180deg, #1a0a2e 0%, #0a0a0f 100%)",
          }}
        >
          {/* Background orbs */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #7c3aed, transparent)",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #ec4899, transparent)",
              transform: "translate(30%, 30%)",
            }}
          />

          <div className="relative z-10 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 float"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)",
              }}
            >
              <Crown size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              FaceVerse <span className="gradient-text">Premium</span>
            </h1>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Unlock the full power of AI photo editing
            </p>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex -space-x-2">
                {["🧑", "👩", "👨", "🧑‍🦱"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm border-2"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--bg-primary)",
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <span className="text-xs" style={{ color: "#94a3b8" }}>
                <span className="font-bold text-white">2M+</span> premium users
              </span>
            </div>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="px-5 -mt-4 mb-5">
          <div className="flex flex-col gap-3">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className="relative rounded-2xl p-4 text-left transition-all"
                style={{
                  background: selectedPlan === plan.id
                    ? `linear-gradient(135deg, ${plan.color}22, ${plan.color}11)`
                    : "var(--bg-card)",
                  border: selectedPlan === plan.id
                    ? `2px solid ${plan.color}`
                    : "1px solid var(--border-color)",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #ec4899, #7c3aed)" }}
                  >
                    ⭐ Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedPlan === plan.id ? plan.color : "var(--border-color)",
                        background: selectedPlan === plan.id ? plan.color : "transparent",
                      }}
                    >
                      {selectedPlan === plan.id && (
                        <Check size={10} color="white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                        {plan.name}
                      </p>
                      {plan.savings && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${plan.color}22`,
                            color: plan.color,
                          }}
                        >
                          {plan.savings}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold" style={{ color: plan.color }}>
                        {plan.price}
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {plan.period}
                      </span>
                    </div>
                    {plan.originalPrice && (
                      <p
                        className="text-xs line-through"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {plan.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-5 mb-5">
          <button
            className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
            }}
          >
            <Crown size={20} />
            Start Free Trial — 7 Days Free
          </button>
          <p className="text-center text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            Cancel anytime • No commitment
          </p>
        </div>

        {/* Feature Comparison */}
        <div className="px-5 mb-5">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center justify-between w-full mb-3"
          >
            <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              What&apos;s Included
            </h2>
            <ChevronRight
              size={18}
              style={{
                color: "var(--text-secondary)",
                transform: showComparison ? "rotate(90deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-3">
            {premiumFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-xl p-3 flex items-start gap-3"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${feat.color}22` }}
                  >
                    <Icon size={18} style={{ color: feat.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {feat.title}
                    </p>
                    <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>
                      {feat.desc}
                    </p>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1">
                        <X size={10} style={{ color: "#ef4444" }} />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Free: {feat.free}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check size={10} style={{ color: "#10b981" }} />
                        <span className="text-xs" style={{ color: "#10b981" }}>
                          Pro: {feat.premium}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free vs Premium Table */}
        <div className="px-5 mb-5">
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Free vs Premium
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border-color)" }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-2"
              style={{ background: "var(--bg-secondary)" }}
            >
              <div className="p-3 text-center">
                <p className="text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
                  Free
                </p>
              </div>
              <div
                className="p-3 text-center"
                style={{ background: "rgba(245, 158, 11, 0.1)" }}
              >
                <p className="text-sm font-bold" style={{ color: "#f59e0b" }}>
                  👑 Premium
                </p>
              </div>
            </div>

            {/* Free features */}
            <div className="grid grid-cols-2">
              <div className="p-3 border-r" style={{ borderColor: "var(--border-color)" }}>
                {freeFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 mb-2">
                    <Check size={12} style={{ color: "#64748b", marginTop: "2px", flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3" style={{ background: "rgba(245, 158, 11, 0.05)" }}>
                {premiumOnlyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 mb-2">
                    <Check size={12} style={{ color: "#f59e0b", marginTop: "2px", flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: "var(--text-primary)" }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-5 mb-5">
          <h2 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            What Users Say
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                name: "Sarah M.",
                avatar: "👩‍🦰",
                rating: 5,
                text: "The AI art styles are incredible! I use it every day to create unique content for my social media.",
              },
              {
                name: "James K.",
                avatar: "👨‍💼",
                rating: 5,
                text: "Background removal is flawless. Saves me hours of Photoshop work. Worth every penny!",
              },
              {
                name: "Priya S.",
                avatar: "👩‍🎨",
                rating: 5,
                text: "The future baby feature is so fun! Generated portraits for my whole family. Amazing quality.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-xl p-4"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{review.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {review.name}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={10} style={{ color: "#f59e0b" }} fill="#f59e0b" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="px-5 mb-8">
          <button
            className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 mb-3"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
            }}
          >
            <Crown size={20} />
            Upgrade to Premium
          </button>
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: Shield, text: "Secure Payment" },
              { icon: Zap, text: "Instant Access" },
              { icon: X, text: "Cancel Anytime" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-1">
                  <Icon size={12} style={{ color: "var(--text-muted)" }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
