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
  { value: "65+", emoji: "📋", label: "Projects Completed", icon: Briefcase, colorClass: "text-blue-700", bgClass: "bg-blue-50/50 border-blue-100/40" },
  { value: "100+", emoji: "👥", label: "Students Assisted", icon: Users, colorClass: "text-purple-600", bgClass: "bg-purple-50/50 border-purple-100/40" },
  { value: "4+", emoji: "🏅", label: "Years Experience", icon: Trophy, colorClass: "text-amber-500", bgClass: "bg-amber-50/40 border-amber-100/40" },
  { value: "95%", emoji: "😊", label: "Student Satisfaction", icon: Smile, colorClass: "text-sky-500", bgClass: "bg-sky-50/50 border-sky-100/40" },
];


  

const featuredCarousel = [
  { title: "Artificial Intelligence", subtitle: "Smart AI Solutions", tag: "AI",image: "/robot.png" },
 
  { title: "Machine Learning", subtitle: "Intelligent ML Models", tag: "ML", image: "/brain.png" },
  { title: "Full Stack Development", subtitle: "Modern Web Solutions", tag: "Web", image: "/fullstack.png" },
];

const coreServices = [
  { title: "Artificial Intelligence", items: ["Chatbots", "NLP Systems", "Computer Vision"], icon: Cpu , color: "bg-blue-600"},
  { title: "Machine Learning", items: ["Prediction Models", "Recommendation", "Classification"], icon: Brain,color: "bg-purple-600"}, 
  { title: "Data Science", items: ["Analytics Dashboards", "Data Visualization", "Big Data Projects"], icon: Database,color: "bg-green-500" },
  { title: "Full Stack Development", items: ["E-Commerce", "ERP Systems", "Management Systems"], icon: Code2,color: "bg-yellow-500"},
  { title: "Mobile App Development", items: ["Android Apps", "Flutter Apps", "React Native Apps"], icon: Smartphone,color: "bg-pink-500" },
];

