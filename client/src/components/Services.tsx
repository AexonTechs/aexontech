"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Brain, Layers, Activity, RefreshCw, Database, Shield, ArrowRight, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import { useState, useEffect } from "react";

const services = [
  {
    icon: Cloud,
    title: "Cloud-Native Architecture",
    description: "Designing resilient, secure, and cost-efficient cloud systems that scale with your business.",
    image: "/cloud-native.png",
    size: "large",
    details: {
      category: "INFRASTRUCTURE",
      heroTitle: "Cloud-Native Architecture",
      heroSubtitle: "Building for Scale and Resilience",
      heroDescription: "Transform your infrastructure with modern cloud-native solutions that deliver unmatched scalability, reliability, and cost efficiency.",
      mainContent: [
        "Building cloud-native architecture means more than just migrating to the cloud. It requires a fundamental shift in how infrastructure is designed, deployed, and managed across the entire organization.",
        "A cloud-native strategy involves containerization and orchestration with Kubernetes, microservices architecture for independent scaling, infrastructure as code for reproducible deployments, and multi-cloud strategies for vendor independence and resilience.",
        "In the next decade, the gap between cloud-native and traditional infrastructure will widen, with cloud-native organizations achieving unprecedented levels of agility and cost optimization."
      ],
      strategicValues: [
        "Kubernetes orchestration for container management and auto-scaling",
        "Multi-cloud and hybrid strategies for maximum flexibility",
        "Infrastructure as Code with Terraform and GitOps workflows"
      ],
      technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "Helm", "Istio"]
    }
  },
  {
    icon: Brain,
    title: "AI Platform Engineering",
    description: "Building intelligent platforms with LLMs, machine learning, and advanced automation.",
    image: "/ai-platform.png",
    size: "small",
    details: {
      category: "ARTIFICIAL INTELLIGENCE",
      heroTitle: "AI Platform Engineering",
      heroSubtitle: "Intelligence at the Core",
      heroDescription: "Embed AI capabilities into your products and operations with production-ready platforms that scale from prototype to millions of users.",
      mainContent: [
        "Building AI-native platforms means more than just integrating an API. It requires a fundamental shift in how data is collected, processed, and utilized across the entire organization.",
        "An AI platform strategy involves LLM integration and fine-tuning, vector databases for semantic search, ML model training and deployment pipelines, real-time inference optimization, and continuous learning loops that improve over time.",
        "In the next decade, the gap between AI-native and AI-enabled companies will widen, with AI-native organizations achieving unprecedented levels of automation and personalization."
      ],
      strategicValues: [
        "Production-ready LLM integration with OpenAI, Anthropic, and open-source models",
        "Scalable ML infrastructure designed for real-time inference and batch processing",
        "MLOps pipelines for continuous model training, evaluation, and deployment"
      ],
      technologies: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face", "Vector DBs", "MLflow"]
    }
  },
  {
    icon: Layers,
    title: "Scalable Product Engineering",
    description: "High-performance web and mobile applications built for millions.",
    image: "/scalable-product.png",
    size: "small",
    details: {
      category: "PRODUCT DEVELOPMENT",
      heroTitle: "Scalable Product Engineering",
      heroSubtitle: "Built for Growth",
      heroDescription: "Create digital experiences that delight users and scale effortlessly from thousands to millions of active users.",
      mainContent: [
        "Building scalable products means more than just writing clean code. It requires a fundamental understanding of performance optimization, caching strategies, and distributed systems architecture.",
        "A scalable product strategy involves progressive web apps for offline-first experiences, microservices architecture for independent team velocity, real-time features with WebSockets and server-sent events, and comprehensive monitoring and observability.",
        "In the next decade, the gap between scalable and monolithic products will widen, with scalable architectures enabling faster iteration and better user experiences."
      ],
      strategicValues: [
        "Modern frameworks optimized for performance and developer experience",
        "API-first architecture designed for web, mobile, and third-party integrations",
        "Real-time capabilities for collaborative and interactive experiences"
      ],
      technologies: ["React", "Next.js", "React Native", "Node.js", "GraphQL", "TypeScript", "Redis", "PostgreSQL"]
    }
  },
  {
    icon: Activity,
    title: "DevOps & Site Reliability",
    description: "CI/CD, observability, and automation to ensure reliability at every stage.",
    image: "/devops.png",
    size: "medium",
    details: {
      category: "OPERATIONS",
      heroTitle: "DevOps & Site Reliability",
      heroSubtitle: "Engineering for Uptime",
      heroDescription: "Build resilient systems with comprehensive automation, monitoring, and incident response that keeps your services running 24/7.",
      mainContent: [
        "Achieving site reliability means more than just monitoring uptime. It requires a fundamental shift in how teams approach deployment, testing, and incident management across the entire organization.",
        "A DevOps strategy involves automated CI/CD pipelines for rapid deployment, comprehensive observability with metrics, logs, and traces, chaos engineering for proactive resilience testing, and incident management with clear runbooks and post-mortems.",
        "In the next decade, the gap between high-reliability and traditional operations will widen, with SRE-focused organizations achieving unprecedented levels of system stability and team efficiency."
      ],
      strategicValues: [
        "Automated deployment pipelines with zero-downtime releases",
        "Comprehensive monitoring with Prometheus, Grafana, and distributed tracing",
        "Incident response automation for faster recovery and reduced MTTR"
      ],
      technologies: ["Jenkins", "GitLab CI", "Prometheus", "Grafana", "ELK Stack", "Datadog", "PagerDuty", "Terraform"]
    }
  },
  {
    icon: RefreshCw,
    title: "Digital Transformation",
    description: "Modernizing legacy systems and aligning technology with business goals.",
    image: "/digital-transformation.png",
    size: "small",
    details: {
      category: "TRANSFORMATION",
      heroTitle: "Digital Transformation",
      heroSubtitle: "Modernize with Confidence",
      heroDescription: "Navigate complex legacy modernization with proven strategies that minimize risk while maximizing business value.",
      mainContent: [
        "Digital transformation means more than just moving to the cloud. It requires a fundamental shift in how organizations approach technology, processes, and culture across the entire business.",
        "A transformation strategy involves legacy system assessment and incremental migration, strangler fig pattern for gradual modernization, API-first architecture for system integration, change management and team training, and continuous improvement with feedback loops.",
        "In the next decade, the gap between digitally transformed and traditional organizations will widen, with transformed companies achieving unprecedented levels of agility and customer satisfaction."
      ],
      strategicValues: [
        "Risk-managed migration strategies with rollback capabilities",
        "Microservices architecture for independent team ownership",
        "Cloud-native patterns for scalability and cost optimization"
      ],
      technologies: ["Cloud Platforms", "Microservices", "APIs", "Kubernetes", "Event-Driven Architecture", "Domain-Driven Design"]
    }
  },
  {
    icon: Database,
    title: "Data & Intelligence Systems",
    description: "Building data pipelines, real-time analytics, and AI-powered decision systems.",
    image: "/data-intelligence.png",
    size: "medium",
    details: {
      category: "DATA ENGINEERING",
      heroTitle: "Data & Intelligence Systems",
      heroSubtitle: "From Data to Decisions",
      heroDescription: "Transform raw data into actionable insights with modern data platforms that power real-time analytics and AI-driven decision making.",
      mainContent: [
        "Building data intelligence means more than just storing data in a warehouse. It requires a fundamental shift in how data is collected, processed, and activated across the entire organization.",
        "A data strategy involves modern data lakehouse architecture, real-time streaming with Apache Kafka, ELT pipelines with dbt for transformation, semantic layers for consistent metrics, and embedded analytics for data democratization.",
        "In the next decade, the gap between data-driven and intuition-driven companies will widen, with data-native organizations achieving unprecedented levels of operational efficiency and customer understanding."
      ],
      strategicValues: [
        "Modern data stack with Snowflake, Databricks, and cloud data warehouses",
        "Real-time streaming architecture for event-driven insights",
        "Self-service analytics with semantic layers and BI tools"
      ],
      technologies: ["Snowflake", "Databricks", "Apache Kafka", "Apache Spark", "dbt", "Airflow", "Tableau", "Looker"]
    }
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Embedding security and compliance into every layer of engineering and infrastructure.",
    image: "/security.png",
    size: "medium",
    details: {
      category: "SECURITY",
      heroTitle: "Security & Compliance",
      heroSubtitle: "Defense in Depth",
      heroDescription: "Protect your business with comprehensive security strategies that embed protection at every layer while maintaining compliance with industry standards.",
      mainContent: [
        "Achieving security and compliance means more than just passing audits. It requires a fundamental shift in how security is integrated into development, deployment, and operations across the entire organization.",
        "A security strategy involves shift-left security with automated scanning, zero-trust architecture for network security, identity and access management with least privilege, compliance automation for SOC 2, HIPAA, and GDPR, and security monitoring with SIEM and threat detection.",
        "In the next decade, the gap between security-first and security-as-afterthought organizations will widen, with security-native companies achieving unprecedented levels of trust and regulatory compliance."
      ],
      strategicValues: [
        "Automated security scanning integrated into CI/CD pipelines",
        "Zero-trust architecture with identity-based access control",
        "Compliance automation for continuous audit readiness"
      ],
      technologies: ["AWS Security", "HashiCorp Vault", "SIEM Tools", "Snyk", "SonarQube", "Compliance Frameworks"]
    }
  },
];

