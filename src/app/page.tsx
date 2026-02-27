"use client";

import { useState } from "react";
import StatusBar from "@/components/StatusBar";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/screens/HomeScreen";
import CreateScreen from "@/components/screens/CreateScreen";
import ToolsScreen from "@/components/screens/ToolsScreen";
import GalleryScreen from "@/components/screens/GalleryScreen";
import PremiumScreen from "@/components/screens/PremiumScreen";

type Tab = "home" | "create" | "tools" | "gallery" | "premium";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [activeFeature, setActiveFeature] = useState<string | undefined>(undefined);

  const handleNavigate = (tab: string, feature?: string) => {
    setActiveTab(tab as Tab);
    setActiveFeature(feature);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as Tab);
    setActiveFeature(undefined);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Main Content */}
      <div style={{ flex: 1, position: "relative" }}>
        {activeTab === "home" && (
          <HomeScreen onNavigate={handleNavigate} />
        )}
        {activeTab === "create" && (
          <CreateScreen activeFeature={activeFeature} />
        )}
        {activeTab === "tools" && (
          <ToolsScreen activeFeature={activeFeature} />
        )}
        {activeTab === "gallery" && (
          <GalleryScreen />
        )}
        {activeTab === "premium" && (
          <PremiumScreen />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
