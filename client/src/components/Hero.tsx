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
  const isDark = theme === "dark";

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#050505" : "#ffffff" }}
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-white/[0.02] via-transparent to-transparent dark:from-white/[0.02] light:from-black/[0.02]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/[0.01] dark:bg-white/[0.01] light:bg-black/[0.01] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <Sparkles size={16} className="text-white" />
            <span className="text-sm text-gray-300">AI-Native Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className={isDark ? "text-white" : "text-black"}>Engineering</span>
            <br />
            <span className={`${isDark ? "text-white" : "text-black"} relative inline-block`}>
              Intelligent
              <motion.span
                className={`absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r ${isDark ? "from-white/50" : "from-black/50"} to-transparent`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
            <br />
            <span className={isDark ? "text-white/80" : "text-black/80"}>Digital Systems</span>
            <br />
            <span className={isDark ? "text-white/60" : "text-black/60"}>for the Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            Building scalable AI-native platforms and cloud infrastructure that power the next generation of enterprise software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-white text-black rounded-full font-medium flex items-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/5 text-white rounded-full font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              View Our Work
            </motion.button>
          </motion.div>

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
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Objects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative"
        >
          {/* Ambient glow effects behind 3D objects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
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
