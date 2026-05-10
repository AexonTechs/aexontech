"use client";

import SharedPageLayout from "@/components/SharedPageLayout";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SharedPageLayout>
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                WHO WE ARE
              </span>
            </div>
            <h1 className={`text-5xl lg:text-7xl font-bold mb-8 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Engineering the <br />
              <span className={isDark ? 'text-white/60' : 'text-black/60'}>AI-Native Future</span>
            </h1>
            <p className={`text-xl leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Aexon is a premier engineering partner for ambitious companies. We specialize in building intelligent digital systems that don't just exist, but evolve.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>99.9%</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>System Reliability</p>
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>10+</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>AI Specializations</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/digital-transformation.png"
              alt="Aexon Engineering"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard 
            title="Excellence" 
            description="We don't settle for 'good enough'. We engineer for performance, scale, and resilience."
            isDark={isDark}
            delay={0.1}
          />
          <ValueCard 
            title="Innovation" 
            description="We stay ahead of the curve, integrating the latest in LLMs and cloud-native patterns."
            isDark={isDark}
            delay={0.2}
          />
          <ValueCard 
            title="Integrity" 
            description="Security and compliance are never afterthoughts. They are built into every layer."
            isDark={isDark}
            delay={0.3}
          />
        </div>
      </div>
    </SharedPageLayout>
  );
}

function ValueCard({ title, description, isDark, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`p-10 rounded-3xl border ${
        isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]' : 'bg-black/[0.03] border-black/10 hover:bg-white'
      } transition-all group`}
    >
      <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
      <p className={`leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-2 cursor-pointer">
        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>Read more</span>
        <ArrowRight size={16} className={isDark ? 'text-white' : 'text-black'} />
      </motion.div>
    </motion.div>
  );
}
