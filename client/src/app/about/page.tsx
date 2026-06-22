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
            <div className={`inline-block px-4 py-2 rounded-full border mb-6 ${
              isDark 
                ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20 text-[#00B4FF]' 
                : 'bg-[#E6ECF5] border-[#0A3DFF]/20 text-[#072B88]'
            } font-semibold`}>
              <span className="text-xs uppercase tracking-wider">
                WHO WE ARE
              </span>
            </div>
            <h1 className={`text-5xl lg:text-7xl font-bold mb-8 leading-tight ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
              Engineering the <br />
              <span className={isDark ? 'text-[#00B4FF]' : 'text-[#1A56F0]'}>AI-Native Future</span>
            </h1>
            <p className={`text-xl leading-relaxed mb-8 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
              Aexon is a premier engineering partner for ambitious companies. We specialize in building intelligent digital systems that don't just exist, but evolve.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20' : 'bg-white border-[#E6ECF5] shadow-sm'}`}>
                <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'}`}>99.9%</h3>
                <p className={`text-sm ${isDark ? 'text-[#E6ECF5]/70' : 'text-[#5B6B82]'}`}>System Reliability</p>
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20' : 'bg-white border-[#E6ECF5] shadow-sm'}`}>
                <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'}`}>10+</h3>
                <p className={`text-sm ${isDark ? 'text-[#E6ECF5]/70' : 'text-[#5B6B82]'}`}>AI Specializations</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl"
          >
            <Image
              src="/digital-transformation.png"
              alt="Aexon Engineering"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#072B88]/60 to-transparent" />
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
      className={`p-10 rounded-3xl border hover:-translate-y-1 transition-all duration-300 group ${
        isDark 
          ? 'bg-[#0A3DFF]/5 border-[#00B4FF]/10 hover:border-[#00D4B8] hover:bg-[#0A3DFF]/10' 
          : 'bg-white border-[#E6ECF5] shadow-sm hover:border-[#00D4B8] hover:shadow-md'
      }`}
    >
      <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>{title}</h3>
      <p className={`leading-relaxed mb-6 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>{description}</p>
      <div className="inline-flex items-center gap-2 cursor-pointer">
        <span className={`text-sm font-semibold group-hover:text-[#00B4FF] transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#0A3DFF]'}`}>Read more</span>
        <ArrowRight size={16} className={`group-hover:translate-x-1 group-hover:text-[#00B4FF] transition-all duration-300 ${isDark ? 'text-white' : 'text-[#0A3DFF]'}`} />
      </div>
    </motion.div>
  );
}
