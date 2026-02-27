import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FaceVerse Editor",
  description: "AI-Powered Photo Editor - Transform your photos with cutting-edge AI",
  manifest: "/manifest.json",
  themeColor: "#0a0a0f",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
