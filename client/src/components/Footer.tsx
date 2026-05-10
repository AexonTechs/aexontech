"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer 
      className="relative border-t overflow-hidden transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? "#050505" : "#ffffff",
        borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Logo width={140} height={32} showText={true} className="mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed">
              Engineering intelligent digital systems for the future.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              {["Cloud Architecture", "AI Engineering", "Product Development", "DevOps"].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4 }}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
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
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Connect</h4>
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
                      isDark 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                        : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
                    }`}
                  >
                    <Icon className={isDark ? "text-white" : "text-black"} />
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
          className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Aexon. All rights reserved.</p>
          <div className="flex gap-6">
            <motion.a href="#" whileHover={{ y: -2 }} className="hover:text-white transition-colors">
              Privacy Policy
            </motion.a>
            <motion.a href="/terms" whileHover={{ y: -2 }} className="hover:text-white transition-colors">
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
