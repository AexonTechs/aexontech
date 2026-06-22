"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage for saved theme, default to light
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    
    // Apply theme immediately
    const root = document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.style.backgroundColor = "#072B88";
      document.body.style.color = "#ffffff";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#F7F9FC";
      document.body.style.color = "#5B6B82";
    }
  }, []);

  // Update theme when it changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      document.body.style.backgroundColor = "#072B88";
      document.body.style.color = "#ffffff";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#F7F9FC";
      document.body.style.color = "#5B6B82";
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      console.log("Toggling theme from", prev, "to", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
