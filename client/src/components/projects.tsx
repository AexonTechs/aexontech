"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Brain,
  Database,
  Code2,
  Smartphone,
  Trophy,
  Users,
  Smile,
  Briefcase,
  Sparkles,
  Check,
  ArrowRight,
  Gift,
  Star,
  Cpu,
  Monitor,
  Shield,
  FileText,
  Clock,
  Headphones,
  Laptop
} from "lucide-react";

// --- Data Objects strictly matching the Landing Page ---

const stats = [
  { value: "65+", label: "Projects Completed", icon: Briefcase },
  { value: "100+", label: "Students Assisted", icon: Users },
  { value: "4+", label: "Years Experience", icon: Trophy },
  { value: "95%", label: "Student Satisfaction", icon: Smile },
];

const featuredCarousel = [
  { title: "Artificial Intelligence", subtitle: "Smart AI Solutions", tag: "AI" },
  { title: "Machine Learning", subtitle: "Intelligent ML Models", tag: "ML" },
  { title: "Full Stack Development", subtitle: "Modern Web Solutions", tag: "Web" },
];

const coreServices = [
  { title: "Artificial Intelligence", items: ["Chatbots", "NLP Systems", "Computer Vision"], icon: Cpu },
  { title: "Machine Learning", items: ["Prediction Models", "Recommendation", "Classification"], icon: Brain },
  { title: "Data Science", items: ["Analytics Dashboards", "Data Visualization", "Big Data Projects"], icon: Database },
  { title: "Full Stack Development", items: ["E-Commerce", "ERP Systems", "Management Systems"], icon: Code2 },
  { title: "Mobile App Development", items: ["Android Apps", "Flutter Apps", "React Native Apps"], icon: Smartphone },
];

const previousProjects = [
  { title: "AI Attendance System", domain: "AI / VR" },
  { title: "Smart Healthcare Prediction", domain: "Machine Learning" },
  { title: "E-Commerce Platform", domain: "Full Stack" },
  { title: "Student Management System", domain: "Web Development" },
  { title: "Job Recommendation System", domain: "Data Science" },
];

const awardCategories = [
  "AI-Based Smart Systems", "Healthcare Prediction Models", "IoT Automation Projects",
  "Smart Agriculture Solutions", "Cyber Security Projects", "Data Science Research Projects"
];

const testimonials = [
  { name: "B.Tech Student", review: "Aexon Tech helped me complete my final year project before deadline. Excellent support and explanation." },
  { name: "M.Tech Student", review: "Very professional team with great knowledge. They delivered more than my expectations." },
  { name: "MCA Student", review: "Affordable pricing and best quality work, highly recommended!" },
  { name: "BCA Student", review: "They provided full support from start to end. Perfect project delivery!" },
];

const whyChooseUs = [
  { label: "Affordable Pricing", icon: Briefcase },
  { label: "Experienced Developers", icon: Users },
  { label: "Complete Documentation", icon: FileText },
  { label: "PPT Support", icon: Laptop },
  { label: "Project Explanation", icon: Sparkles },
  { label: "On-Time Delivery", icon: Clock },
  { label: "Live Demo Support", icon: Monitor },
  { label: "Post-Delivery Assistance", icon: Headphones },
];

const workflow = [
  { phase: "01", title: "Share Your Idea", desc: "Tell us your project requirements" },
  { phase: "02", title: "Project Discussion", desc: "We discuss and plan the project" },
  { phase: "03", title: "Development Begins", desc: "Our experts start development" },
  { phase: "04", title: "Testing & Review", desc: "Quality testing & your valuable feedback" },
  { phase: "05", title: "Final Delivery", desc: "On-time delivery with complete support" },
];

// --- Animation Presets ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const WHATSAPP_NUMBER = "6361924870";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const DEMO_WHATSAPP_URL = `https://wa.me/916361924870`;

