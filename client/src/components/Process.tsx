"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Search, Server, Cpu, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discovery & Architecture",
    description: "We begin by deeply understanding your business objectives. Our architects design a resilient, cloud-native foundation tailored for AI integration and future scalability.",
    icon: Search,
    details: ["Requirements gathering", "System architecture design", "Tech stack selection", "Feasibility analysis"]
  },
  {
    id: 2,
    title: "Data & Infrastructure Setup",
    description: "Before writing application code, we establish robust data pipelines, cloud infrastructure (AWS/GCP/Azure), and stringent security protocols to protect your assets.",
    icon: Server,
    details: ["Infrastructure as Code (IaC)", "Database provisioning", "Security & compliance setup", "CI/CD pipeline creation"]
  },
  {
    id: 3,
    title: "Model Integration & Development",
    description: "Our engineers build the core product while seamlessly integrating advanced LLMs and machine learning models, ensuring they operate efficiently within your application.",
    icon: Cpu,
    details: ["Frontend & backend development", "LLM integration (OpenAI, Anthropic)", "Vector database setup", "API development"]
  },
  {
    id: 4,
    title: "Testing & Refinement",
    description: "Rigorous testing is non-negotiable. We conduct extensive load testing, security audits, and model fine-tuning to ensure hallucination-free, highly accurate outputs.",
    icon: CheckCircle,
    details: ["Automated testing", "Security penetration testing", "Model evaluation", "Performance profiling"]
  },
  {
    id: 5,
    title: "Deployment & Scaling",
    description: "We execute a flawless production rollout. Post-launch, our MLOps and DevOps teams continuously monitor, maintain, and automatically scale your systems.",
    icon: Rocket,
    details: ["Zero-downtime deployment", "Real-time monitoring (Grafana/Datadog)", "Auto-scaling configuration", "Continuous learning loops"]
  }
];

export default function Process() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section 
      id="process" 
      className="relative py-32 transition-colors duration-300 bg-white dark:bg-dark-navy"
    >
      {/* Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 bg-primary-blue/10 dark:bg-cyan-blue/5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Sticky Title & Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/20 text-primary-blue dark:text-cyan-blue font-bold text-sm uppercase tracking-wider mb-6">
                HOW WE WORK
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight text-dark-navy dark:text-white">
                Our Proven <br className="hidden lg:block"/> Methodology
              </h2>
              
              <p className="text-lg text-slate-500 dark:text-white/60 max-w-md font-medium">
                We follow a rigorous, engineering-first approach to transform ambitious ideas into production-ready, scalable AI systems. Scroll to see our step-by-step process.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Scrolling Steps */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Line indicator */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] hidden md:block bg-slate-100 dark:bg-white/10" />

            <div className="space-y-24 pb-32">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.3, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: "-20% 0px -20% 0px", amount: "some" }}
                    transition={{ duration: 0.5 }}
                    className="relative pl-0 md:pl-24 group"
                  >
                    {/* Step Number Circle (Absolute positioned on the line) */}
                    <div className="hidden md:flex absolute left-[15px] top-0 w-10 h-10 rounded-full items-center justify-center border-4 border-slate-200 dark:border-white/15 bg-white dark:bg-dark-navy text-slate-400 dark:text-white/50 group-hover:border-cyan-blue group-hover:text-primary-blue dark:group-hover:text-cyan-blue z-10 transition-all duration-500">
                      <span className="text-sm font-bold">{step.id}</span>
                    </div>

                    <div className="p-8 lg:p-10 rounded-3xl border border-slate-100 dark:border-white/10 bg-light-bg/40 dark:bg-white/5 hover:border-teal-green/50 dark:hover:border-teal-green/50 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl transition-all duration-500 cursor-pointer">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary-blue/5 dark:bg-white/10 text-primary-blue dark:text-cyan-blue group-hover:bg-gradient-to-br group-hover:from-primary-blue group-hover:to-cyan-blue group-hover:text-white transition-all duration-300 shadow-sm">
                          <IconComponent size={24} />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-dark-navy dark:text-white group-hover:text-primary-blue dark:group-hover:text-cyan-blue transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className="text-base text-slate-500 dark:text-white/60 mb-8 leading-relaxed font-medium">
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-blue animate-pulse" />
                            <span className="text-sm font-bold text-slate-600 dark:text-white/70">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
