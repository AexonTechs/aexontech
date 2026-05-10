"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "bconnect",
    name: "BConnect",
    description: "Modern B2B ecommerce platform with seamless Tally integration that simplifies ordering, payment collection, inventory management, and distributor workflows for enterprises and wholesalers.",
    logo: "/products/BConnect-logo.png",
    image: "/products/BConnect-details.png",
    color: "from-blue-600/20 to-cyan-500/10",
    accent: "text-blue-500",
    expandedDetails: {
      heroSubtitle: "Enterprise B2B Commerce Platform",
      features: [
        "**Seamless Tally Integration**: Bi-directional sync of inventory, pricing, and orders with Tally ERP 9 and Prime.",
        "**Automated Payment Collection**: Integrated payment gateways to streamline outstanding collections and auto-reconciliation.",
        "**Distributor Workflows**: Custom workflows for sales teams, distributors, and retailers with role-based access control.",
        "**Real-time Inventory Management**: Prevent stockouts and overselling with real-time inventory visibility across multiple warehouses."
      ]
    }
  },
  {
    id: "cashew-track",
    name: "Cashew Track",
    description: "Smart cashew factory workflow management system that enables real-time production tracking, batch monitoring, quality control, and analytics for efficient factory operations.",
    logo: "/products/Cashew-track-logo.png",
    image: "/products/Cashew-track-details.png",
    color: "from-amber-600/20 to-orange-500/10",
    accent: "text-amber-500",
    expandedDetails: {
      heroSubtitle: "Intelligent Factory Management",
      features: [
        "**End-to-end Batch Tracking**: Trace every batch from raw material procurement to final packaging.",
        "**Quality Control Modules**: Standardize grading and quality checks at every stage of cashew processing.",
        "**Yield Optimization**: Advanced analytics to monitor processing yields and identify efficiency bottlenecks.",
        "**Worker Productivity Tracking**: Track individual and team output to optimize labor deployment."
      ]
    }
  },
  {
    id: "petromax",
    name: "Petromax",
    description: "Application for petrol bunk owners to attract customers by tracking their spendings and offering targeted rewards and discounts based on their loyalty.",
    logo: "/products/Petromax-logo.png",
    image: "/products/Petromax-Detailes.png",
    color: "from-emerald-600/20 to-green-500/10",
    accent: "text-emerald-500",
    expandedDetails: {
      heroSubtitle: "Fuel Station Loyalty & Analytics",
      features: [
        "**Customer Loyalty Programs**: Build custom reward structures based on volume or visit frequency.",
        "**Targeted Marketing Campaigns**: Send automated SMS and push notifications to re-engage dormant customers.",
        "**Spending Analytics**: Get deep insights into customer demographics, peak hours, and purchasing patterns.",
        "**Digital Wallet Integration**: Enable frictionless payments and instant point redemption at the pump."
      ]
    }
  }
];

