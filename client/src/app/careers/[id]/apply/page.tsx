"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SharedPageLayout from "@/components/SharedPageLayout";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Upload, CheckCircle, Briefcase, MapPin, Clock } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
}

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [job, setJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    cover_letter: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.JOBS_DETAIL(params.id as string));
      const data = await response.json();
      if (data.status === 'success') {
        setJob(data.data);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'Resume file size must be less than 5MB'
        });
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please upload a PDF or Word document'
        });
        return;
      }
      setFormData({ ...formData, resume: file });
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.resume) {
      setSubmitStatus({
        type: 'error',
        message: 'Please upload your resume'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('cover_letter', formData.cover_letter);
      
      const response = await fetch(API_ENDPOINTS.JOBS_APPLY(params.id as string), {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We\'ll be in touch soon.'
        });
        setFormData({ name: "", email: "", phone: "", resume: null, cover_letter: "" });
        setTimeout(() => router.push('/careers'), 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <SharedPageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-[#072B88]'}`}>Loading...</div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/careers')}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all font-semibold ${
            isDark 
              ? 'text-[#E6ECF5]/75 hover:text-white hover:bg-[#0A3DFF]/10' 
              : 'text-[#5B6B82] hover:text-[#072B88] hover:bg-[#E6ECF5]'
          }`}
        >
          <ArrowLeft size={20} />
          Back to Careers
        </motion.button>

        {/* Job Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl border mb-8 ${
            isDark ? 'bg-[#0A3DFF]/5 border-[#00B4FF]/10' : 'bg-white border-[#E6ECF5] shadow-lg'
          }`}
        >
          <div className="mb-6">
            <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${isDark ? 'text-[#00B4FF]' : 'text-[#1A56F0]'}`}>
              {job.department}
            </span>
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock size={18} className={isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'} />
                <span className={`text-sm ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className={isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'} />
                <span className={`text-sm ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className={isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'} />
                <span className={`text-sm ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>{job.department}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
                About the Role
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                {job.description}
              </p>
            </div>

            <div>
              <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
                Requirements
              </h2>
              <p className={`leading-relaxed whitespace-pre-line ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                {job.requirements}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-2xl border ${
            isDark ? 'bg-[#0A3DFF]/5 border-[#00B4FF]/10' : 'bg-white border-[#E6ECF5] shadow-lg'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
            Apply for this Position
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] transition-all duration-300 ${
                    isDark 
                      ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20 text-white placeholder-[#E6ECF5]/40' 
                      : 'bg-white border-[#E6ECF5] text-[#072B88] placeholder-[#5B6B82]/50'
                  }`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] transition-all duration-300 ${
                    isDark 
                      ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20 text-white placeholder-[#E6ECF5]/40' 
                      : 'bg-white border-[#E6ECF5] text-[#072B88] placeholder-[#5B6B82]/50'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] transition-all duration-300 ${
                  isDark 
                    ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20 text-white placeholder-[#E6ECF5]/40' 
                    : 'bg-white border-[#E6ECF5] text-[#072B88] placeholder-[#5B6B82]/50'
                }`}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                Resume * (PDF or Word, max 5MB)
              </label>
              <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                formData.resume 
                  ? 'border-emerald-500 bg-emerald-500/5' 
                  : isDark 
                    ? 'border-[#00B4FF]/20 hover:border-[#00B4FF]/50 bg-[#0A3DFF]/5' 
                    : 'border-[#E6ECF5] hover:border-[#00B4FF]/50 bg-[#F7F9FC]'
              }`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {formData.resume ? (
                  <div className="flex flex-col items-center gap-3">
                    <CheckCircle size={48} className="text-emerald-500" />
                    <div>
                      <p className="text-emerald-500 font-semibold">{formData.resume.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(formData.resume.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Upload size={48} className={isDark ? 'text-[#00B4FF]' : 'text-[#0A3DFF]'} />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#072B88]'}`}>
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PDF, DOC, or DOCX (max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-[#E6ECF5]/80' : 'text-[#5B6B82]'}`}>
                Cover Letter
              </label>
              <textarea
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00B4FF] focus:border-[#00B4FF] transition-all duration-300 resize-none ${
                  isDark 
                    ? 'bg-[#0A3DFF]/10 border-[#00B4FF]/20 text-white placeholder-[#E6ECF5]/40' 
                    : 'bg-white border-[#E6ECF5] text-[#072B88] placeholder-[#5B6B82]/50'
                }`}
                placeholder="Tell us why you're a great fit for this role..."
              />
            </div>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  submitStatus.type === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-[#0A3DFF] to-[#00B4FF] text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,61,255,0.4)]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/careers')}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-[#E6ECF5] hover:bg-[#E6ECF5]/80 text-[#072B88]'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
}