export default function ProjectPage() {
  const [copied, setCopied] = useState(false);

  const openWhatsApp = (url: string = WHATSAPP_URL) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleReferNow = async () => {
    const link = "www.aexontech.com";
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToPreviousProjects = () => {
    const el = document.getElementById("previous-projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0b1329] text-slate-700 dark:text-white/80 font-sans transition-colors duration-300 antialiased">

      {/* ========== HERO SECTION GRID CLONE ========== */}
      <section className="relative pt-12 pb-20 bg-gradient-to-b from-[#eef2ff] to-[#f8fafc] dark:from-[#0f172a] dark:to-[#0b1329] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] dark:text-white leading-tight">
              Build Your Final Year Project with <span className="text-blue-600 dark:text-blue-500">Aexon</span>
            </h1>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Your Idea + Our Support = Success <br />
              <span className="text-blue-600 font-extrabold text-2xl">Let's Build Together</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              We help M.Tech, B.Tech, MCA & BCA students turn their ideas into innovative real-world projects with affordable pricing and on-time delivery.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => openWhatsApp()}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Start Your Project
              </button>
              <button
                onClick={scrollToPreviousProjects}
                className="px-8 py-3.5 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-xl transition-all"
              >
                View Previous Projects
              </button>
            </div>
          </div>
          {/* Find this section in your code and replace it */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Main Image Container */}
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
              <Image
                src="/herosection.png"
                alt="Students working on final year project"
                className="object-cover w-full h-full"
                priority
                fill // Added fill since your container utilizes aspect-[4/3] layouts
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

              {/* Floating text banner positioned cleanly inside the image frame base */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/25 text-sm font-bold text-center text-white">
                Empowering Next-Gen Engineers
              </div>
            </div>

            {/* Floating "AI" Badge Layer */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800 w-24 h-24 z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-black text-lg">
                Ai
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">Tech</span>
            </div>
          </div>
        </div>

        {/* Floating Metrics / Stats Strip */}
        <div className="max-w-5xl mx-auto mt-16 px-6">
          <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-800/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-1 border-r last:border-r-0 border-slate-100 dark:border-slate-800">
                  <div className="flex justify-center text-blue-500 mb-1"><Icon size={24} /></div>
                  <h4 className="text-3xl font-extrabold text-[#0f172a] dark:text-white">{stat.value}</h4>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== TOP FEATURED CAROUSEL PREVIEW ========== */}
      <section className="py-12 bg-white dark:bg-[#0b1329]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {featuredCarousel.map((item, i) => (
            <div key={i} className="relative group rounded-2xl overflow-hidden bg-slate-900 h-48 flex items-end p-6 border border-slate-800 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
              <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-extrabold rounded-md uppercase tracking-widest z-10">{item.tag}</span>
              <div className="relative z-20 space-y-1 text-white">
                <p className="text-xs text-slate-400 font-medium">{item.subtitle}</p>
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <div className="pt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-500">
                  <span>View Projects</span> <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== WHAT WE BUILD (OUR SERVICES GRID) ========== */}
      <section className="py-20 bg-[#f8fafc] dark:bg-[#0f172a]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] dark:text-white">What Projects Do We Build?</h2>
            <p className="text-slate-500 dark:text-white/60 max-w-xl mx-auto font-medium text-sm">
              Professional Academic Projects for M.Tech, B.Tech, MCA & BCA Students
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-base text-[#0f172a] dark:text-white mb-4 min-h-[40px] flex items-center">{service.title}</h3>
                  <ul className="space-y-2 text-xs font-medium text-slate-400">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="truncate">• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== PRICING CARDS ========== */}
      <section className="py-20 bg-white dark:bg-[#0b1329]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Affordable Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0f172a] dark:text-white">Quality Projects at Student-Friendly Prices</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Academic Projects Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 shadow-lg relative flex flex-col justify-between">
              <div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider absolute top-6 right-6">
                  Most Popular
                </span>
                <div className="flex items-center gap-2 mb-4">
                  <Cpu className="text-blue-600" size={20} />
                  <h3 className="text-xl font-extrabold text-[#0f172a] dark:text-white">Academic Projects</h3>
                </div>
                <div className="my-6 flex items-baseline gap-2">
                  <p className="line-through text-slate-400 text-sm">₹10,099</p>
                  <p className="text-4xl font-black text-blue-600 dark:text-blue-400">₹5,999</p>
                </div>
                <ul className="space-y-3.5 mt-6 border-t border-slate-50 dark:border-slate-800/80 pt-6">
                  {["Project Explanation", "Documentation", "Deployment Support", "Project Training"].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                      <Check size={14} className="text-teal-500" strokeWidth={3} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center font-bold text-slate-600 dark:text-slate-400 text-xs border border-slate-100 dark:border-slate-800">
                  PPT + Project Report : <span className="text-blue-600 font-extrabold">₹1,199</span>
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md shadow-blue-600/10">Choose Plan</button>
              </div>
            </div>

            {/* Mobile App Projects Card */}
            <div className="rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="text-rose-500" size={20} />
                  <h3 className="text-xl font-extrabold text-[#0f172a] dark:text-white">Mobile App Projects</h3>
                </div>
                <div className="my-6 flex items-baseline gap-2">
                  <p className="line-through text-slate-400 text-sm">₹8,999</p>
                  <p className="text-4xl font-black text-rose-500">₹6,999</p>
                </div>
                <ul className="space-y-3.5 mt-6 border-t border-slate-50 dark:border-slate-800/80 pt-6">
                  {["Android App", "Source Code", "Deployment Guidance"].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                      <Check size={14} className="text-rose-500" strokeWidth={3} />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-center font-bold text-slate-600 dark:text-slate-400 text-xs border border-slate-100 dark:border-slate-800">
                  PPT + Project Report : <span className="text-rose-500 font-extrabold">₹1,199</span>
                </div>
                <button className="w-full mt-4 border-2 border-rose-500/20 dark:border-rose-500/40 hover:bg-rose-500/5 text-rose-500 py-3.5 rounded-xl font-bold text-sm transition">Choose Plan</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PREVIOUS PROJECTS SHOWCASE ========== */}
      <section id="previous-projects" className="py-20 bg-[#f8fafc] dark:bg-[#0f172a]/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">View Our Previous Projects</span>
            <h2 className="text-3xl font-black text-[#0f172a] dark:text-white">Previous Projects Showcase</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {previousProjects.map((project, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
                <div className="h-28 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800/50 flex items-center justify-center text-3xl">
                  📁
                </div>
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-blue-50 dark:bg-blue-900/40 text-[10px] font-extrabold text-blue-600 rounded">
                      {project.domain}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#0f172a] dark:text-white leading-snug mt-1.5">{project.title}</h3>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => openWhatsApp(DEMO_WHATSAPP_URL)}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 py-1.5 rounded-lg text-xs font-bold transition"
                    >
                      Demo
                    </button>
                    <button className="flex-1 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-1.5 rounded-lg text-xs font-bold transition">Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== REFERRAL HERO BANNER STRIP ========== */}
      <section className="py-12 bg-white dark:bg-[#0b1329]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-black">Refer a Friend & Earn Money</h2>
              <p className="text-xs md:text-sm text-white/80 font-medium">
                Refer students who need projects and earn up to <span className="text-yellow-300 font-extrabold text-base">₹1,000</span> for every successful project.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-extrabold tracking-wide uppercase opacity-90">
                <span>• Unlimited Referrals</span>
                <span>• Instant Rewards</span>
                <span>• Student-Friendly Program</span>
              </div>
            </div>
            <div className="relative z-10">
              <button
                onClick={handleReferNow}
                className="bg-white text-blue-700 font-black px-6 py-3 rounded-xl hover:bg-slate-50 transition text-sm whitespace-nowrap shadow-md"
              >
                {copied ? "✅ Link Copied!" : "Refer Now →"}
              </button>
              {copied && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg whitespace-nowrap animate-fade-in">
                  🔗 www.aexontech.com copied — share with friends!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== GRID SPLIT: CATEGORIES & REVIEWS ========== */}
      <section className="py-20 bg-[#f8fafc] dark:bg-[#0f172a]/20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">

          {/* Award Categories Grid Array */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Top Fields</span>
              <h3 className="text-2xl font-black text-[#0f172a] dark:text-white">Award-Winning Project Categories</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {awardCategories.map((item, i) => (
                <div key={i} className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl shadow-sm flex items-center justify-center text-center">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Authentic Reviews */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Feedback</span>
              <h3 className="text-2xl font-black text-[#0f172a] dark:text-white">What Students Say</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="space-y-2">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">"{item.review}"</p>
                  </div>
                  <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400">— {item.name}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========== WHY CHOOSE US LIST ========== */}
      <section className="py-20 bg-white dark:bg-[#0b1329]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Why Choose Aexon Tech?</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-4 bg-[#f8fafc] dark:bg-slate-900/60 rounded-xl border border-slate-50 dark:border-slate-800 text-center flex flex-col items-center space-y-2">
                  <div className="text-blue-600"><Icon size={20} /></div>
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{item.label}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== WORKFLOW TIMELINE PROCESS ========== */}
      <section className="py-20 bg-[#f8fafc] dark:bg-[#0f172a]/40 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Our Working Process</span>
            <h2 className="text-3xl font-black text-[#0f172a] dark:text-white">How It Works</h2>
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            {workflow.map((step, i) => (
              <div key={i} className="relative text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  {step.phase}
                </div>
                <h3 className="font-extrabold text-base text-[#0f172a] dark:text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 font-medium max-w-[180px] mx-auto leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL FOOTER CALL TO ACTION ========== */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-black">Ready to Build Your Final Year Project?</h2>
          <p className="text-sm opacity-90 font-medium">Get professional guidance and project development support from Aexon Tech.</p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3 bg-white text-blue-600 font-black text-sm rounded-xl shadow-lg hover:bg-slate-50 transition"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => openWhatsApp()}
              className="px-6 py-3 border border-white/40 hover:bg-white/10 text-white font-black text-sm rounded-xl transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}