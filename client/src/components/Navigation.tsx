"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-xl border-b border-white/5 dark:border-white/5 light:border-black/10" 
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Logo width={140} height={32} showText={true} />

        <div className="hidden md:flex items-center gap-8">
          {["Home", "Services", "Work", "Process", "About", "Contact"].map((item) => {
            const isHomePage = pathname === "/";
            const targetId = item.toLowerCase();
            const href = isHomePage ? `#${targetId}` : `/#${targetId}`;
            
            return (
              <motion.a
                key={item}
                href={href}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    const target = document.getElementById(targetId);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="text-sm text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white dark:bg-white group-hover:w-full transition-all duration-300" />
              </motion.a>
            );
          })}
        </div>

        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-white" />
          ) : (
            <Moon size={18} className="text-gray-900" />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}
