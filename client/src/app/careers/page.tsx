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
          <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              WE ARE HIRING
            </span>
          </div>
          <h1 className={`text-5xl lg:text-7xl font-bold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
            Join the <span className="text-blue-500">Mission</span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            }`}>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                No open positions at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`mt-24 p-12 rounded-3xl text-center border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}
        >
          <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Don't see a role?</h3>
          <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>We're always looking for talented people to join our talent pool.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-bold transition-all ${
              isDark ? 'bg-white text-black' : 'bg-black text-white'
            }`}
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
      className={`p-8 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all cursor-pointer group ${
        isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]' : 'bg-black/[0.03] border-black/10 hover:bg-white hover:shadow-xl'
      }`}
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">{job.department}</span>
        <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{job.title}</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-500" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{job.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-500" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{job.location}</span>
          </div>
        </div>
      </div>
      <motion.div
        whileHover={{ x: 5 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isDark ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-black' : 'bg-black/5 text-black group-hover:bg-black group-hover:text-white'
        }`}
      >
        <ArrowRight size={20} />
      </motion.div>
    </motion.div>
  );
}
