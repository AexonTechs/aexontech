"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

import { Brain, Cloud, Shield, Zap } from "lucide-react";

const features = [
  { 
    title: "AI-Native Engineering", 
    desc: "Integrating intelligence at the core of every architectural decision.",
    icon: Brain
  },
  { 
    title: "Cloud-First Scaling", 
    desc: "Elastic infrastructures built to handle tomorrow's peak loads.",
    icon: Cloud
  },
  { 
    title: "Ironclad Security", 
    desc: "Zero-trust protocols ensuring data integrity and system resilience.",
    icon: Shield
  },
  { 
    title: "Agile Development", 
    desc: "Rapid deployment cycles without compromising on code quality.",
    icon: Zap
  },
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      id="about" 
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#050505" : "#ffffff" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="text-sm text-gray-300">About Aexon</span>
            </motion.div>

            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Elite Engineering
              <br />
              <span className="text-white/60">Meets Innovation</span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Aexon is a next-generation software engineering firm specializing in AI-native platforms, cloud infrastructure, and enterprise-scale digital systems.
              </p>
              <p>
                We partner with forward-thinking organizations to architect, build, and scale intelligent software that defines the future of their industries.
              </p>
              <p>
                Our team of elite engineers combines deep technical expertise with a relentless focus on innovation, delivering systems that are not just functional, but transformative.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
              >
                Our Process
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/5 text-white rounded-full font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Case Studies
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl border transition-all backdrop-blur-sm ${
                    isDark 
                      ? 'bg-white/[0.03] border-white/10 hover:border-white/20' 
                      : 'bg-black/[0.02] border-black/5 hover:border-black/10'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isDark ? 'bg-white/5 text-white' : 'bg-black/5 text-black'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
