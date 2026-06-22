"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SharedPageLayout from "@/components/SharedPageLayout";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  status: string;
}

export default function CareersPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.JOBS_LIST);
      const data = await response.json();
      if (data.status === 'success') {
        setJobs(data.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <SharedPageLayout>
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className={`inline-block px-4 py-2 rounded-full border mb-6 ${
            isDark 
              ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20 text-[#00B4FF]' 
              : 'bg-[#E6ECF5] border-[#0A3DFF]/20 text-[#072B88]'
          } font-semibold`}>
            <span className="text-xs uppercase tracking-wider">
              WE ARE HIRING
            </span>
          </div>
          <h1 className={`text-5xl lg:text-7xl font-bold mb-8 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
            Join the <span className={isDark ? 'text-[#00B4FF]' : 'text-[#1A56F0]'}>Mission</span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
            Help us build the next generation of intelligent systems. We are looking for engineers, designers, and thinkers who want to make an impact.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard 
                key={job.id} 
                job={job} 
                isDark={isDark} 
                index={index}
                onClick={() => router.push(`/careers/${job.id}/apply`)}
              />
            ))
          ) : (
            <div className={`p-12 text-center rounded-2xl border ${
              isDark ? 'bg-[#0A3DFF]/5 border-[#00B4FF]/10' : 'bg-white border-[#E6ECF5] shadow-sm'
            }`}>
              <p className={isDark ? 'text-[#E6ECF5]/70' : 'text-[#5B6B82]'}>
                No open positions at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`mt-24 p-12 rounded-3xl text-center border ${
            isDark ? 'bg-[#0A3DFF]/5 border-[#00B4FF]/10' : 'bg-white border-[#E6ECF5] shadow-sm'
          }`}
        >
          <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>Don't see a role?</h3>
          <p className={`mb-8 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>We're always looking for talented people to join our talent pool.</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-bold transition-all bg-gradient-to-r from-[#0A3DFF] to-[#00B4FF] text-white hover:shadow-[0_0_20px_rgba(10,61,255,0.4)]"
          >
            Send Open Application
          </motion.button>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
}

function JobCard({ job, isDark, index, onClick }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`p-8 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300 cursor-pointer group hover:-translate-y-0.5 ${
        isDark 
          ? 'bg-[#0A3DFF]/5 border-[#00B4FF]/10 hover:border-[#00D4B8] hover:bg-[#0A3DFF]/10' 
          : 'bg-white border-[#E6ECF5] shadow-sm hover:border-[#00D4B8] hover:shadow-md'
      }`}
    >
      <div>
        <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${isDark ? 'text-[#00B4FF]' : 'text-[#1A56F0]'}`}>{job.department}</span>
        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>{job.title}</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className={isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'} />
            <span className={`text-sm ${isDark ? 'text-[#E6ECF5]/70' : 'text-[#5B6B82]'}`}>{job.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className={isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'} />
            <span className={`text-sm ${isDark ? 'text-[#E6ECF5]/70' : 'text-[#5B6B82]'}`}>{job.location}</span>
          </div>
        </div>
      </div>
      <motion.div
        whileHover={{ x: 5 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDark 
            ? 'bg-[#0A3DFF]/20 text-[#00B4FF] group-hover:bg-[#00B4FF] group-hover:text-white' 
            : 'bg-[#E6ECF5] text-[#072B88] group-hover:bg-gradient-to-r group-hover:from-[#0A3DFF] group-hover:to-[#00B4FF] group-hover:text-white'
        }`}
      >
        <ArrowRight size={20} />
      </motion.div>
    </motion.div>
  );
}
