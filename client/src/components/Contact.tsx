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
      className="relative py-32 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#0A0A0A" : "#f8f8f8" }}
    >
      {/* Terminal-inspired background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />

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
            className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="text-sm text-gray-300">Get in Touch</span>
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's Build the Future
            <br />
            <span className="text-white/60">Together</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ready to transform your vision into reality? Start a conversation with our team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-sm"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-50" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileFocus={{ scale: 1.02 }}
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
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                />
                {focused === "name" && (
                  <motion.div
                    layoutId="input-glow"
                    className="absolute inset-0 rounded-xl bg-white/5 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
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
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                />
                {focused === "email" && (
                  <motion.div
                    layoutId="input-glow"
                    className="absolute inset-0 rounded-xl bg-white/5 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            </div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
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
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
              {focused === "company" && (
                <motion.div
                  layoutId="input-glow"
                  className="absolute inset-0 rounded-xl bg-white/5 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
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
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
              />
              {focused === "message" && (
                <motion.div
                  layoutId="input-glow"
                  className="absolute inset-0 rounded-xl bg-white/5 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-5 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <motion.a
            href="mailto:info@aexontech.com"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={18} />
            <span>info@aexontech.com</span>
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <MessageSquare size={18} />
            <span>Schedule a Call</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
