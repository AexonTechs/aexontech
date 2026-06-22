"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { API_ENDPOINTS } from "@/config/api";

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We\'ll get back to you soon.'
        });
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="relative py-32 overflow-hidden transition-colors duration-300 bg-light-bg dark:bg-dark-navy"
    >
      {/* Terminal-inspired background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,61,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(10,61,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary-blue/5 border border-primary-blue/20 text-primary-blue dark:text-cyan-blue font-bold text-sm uppercase tracking-wider mb-6"
          >
            Get in Touch
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-black text-dark-navy dark:text-white mb-6">
            Let's Build the Future
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-cyan-blue font-extrabold">Together</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-white/60 max-w-2xl mx-auto font-medium">
            Ready to transform your vision into reality? Start a conversation with our team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative p-8 lg:p-12 rounded-3xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-xl backdrop-blur-sm"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-blue/5 to-transparent opacity-50 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-dark-navy dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-blue dark:focus:border-cyan-blue focus:ring-4 focus:ring-primary-blue/10 dark:focus:ring-cyan-blue/10 transition-all font-semibold"
                />
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-dark-navy dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-blue dark:focus:border-cyan-blue focus:ring-4 focus:ring-primary-blue/10 dark:focus:ring-cyan-blue/10 transition-all font-semibold"
                />
              </motion.div>
            </div>

            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                onFocus={() => setFocused("company")}
                onBlur={() => setFocused(null)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-dark-navy dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-blue dark:focus:border-cyan-blue focus:ring-4 focus:ring-primary-blue/10 dark:focus:ring-cyan-blue/10 transition-all font-semibold"
              />
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.01 }}
              className="relative"
            >
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-dark-navy dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary-blue dark:focus:border-cyan-blue focus:ring-4 focus:ring-primary-blue/10 dark:focus:ring-cyan-blue/10 transition-all resize-none font-semibold"
              />
            </motion.div>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                } font-bold text-sm`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(10,61,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-5 bg-gradient-to-r from-primary-blue to-cyan-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-base"
        >
          <motion.a
            href="mailto:info@aexontech.com"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-primary-blue dark:hover:text-cyan-blue font-bold transition-all"
          >
            <Mail size={18} />
            <span>info@aexontech.com</span>
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 text-slate-500 dark:text-white/60 hover:text-primary-blue dark:hover:text-cyan-blue font-bold transition-all"
          >
            <MessageSquare size={18} />
            <span>Schedule a Call</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