const previousProjects = [
  { title: "AI Attendance System", domain: "AI / VR",image: "/attendance.png",color: "bg-pink-100 text-pink-600" },
  { title: "Smart Healthcare Prediction", domain: "Machine Learning",image: "/health.png",color: "bg-purple-100 text-purple-600" },
  { title: "E-Commerce Platform", domain: "Full Stack",image: "/ecomm.png",color: "bg-green-100 text-green-600" },
  { title: "Student Management System", domain: "Web Development" , image: "/student.png",color: "bg-blue-100 text-blue-600"},
  { title: "Job Recommendation System", domain: "Data Science" , image: "/job.png",color: "bg-green-100 text-green-600"},
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
      <section className="py-20 bg-white dark:bg-[#0b1329]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {featuredCarousel.map((item, i) => (
           <div
              key={i}
              className="relative group rounded-3xl overflow-hidden h-72 shadow-xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <span className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {item.tag}
              </span>

              <div className="absolute bottom-6 left-6 z-10 text-white">
                <p className="text-sm opacity-90">{item.subtitle}</p>

                <h3 className="text-2xl font-bold mt-1">
                  {item.title}
                </h3>

                <button className="mt-4 bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-50 transition">
                  View Projects →
                </button>
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
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 text-center p-8"
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-5">
                        <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center shadow-lg`}>
                          <Icon size={28} className="text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-5">
                        {service.title}
                      </h3>

                      {/* Items */}
                      <ul className="space-y-2">
                        {service.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-gray-500 text-sm"
                          >
                            {item}
                          </li>
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

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

              {/* Academic Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#DDE7FF] bg-gradient-to-br from-[#F7FAFF] via-[#FCFDFF] to-[#EEF4FF]">

                {/* Most Popular */}
                <div className="absolute top-4 right-0 bg-[#3457F6] text-white text-xs font-semibold px-5 py-2 rounded-l-full">
                  Most Popular
                </div>

                <div className="p-6">

                  <div className="flex items-center gap-3">
                    <Cpu className="text-[#14255D]" size={22} />
                    <h3 className="text-2xl font-bold text-[#16204A]">
                      Academic Projects
                    </h3>
                  </div>

                  <div className="mt-6 flex items-end gap-3">
                    <span className="line-through text-[#B7A8B8] text-3xl font-semibold">
                      ₹10,099
                    </span>

                    <span className="text-6xl font-extrabold text-[#14193D]">
                      ₹5,999
                    </span>
                  </div>

                  <div className="mt-7 space-y-4">

                    {[
                      "Project Explanation",
                      "Documentation",
                      "Deployment Support",
                      "Project Training",
                    ].map((item) => (

                      <div key={item} className="flex items-center gap-3">

                        <Check
                          size={18}
                          strokeWidth={3}
                          className="text-[#7B8DFF]"
                        />

                        <span className="text-[17px] text-[#3B3B3B]">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                <div className="border-t border-[#DDE7FF] bg-[#F5F8FF] px-6 py-4 flex justify-between items-center">

                  <span className="font-semibold text-[#1F1F1F]">
                    PPT + Project Report
                  </span>

                  <span className="font-bold text-2xl">
                    ₹1,199
                  </span>

                </div>

              </div>



              {/* Mobile App Card */}

              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-[#FFD6DD] bg-gradient-to-br from-[#FFF3F5] via-[#FFF7F8] to-[#FFECEF]">

                <div className="p-6">

                  <div className="flex items-center gap-3">

                    <Smartphone
                      className="text-[#A3132F]"
                      size={22}
                    />

                    <h3 className="text-2xl font-bold text-[#8E2439]">
                      Mobile App Projects
                    </h3>

                  </div>

                  <div className="mt-6 flex items-end gap-3">

                    <span className="line-through text-[#D9A7AF] text-3xl font-semibold">
                      ₹8,999
                    </span>

                    <span className="text-6xl font-extrabold text-[#C2183A]">
                      ₹6,999
                    </span>

                  </div>

                  <div className="mt-7 space-y-4">

                    {[
                      "Android App",
                      "Source Code",
                      "Deployment Guidance",
                    ].map((item) => (

                      <div key={item} className="flex items-center gap-3">

                        <Check
                          size={18}
                          strokeWidth={3}
                          className="text-[#F06077]"
                        />

                        <span className="text-[17px] text-[#444]">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                <div className="border-t border-[#FFD6DD] bg-[#FFF3F5] px-6 py-4 flex justify-between items-center">

                  <span className="font-semibold text-[#1F1F1F]">
                    PPT + Project Report
                  </span>

                  <span className="font-bold text-2xl">
                    ₹1,199
                  </span>

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
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${project.color}`}
                        >
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
          <div className="bg-gradient-to-r from-[#2854FF] via-[#4A3BFF] to-[#7A18FF] rounded-3xl px-8 py-7 text-white shadow-xl flex items-center justify-between overflow-hidden">
          
           
           <div className="grid grid-cols-12 items-center w-full gap-6">

  {/* Cartoon Image */}
  <div className="col-span-2 flex justify-center">
    <Image
      src="/cartoon.png"
      alt="Refer"
      width={300}
      height={300}
      className="object-contain"
    />
  </div>

  {/* Heading */}
  <div className="col-span-4">
    <h2 className="text-2xl font-bold whitespace-nowrap">
      Refer a Friend & Earn Money
    </h2>

    <p className="mt-2 text-white/90 text-lg">
      Refer students who need projects and earn up to
      <span className="text-yellow-300 font-bold">
        {" "}₹1,000{" "}
      </span>
      for every successful project.
    </p>
  </div>

  {/* Three Icons */}
  <div className="col-span-4 flex justify-evenly">

    <div className="text-center">
      <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center mx-auto text-2xl">
        👥
      </div>

      <p className="mt-3 text-sm font-semibold">
        Unlimited<br />Referrals
      </p>
    </div>

    <div className="text-center">
      <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center mx-auto text-2xl">
        🎁
      </div>

      <p className="mt-3 text-sm font-semibold">
        Instant<br />Rewards
      </p>
    </div>

    <div className="text-center">
      <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center mx-auto text-2xl">
        🏆
      </div>

      <p className="mt-3 text-sm font-semibold">
        Student-Friendly<br />Program
      </p>
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