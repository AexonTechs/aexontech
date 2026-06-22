"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeContext";

const HolographicObjects = dynamic(() => import("./HolographicObjects"), {
  ssr: false,
});

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg, #072B88 0%, #0A3DFF 100%)" }}
    >
      {/* Ambient glowing wave network effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.15),transparent_60%)] pointer-events-none" />
      
      {/* Digital circuit/network grid overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(0,180,255,0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" />
        </svg>
      </div>

      {/* Abstract wave lines */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,160 C320,240 640,80 960,180 C1280,280 1360,120 1440,160 L1440,320 L0,320 Z" fill="url(#wave-gradient-1)" />
          <path d="M0,224 C320,160 640,280 960,200 C1280,120 1360,240 1440,224 L1440,320 L0,320 Z" fill="url(#wave-gradient-2)" />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D4B8" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1A56F0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00B4FF" stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Sparkles pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-blue/30 bg-cyan-blue/10 backdrop-blur-sm"
          >
            <Sparkles size={16} className="text-cyan-blue animate-pulse" />
            <span className="text-sm font-semibold tracking-wider text-cyan-blue uppercase">
              AI-Native Engineering
            </span>
          </motion.div>

          {/* Main Typography Header */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-black leading-tight tracking-tight"
          >
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-blue to-teal-green relative inline-block font-extrabold pb-1">
              Intelligent Digital Solutions
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-blue to-teal-green"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
            <br />
            for the Future.
          </motion.h1>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-medium"
          >
            Building scalable AI-native platforms and cloud infrastructure that power the next generation of enterprise software.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 0 35px rgba(10,61,255,0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-full font-bold flex items-center gap-2 relative overflow-hidden bg-gradient-to-r from-[#0A3DFF] to-[#00B4FF] text-white shadow-lg cursor-pointer"
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(255,255,255,0.08)"
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-bold border-2 border-cyan-blue text-white transition-all backdrop-blur-sm cursor-pointer"
            >
              View Our Work
            </motion.button>
          </motion.div>

          {/* Footer Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-x-12 gap-y-4 pt-8 border-t border-white/10"
          >
            {[
              { label: "Precision Engineering" },
              { label: "AI-First Mindset" },
              { label: "Scalable Architecture" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-green animate-pulse" />
                <div className="text-sm font-semibold text-white/80">
                  {feature.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Canvas Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative"
        >
          {/* Ambient visual glow behind the 3D model */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-500/5 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-blue/15 rounded-full blur-3xl" />
          <HolographicObjects
            width="100%"
            height="600px"
            className=""
          />
        </motion.div>
      </div>
    </section>
  );
}