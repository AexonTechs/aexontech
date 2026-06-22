"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer 
      className="relative border-t border-slate-100 dark:border-white/10 overflow-hidden transition-colors duration-300 bg-white dark:bg-dark-navy"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Logo width={120} height={26} showText={true} className="mb-2" />
            <p className="text-slate-500 dark:text-white/60 text-sm leading-relaxed font-semibold">
              Engineering intelligent digital systems for the future.
            </p>
          </div>

          <div>
            <h4 className="text-dark-navy dark:text-white font-bold mb-4 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-2">
              {["Cloud Architecture", "AI Engineering", "Product Development", "DevOps"].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4 }}
                    className="text-slate-500 dark:text-white/60 hover:text-primary-blue dark:hover:text-cyan-blue text-sm font-semibold transition-colors"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-dark-navy dark:text-white font-bold mb-4 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-2">
              {[
                { name: "About", href: "/about" },
                { name: "Work", href: "/#work" },
                { name: "Process", href: "/#process" },
                { name: "Careers", href: "/careers" },
                { name: "Admin", href: "/admin" }
              ].map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="text-slate-500 dark:text-white/60 hover:text-primary-blue dark:hover:text-cyan-blue text-sm font-semibold transition-colors"
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-dark-navy dark:text-white font-bold mb-4 uppercase tracking-wider text-xs">Connect</h4>
            <div className="flex gap-3">
              {[
                { 
                  name: "LinkedIn", 
                  url: "https://www.linkedin.com/company/aexontech/",
                  icon: (props: any) => (
                    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  )
                },
                { 
                  name: "Instagram", 
                  url: "https://www.instagram.com/aexon_tech?igsh=dGtnd2VndDF4cDE1",
                  icon: (props: any) => (
                    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  )
                }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-white/60 hover:border-primary-blue hover:text-primary-blue dark:hover:border-cyan-blue dark:hover:text-cyan-blue"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-8"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-semibold">
          <p>© 2026 Aexon. All rights reserved.</p>
          <div className="flex gap-6">
            <motion.a href="#" whileHover={{ y: -2 }} className="hover:text-primary-blue dark:hover:text-cyan-blue transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a href="/terms" whileHover={{ y: -2 }} className="hover:text-primary-blue dark:hover:text-cyan-blue transition-colors">
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
