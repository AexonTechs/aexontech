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
      className="relative py-32 overflow-hidden transition-colors duration-300 bg-white dark:bg-dark-navy"
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 bg-[size:60px_60px] opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #0A3DFF 1px, transparent 1px), linear-gradient(to bottom, #0A3DFF 1px, transparent 1px)"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section 1: About Aexon */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full border border-primary-blue/20 bg-primary-blue/5 text-primary-blue dark:text-cyan-blue font-bold text-sm uppercase tracking-wider"
            >
              About Aexon
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-dark-navy dark:text-white">
              Elite Engineering
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-cyan-blue font-extrabold">
                Meets AI-Native Innovation
              </span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-white/70 font-medium">
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
              className="pt-4 flex flex-wrap gap-4"
            >
              <motion.a
                href="#process"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full font-bold bg-gradient-to-r from-primary-blue to-cyan-blue text-white shadow-lg shadow-primary-blue/20 cursor-pointer"
              >
                Our Process
              </motion.a>
              
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full font-bold border-2 border-primary-blue text-primary-blue dark:border-white/20 dark:text-white hover:bg-primary-blue/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Case Studies
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Technical Panel Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-8 rounded-3xl border border-surface-bg bg-light-bg/50 dark:bg-white/5 dark:border-white/10 shadow-2xl backdrop-blur-md overflow-hidden group">
              {/* Decorative radial gradient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-blue/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-green/15 rounded-full blur-3xl" />
              
              <div className="space-y-6 font-mono text-xs text-slate-600 dark:text-white/70 relative z-10">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
                  <span className="text-dark-navy dark:text-white font-extrabold tracking-wider">AEXON CORE STACK ENGINE</span>
                  <span className="text-teal-green font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-green animate-ping" />
                    OPERATIONAL
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
                    <span className="text-slate-400 dark:text-white/40 block mb-1">RAG Latency</span>
                    <span className="text-2xl font-black text-primary-blue dark:text-cyan-blue">24ms</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
                    <span className="text-slate-400 dark:text-white/40 block mb-1">Uptime Rate</span>
                    <span className="text-2xl font-black text-teal-green">99.99%</span>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm space-y-3">
                  <div className="flex justify-between font-bold">
                    <span>Deploy pipeline status</span>
                    <span className="text-primary-blue dark:text-cyan-blue">PRODUCTION READINESS</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-blue to-teal-green h-full w-[94%]" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
                  <span className="text-slate-400 dark:text-white/40 block mb-1">RAG Inference Capacity</span>
                  <span className="text-sm font-bold text-dark-navy dark:text-white">82,000 tokens / sec</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: Why Choose Us (4-column grid layout) */}
        <div className="pt-16 border-t border-slate-100 dark:border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 rounded-full border border-teal-green/20 bg-teal-green/5 text-teal-green font-bold text-sm uppercase tracking-wider mb-4">
              Why Choose Us
            </div>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-dark-navy dark:text-white">
              Engineered for Enterprise Excellence
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="p-8 rounded-3xl border border-slate-100 bg-light-bg/40 dark:bg-white/5 dark:border-white/10 hover:border-teal-green/50 dark:hover:border-teal-green/50 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-primary-blue/5 text-primary-blue dark:bg-white/10 dark:text-cyan-blue group-hover:bg-gradient-to-br group-hover:from-primary-blue group-hover:to-cyan-blue group-hover:text-white transition-all duration-300">
                    <Icon size={26} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-dark-navy dark:text-white group-hover:text-primary-blue dark:group-hover:text-cyan-blue transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-white/60 font-medium">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}