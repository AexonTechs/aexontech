"use client";

import SharedPageLayout from "@/components/SharedPageLayout";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function TermsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <SharedPageLayout>
      <div className="max-w-4xl mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Terms & Conditions
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Last Updated: May 10, 2026
          </p>
        </motion.div>

        <div className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>1. Acceptance of Terms</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              By accessing or using the Aexon website and services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>2. Use License</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Permission is granted to temporarily download one copy of the materials (information or software) on Aexon's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <ul className={`list-disc pl-6 space-y-2 mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display;</li>
              <li>Attempt to decompile or reverse engineer any software contained on Aexon's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>3. Disclaimer</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              The materials on Aexon's website are provided on an 'as is' basis. Aexon makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>4. Limitations</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              In no event shall Aexon or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Aexon's website.
            </p>
          </section>
        </div>
      </div>
    </SharedPageLayout>
  );
}
