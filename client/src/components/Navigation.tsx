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
      className="fixed top-0 left-0 right-0 z-50 bg-dark-navy/80 backdrop-blur-xl border-b border-white/10 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo width={130} height={28} showText={true} />

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", targetId: "" },
            { label: "Services", targetId: "services" },
            { label: "Work", targetId: "products" },
            { label: "Projects", targetId: "projects" },
            { label: "Process", targetId: "process" },
            { label: "About", targetId: "about" },
            { label: "Contact", targetId: "contact" },
          ].map(({ label, targetId }) => {
            const isHomePage = pathname === "/";
            const href = targetId
              ? isHomePage
                ? `#${targetId}`
                : `/#${targetId}`
              : "/";

            return (
              <motion.a
                key={label}
                href={href}
                onClick={(e) => {
                  if (!isHomePage) return;

                  if (!targetId) {
                    e.preventDefault();
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    return;
                  }

                  e.preventDefault();

                  const target = document.getElementById(targetId);

                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="text-sm font-semibold text-white transition-colors duration-300 relative group py-1.5 hover:text-cyan-blue"
                whileHover={{ y: -1 }}
              >
                {label}

                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-cyan-blue group-hover:w-full transition-all duration-300" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