export default function Services() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (expandedService !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedService]);

  const ServiceCard = ({ service, index, spanClass }: { service: typeof services[0], index: number, spanClass?: string }) => {
    const IconComponent = service.icon;
    const isExpanded = expandedService === index;

    return (
      <>
        {index !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -6 }}
            className={`${spanClass || ''} group relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-teal-green/50 dark:hover:border-teal-green/50 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer`}
            onClick={() => handleExpand(index)}
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/20 to-transparent" />
              
              {/* Expand indicator */}
              <motion.div
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-navy/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <ChevronDown size={20} className="text-dark-navy dark:text-white" />
              </motion.div>
            </div>
            
            <div className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-primary-blue/5 dark:bg-white/10 flex items-center justify-center mb-6 text-primary-blue dark:text-cyan-blue group-hover:bg-gradient-to-br group-hover:from-primary-blue group-hover:to-cyan-blue group-hover:text-white transition-all duration-300 shadow-sm">
                <IconComponent size={24} />
              </div>
              <h3 className="text-2xl font-bold text-dark-navy dark:text-white mb-3 group-hover:text-primary-blue dark:group-hover:text-cyan-blue transition-colors duration-300">{service.title}</h3>
              <p className="text-slate-500 dark:text-white/60 text-sm mb-6 leading-relaxed">{service.description}</p>
              <div
                className="inline-flex items-center gap-2 text-primary-blue dark:text-cyan-blue hover:text-royal-blue dark:hover:text-white font-bold transition-colors"
              >
                <span className="text-sm">Learn more</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Expanded Modal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-light-bg dark:bg-dark-navy"
            >
              {/* Scrolling Container */}
              <div className="absolute inset-0 overflow-y-auto h-full w-full" data-lenis-prevent>
                <div className="min-h-screen" onClick={() => setExpandedService(null)}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-full max-w-7xl mx-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Content Container */}
                    <div className="pt-32 px-8 lg:px-16 pb-20">
                      <div className="grid lg:grid-cols-3 gap-16">
                        {/* Main Content - Left 2/3 */}
                        <div className="lg:col-span-2 space-y-12">
                          {/* Category Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <span className="text-sm font-bold uppercase tracking-wider text-primary-blue dark:text-cyan-blue">
                              {service.details.category}
                            </span>
                          </motion.div>

                          {/* Hero Title */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                          >
                            <h1 className="text-4xl lg:text-6xl font-black leading-tight text-dark-navy dark:text-white">
                              {service.details.heroTitle}
                              <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-cyan-blue">
                                {service.details.heroSubtitle}
                              </span>
                            </h1>
                            <p className="text-lg leading-relaxed max-w-2xl text-slate-600 dark:text-white/70">
                              {service.details.heroDescription}
                            </p>
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(10,61,255,0.2)" }}
                              whileTap={{ scale: 0.98 }}
                              className="px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 bg-gradient-to-r from-primary-blue to-cyan-blue text-white shadow-lg cursor-pointer"
                            >
                              Partner with an Expert
                              <ArrowRight size={20} />
                            </motion.button>
                          </motion.div>

                          {/* Main Content Paragraphs */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/10"
                          >
                            {service.details.mainContent.map((paragraph, idx) => (
                              <p
                                key={idx}
                                className="text-base leading-relaxed text-slate-600 dark:text-white/70"
                              >
                                {paragraph.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                                  i % 2 === 1 ? (
                                    <strong key={i} className="text-dark-navy dark:text-white font-extrabold">
                                      {part}
                                    </strong>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            ))}
                          </motion.div>

                          {/* Technologies Section */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="pt-8"
                          >
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-dark-navy dark:text-white">
                              Technologies & Tools
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {service.details.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-4 py-2 rounded-full text-sm font-bold bg-white dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-100 dark:border-white/10 shadow-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        </div>

                        {/* Sidebar - Right 1/3 */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="lg:col-span-1"
                        >
                          <div className="space-y-8 animate-in">
                            {/* Strategic Values Card */}
                            <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-lg">
                              <h3 className="text-xl font-bold mb-6 text-dark-navy dark:text-white">
                                Strategic Values
                              </h3>
                              <ul className="space-y-4">
                                {service.details.strategicValues.map((value, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-cyan-blue" />
                                    <span className="text-sm leading-relaxed text-slate-600 dark:text-white/70 font-semibold">
                                      {value}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>

                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-8 px-6 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-primary-blue to-cyan-blue text-white shadow-md cursor-pointer"
                              >
                                Partner with an Expert
                              </motion.button>
                            </div>

                            {/* Service Image */}
                            <div className="relative h-64 rounded-3xl overflow-hidden border border-slate-100 dark:border-white/10 shadow-md">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Back button */}
              <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-[10000] pointer-events-auto">
                <motion.button
                  onClick={() => {
                    setExpandedService(null);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-white/10 text-dark-navy dark:text-white hover:bg-slate-50 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 shadow-lg cursor-pointer"
                  whileHover={{ x: -4 }}
                >
                  <ArrowRight size={20} className="rotate-180" />
                  <span className="text-sm font-bold">Back to Home</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <section 
      id="services" 
      className="relative py-32 overflow-hidden transition-colors duration-300 bg-light-bg dark:bg-dark-navy"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/20 text-primary-blue dark:text-cyan-blue font-bold text-sm uppercase tracking-wider mb-6"
          >
            OUR CAPABILITIES
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 text-dark-navy dark:text-white leading-tight">
            Engineering systems
            <br />
            that drive real business impact.
          </h2>
          
          <p className="text-lg text-slate-500 dark:text-white/60 max-w-2xl mb-8 font-medium">
            We build AI-native platforms, scalable infrastructure, and intelligent software systems that help enterprises innovate, operate, and grow.
          </p>

          <motion.a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('services');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-primary-blue dark:text-cyan-blue hover:text-royal-blue dark:hover:text-white font-bold transition-colors group cursor-pointer"
          >
            <span>Explore all services</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Large Card - Cloud Native (Full Width) */}
          {(() => {
            const service = services[0];
            const IconComponent = service.icon;
            return (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="lg:col-span-12 group relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-teal-green/50 dark:hover:border-teal-green/50 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => handleExpand(0)}
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto lg:col-span-6 overflow-hidden min-h-[300px]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/20 to-transparent" />
                      
                      {/* Expand indicator */}
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-navy/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ChevronDown size={20} className="text-dark-navy dark:text-white" />
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 lg:col-span-6 flex flex-col justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-primary-blue/5 dark:bg-white/10 flex items-center justify-center mb-6 text-primary-blue dark:text-cyan-blue group-hover:bg-gradient-to-br group-hover:from-primary-blue group-hover:to-cyan-blue group-hover:text-white transition-all duration-300 shadow-sm">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="text-3xl font-bold text-dark-navy dark:text-white mb-4 group-hover:text-primary-blue dark:group-hover:text-cyan-blue transition-colors duration-300">{service.title}</h3>
                      <p className="text-slate-500 dark:text-white/60 text-lg mb-6 leading-relaxed">{service.description}</p>
                      <div
                        className="inline-flex items-center gap-2 text-primary-blue dark:text-cyan-blue hover:text-royal-blue dark:hover:text-white font-bold transition-colors"
                      >
                        <span>Learn more</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <ServiceCard service={service} index={0} />
              </>
            );
          })()}

          {/* Row 2: AI Platform + Scalable Product */}
          {[1, 2].map((index) => (
            <ServiceCard key={index} service={services[index]} index={index} spanClass="lg:col-span-6" />
          ))}

          {/* Row 3: DevOps (Medium) + Digital Transformation (Small) */}
          {[
            { index: 3, spanClass: "lg:col-span-7" },
            { index: 4, spanClass: "lg:col-span-5" }
          ].map(({ index, spanClass }) => (
            <ServiceCard key={index} service={services[index]} index={index} spanClass={spanClass} />
          ))}

          {/* Row 4: Data Intelligence + Security */}
          {[
            { index: 5, spanClass: "lg:col-span-5" },
            { index: 6, spanClass: "lg:col-span-7" }
          ].map(({ index, spanClass }) => (
            <ServiceCard key={index} service={services[index]} index={index} spanClass={spanClass} />
          ))}
        </div>
      </div>
    </section>
  );
}
