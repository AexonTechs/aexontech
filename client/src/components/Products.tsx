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
        className="relative py-32 overflow-hidden transition-colors duration-300 bg-white dark:bg-dark-navy"
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
              className="inline-block px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/20 text-primary-blue dark:text-cyan-blue font-bold text-sm uppercase tracking-wider mb-6"
            >
              OUR PRODUCTS
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-dark-navy dark:text-white leading-tight">
              Products built for
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-cyan-blue"> industry leaders</span>
            </h2>

            <p className="text-lg text-slate-500 dark:text-white/60 max-w-2xl mx-auto font-medium">
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
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-lg flex items-center justify-center p-4"
                    >
                      <Image
                        src={product.logo}
                        alt={`${product.name} Logo`}
                        fill
                        className="object-contain p-2"
                      />
                    </motion.div>

                    <div className="space-y-4">
                      <h3 className="text-4xl md:text-5xl font-black text-dark-navy dark:text-white">
                        {product.name}
                      </h3>
                      <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${product.color}`} />
                    </div>

                    <p className="text-lg leading-relaxed text-slate-500 dark:text-white/70 font-medium">
                      {product.description}
                    </p>

                    <motion.button
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all bg-gradient-to-r from-primary-blue to-cyan-blue text-white shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Explore {product.name}
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>

                  {/* Image Side */}
                  <div className="w-full lg:w-7/12 relative perspective-1000">
                    <motion.div
                      whileHover={{ rotateY: isEven ? -5 : 5, rotateX: 2 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-white/10 transform-gpu transition-transform duration-500 bg-slate-50 dark:bg-white/5"
                    >
                      {/* Gradient overlay for blending */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-20 mix-blend-overlay z-10 group-hover:opacity-10 transition-opacity duration-500`} />

                      <Image
                        src={product.image}
                        alt={`${product.name} Interface`}
                        fill
                        className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                      />

                      {/* Inner shadow */}
                      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] z-20 pointer-events-none" />
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
            className="fixed inset-0 z-[9999] bg-light-bg dark:bg-dark-navy"
          >
            {/* Back button */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-[10000] pointer-events-auto">
              <motion.button
                onClick={() => setExpandedProduct(null)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/10 text-dark-navy dark:text-white hover:bg-slate-50 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 shadow-lg cursor-pointer"
                whileHover={{ x: -4 }}
              >
                <ArrowRight size={20} className="rotate-180" />
                <span className="text-sm font-bold">Back to Products</span>
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
                        <div className="relative w-20 h-20 rounded-3xl p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-md flex-shrink-0 flex items-center justify-center">
                          <Image 
                            src={products[expandedProduct].logo} 
                            alt={products[expandedProduct].name} 
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-dark-navy dark:text-white">
                          {products[expandedProduct].name}
                        </h2>
                      </div>
                      
                      <p className="text-2xl font-bold text-primary-blue dark:text-cyan-blue">
                        {products[expandedProduct].expandedDetails.heroSubtitle}
                      </p>
                      <p className="text-lg leading-relaxed text-slate-600 dark:text-white/70 font-medium">
                        {products[expandedProduct].description}
                      </p>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/10">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-dark-navy dark:text-white">Key Features</h3>
                      <ul className="space-y-6">
                        {products[expandedProduct].expandedDetails.features.map((feature, i) => {
                          const [title, desc] = feature.split('**:');
                          return (
                            <li key={i} className="flex gap-4">
                              <div className="mt-2 w-2.5 h-2.5 rounded-full flex-shrink-0 bg-cyan-blue" />
                              <p className="leading-relaxed text-slate-600 dark:text-white/70 font-medium">
                                <strong className="text-dark-navy dark:text-white font-extrabold">
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
                        className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl bg-gradient-to-r from-primary-blue to-cyan-blue text-white shadow-primary-blue/20 hover:shadow-lg hover:shadow-primary-blue/30 cursor-pointer"
                      >
                        Get Quote
                      </motion.button>
                    </div>
                  </div>

                  {/* Right content (Image) */}
                  <div className="w-full lg:w-1/2">
                    <div className="sticky top-12">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-transparent opacity-20 mix-blend-overlay z-10" />
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