export default function Products() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (expandedProduct !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedProduct]);

  return (
    <>
      <section
        id="products"
        className="relative py-32 overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: isDark ? "#0A0A0A" : "#f8f8f8" }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24 md:text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-white/5 border border-black/10 dark:border-white/10 mb-6"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">OUR PRODUCTS</span>
            </motion.div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDark ? "text-white" : "text-black"}`}>
              Products built for
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-300 dark:to-gray-500"> industry leaders</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our suite of specialized digital products engineered to solve complex operational challenges and accelerate enterprise growth.
            </p>
          </motion.div>

          {/* Products List */}
          <div className="space-y-32">
            {products.map((product, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group cursor-pointer`}
                  onClick={() => setExpandedProduct(index)}
                >
                  {/* Content Side */}
                  <div className="w-full lg:w-5/12 space-y-8">
                    {/* Logo */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl flex items-center justify-center p-4`}
                    >
                      <Image
                        src={product.logo}
                        alt={`${product.name} Logo`}
                        fill
                        className="object-contain p-2"
                      />
                    </motion.div>

                    <div className="space-y-4">
                      <h3 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        {product.name}
                      </h3>
                      <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${product.color}`} />
                    </div>

                    <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.description}
                    </p>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-colors ${isDark
                          ? 'bg-white/10 text-white group-hover:bg-white/20 border border-white/10'
                          : 'bg-black/5 text-black group-hover:bg-black/10 border border-black/5'
                        }`}
                    >
                      Explore {product.name}
                      <ArrowRight size={18} className={product.accent} />
                    </motion.button>
                  </div>

                  {/* Image Side */}
                  <div className="w-full lg:w-7/12 relative perspective-1000">
                    <motion.div
                      whileHover={{ rotateY: isEven ? -5 : 5, rotateX: 2 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`relative w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 transform-gpu transition-transform duration-500`}
                    >
                      {/* Gradient overlay for blending */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-40 mix-blend-overlay z-10 group-hover:opacity-20 transition-opacity duration-500`} />

                      <Image
                        src={product.image}
                        alt={`${product.name} Interface`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Inner shadow */}
                      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded Modal */}
      <AnimatePresence>
        {expandedProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999]"
            style={{ 
              backgroundColor: isDark ? '#050505' : '#ffffff'
            }}
          >
            {/* Back button */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-[10000] pointer-events-auto">
              <motion.button
                onClick={() => setExpandedProduct(null)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md transition-colors shadow-lg border ${
                  isDark 
                    ? 'bg-white/10 text-white hover:bg-white/20 border-white/10' 
                    : 'bg-white/90 text-black hover:bg-white border-black/10'
                }`}
                whileHover={{ x: -4 }}
              >
                <ArrowRight size={20} className="rotate-180" />
                <span className="text-sm font-semibold">Back to Products</span>
              </motion.button>
            </div>

            {/* Scrolling Container */}
            <div className="absolute inset-0 overflow-y-auto h-full w-full" data-lenis-prevent>
              <div className="min-h-screen pt-32 px-8 lg:px-16 pb-20" onClick={() => setExpandedProduct(null)}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Left content */}
                  <div className="w-full lg:w-1/2 space-y-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className={`relative w-20 h-20 rounded-2xl p-3 bg-white dark:bg-white/5 border ${isDark ? 'border-white/10' : 'border-black/5'} shadow-lg flex-shrink-0`}>
                          <Image 
                            src={products[expandedProduct].logo} 
                            alt={products[expandedProduct].name} 
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <h2 className={`text-4xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                          {products[expandedProduct].name}
                        </h2>
                      </div>
                      
                      <p className={`text-2xl font-medium ${products[expandedProduct].accent}`}>
                        {products[expandedProduct].expandedDetails.heroSubtitle}
                      </p>
                      <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {products[expandedProduct].description}
                      </p>
                    </div>

                    <div className={`space-y-6 pt-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                      <h3 className={`text-xl font-bold uppercase tracking-wider text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Key Features</h3>
                      <ul className="space-y-6">
                        {products[expandedProduct].expandedDetails.features.map((feature, i) => {
                          const [title, desc] = feature.split('**:');
                          return (
                            <li key={i} className="flex gap-4">
                              <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-gradient-to-r ${products[expandedProduct].color}`} />
                              <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <strong className={isDark ? 'text-white font-semibold' : 'text-black font-semibold'}>
                                  {title.replace('**', '')}:
                                </strong>
                                {desc}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="pt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full sm:w-auto px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl ${
                          isDark 
                            ? 'bg-white text-black hover:bg-gray-200 shadow-white/10' 
                            : 'bg-black text-white hover:bg-gray-800 shadow-black/10'
                        }`}
                      >
                        Get Quote
                      </motion.button>
                    </div>
                  </div>

                  {/* Right content (Image) */}
                  <div className="w-full lg:w-1/2">
                    <div className="sticky top-12">
                      <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${products[expandedProduct].color} opacity-20 mix-blend-overlay z-10`} />
                        <Image
                          src={products[expandedProduct].image}
                          alt={`${products[expandedProduct].name} Interface`}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
