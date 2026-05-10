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
      className="relative py-32 transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#050505" : "#ffffff" }}
    >
      {/* Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${
          isDark ? 'bg-blue-600/30' : 'bg-blue-300/40'
        }`} />
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
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  HOW WE WORK
                </span>
              </div>
              
              <h2 className={`text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isDark ? "text-white" : "text-black"}`}>
                Our Proven <br className="hidden lg:block"/> Methodology
              </h2>
              
              <p className={`text-lg max-w-md ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                We follow a rigorous, engineering-first approach to transform ambitious ideas into production-ready, scalable AI systems. Scroll to see our step-by-step process.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Scrolling Steps */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Line indicator */}
            <div className={`absolute left-8 top-0 bottom-0 w-[2px] hidden md:block ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`} />

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
                    className="relative pl-0 md:pl-24"
                  >
                    {/* Step Number Circle (Absolute positioned on the line) */}
                    <div className={`hidden md:flex absolute left-[15px] top-0 w-10 h-10 rounded-full items-center justify-center border-4 z-10 transition-colors duration-500 ${
                      isDark 
                        ? 'bg-[#050505] border-gray-800 text-gray-500 group-hover:border-white group-hover:text-white' 
                        : 'bg-white border-gray-200 text-gray-400 group-hover:border-black group-hover:text-black'
                    }`}>
                      <span className="text-sm font-bold">{step.id}</span>
                    </div>

                    <div className={`p-8 lg:p-10 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
                      isDark 
                        ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20' 
                        : 'bg-black/[0.02] border-black/10 hover:bg-white hover:shadow-xl hover:border-transparent'
                    }`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
                        }`}>
                          <IconComponent size={24} />
                        </div>
                        <h3 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                          {step.title}
                        </h3>
                      </div>
                      
                      <p className={`text-lg mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
