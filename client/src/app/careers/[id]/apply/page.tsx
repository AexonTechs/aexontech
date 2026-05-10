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
          <div className="text-white">Loading...</div>
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
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all ${
            isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-black/5'
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
            isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-black/10 shadow-lg'
          }`}
        >
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">
              {job.department}
            </span>
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-gray-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{job.department}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                About the Role
              </h2>
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {job.description}
              </p>
            </div>

            <div>
              <h2 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
                Requirements
              </h2>
              <p className={`leading-relaxed whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
            isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-black/10 shadow-lg'
          }`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
            Apply for this Position
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-black placeholder-gray-400'
                  }`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-black placeholder-gray-400'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-400'
                }`}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Resume * (PDF or Word, max 5MB)
              </label>
              <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                formData.resume 
                  ? 'border-green-500 bg-green-500/5' 
                  : isDark 
                    ? 'border-white/20 hover:border-white/40 bg-white/5' 
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
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
                    <CheckCircle size={48} className="text-green-500" />
                    <div>
                      <p className="text-green-500 font-semibold">{formData.resume.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(formData.resume.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Click to change file</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <Upload size={48} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
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
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Cover Letter
              </label>
              <textarea
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-400'
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
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/careers')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-black'
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
