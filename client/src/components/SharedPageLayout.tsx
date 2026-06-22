"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AexonAIChat from "@/components/AexonAIChat";
import { useTheme } from "@/contexts/ThemeContext";

// A wrapper to handle the background color based on theme
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div style={{ backgroundColor: isDark ? "#072B88" : "#F7F9FC", minHeight: "100vh" }} className="transition-colors duration-300">
      {children}
    </div>
  );
}

export default function SharedPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <Navigation />
      <ThemeWrapper>
        <main className="pt-24 min-h-screen">
          {children}
        </main>
      </ThemeWrapper>
      <Footer />
      <AexonAIChat />
    </ThemeProvider>
  );
}
