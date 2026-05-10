"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, Briefcase, Users, LogOut, Plus, Edit, Trash2, 
  X, Eye, Download, Calendar, Phone, FileText
} from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface Stats {
  newContacts: number;
  activeJobs: number;
  pendingApplications: number;
  systemUptime: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  status: string;
  created_at: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  status: string;
  created_at: string;
}

interface Application {
  id: number;
  job_id: number;
  job_title: string;
  job_department: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string;
  resume_file: string;
  cover_letter: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts' | 'jobs' | 'applications'>('dashboard');
  
  const [stats, setStats] = useState<Stats | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const response = await fetch(API_ENDPOINTS.ADMIN_VERIFY, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setIsAuthenticated(true);
          fetchDashboardData();
        } else {
          localStorage.removeItem('adminToken');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('adminToken');
      }
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Connection error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [statsRes, contactsRes, jobsRes, applicationsRes] = await Promise.all([
        fetch(API_ENDPOINTS.ADMIN_STATS, { headers }),
        fetch(API_ENDPOINTS.ADMIN_CONTACTS, { headers }),
        fetch(API_ENDPOINTS.ADMIN_JOBS, { headers }),
        fetch(API_ENDPOINTS.ADMIN_APPLICATIONS, { headers })
      ]);

      const [statsData, contactsData, jobsData, applicationsData] = await Promise.all([
        statsRes.json(),
        contactsRes.json(),
        jobsRes.json(),
        applicationsRes.json()
      ]);

      if (statsData.status === 'success') setStats(statsData.data);
      if (contactsData.status === 'success') setContacts(contactsData.data);
      if (jobsData.status === 'success') setJobs(jobsData.data);
      if (applicationsData.status === 'success') setApplications(applicationsData.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const updateContactStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN_CONTACTS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const updateApplicationStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN_APPLICATIONS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const deleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN_JOBS}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400 mb-8">Access the admin dashboard</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                  placeholder="info@aexontech.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                  placeholder="••••••••"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all"
              >
                Sign In
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Users size={18} /> },
              { id: 'contacts', label: 'Contacts', icon: <Mail size={18} /> },
              { id: 'jobs', label: 'Jobs', icon: <Briefcase size={18} /> },
              { id: 'applications', label: 'Applications', icon: <Users size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="New Contacts" value={stats.newContacts} color="blue" />
                <StatCard title="Active Jobs" value={stats.activeJobs} color="green" />
                <StatCard title="Pending Applications" value={stats.pendingApplications} color="yellow" />
                <StatCard title="System Uptime" value={stats.systemUptime} color="purple" />
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Contact Submissions</h2>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                      {contact.company && (
                        <p className="text-gray-500 text-sm">{contact.company}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{contact.message}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(contact.created_at).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Job Postings</h2>
              <button
                onClick={() => {
                  setEditingJob(null);
                  setShowJobModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100"
              >
                <Plus size={18} />
                Add Job
              </button>
            </div>
            <div className="space-y-4">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          {job.location}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {job.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          job.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingJob(job);
                          setShowJobModal(true);
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Job Applications</h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedApplication(app);
                    setShowApplicationModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                      <p className="text-gray-400 text-sm">{app.email}</p>
                      {app.phone && <p className="text-gray-500 text-sm">{app.phone}</p>}
                      <p className="text-blue-400 text-sm mt-2">
                        Applied for: {app.job_title} ({app.job_department})
                      </p>
                      {(app.resume_file || app.resume_url) && (
                        <p className="text-gray-500 text-sm mt-1">
                          📄 Resume attached
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateApplicationStatus(app.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplication(app);
                          setShowApplicationModal(true);
                        }}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {new Date(app.created_at).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Job Modal */}
      {showJobModal && (
        <JobModal
          job={editingJob}
          onClose={() => {
            setShowJobModal(false);
            setEditingJob(null);
          }}
          onSuccess={() => {
            setShowJobModal(false);
            setEditingJob(null);
            fetchDashboardData();
          }}
        />
      )}

      {/* Application Detail Modal */}
      {showApplicationModal && selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedApplication(null);
          }}
          onStatusUpdate={(id, status) => {
            updateApplicationStatus(id, status);
            setShowApplicationModal(false);
            setSelectedApplication(null);
          }}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number | string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    purple: 'bg-purple-500/20 text-purple-400'
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className={`text-4xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value}
      </p>
    </div>
  );
}

function JobModal({ job, onClose, onSuccess }: { job: Job | null; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    department: job?.department || '',
    location: job?.location || '',
    type: job?.type || 'Full-time',
    description: job?.description || '',
    requirements: job?.requirements || '',
    status: job?.status || 'active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = job 
        ? `${API_ENDPOINTS.ADMIN_JOBS}/${job.id}`
        : API_ENDPOINTS.ADMIN_JOBS;
      
      const method = job ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {job ? 'Edit Job' : 'Create New Job'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100"
            >
              {job ? 'Update Job' : 'Create Job'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ApplicationDetailModal({ 
  application, 
  onClose, 
  onStatusUpdate 
}: { 
  application: Application; 
  onClose: () => void; 
  onStatusUpdate: (id: number, status: string) => void;
}) {
  const [status, setStatus] = useState(application.status);

  const handleDownloadResume = async () => {
    if (!application.resume_file && !application.resume_url) {
      alert('No resume file available');
      return;
    }

    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN_APPLICATIONS}/${application.id}/resume`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Failed to download resume');
        return;
      }

      // Get the filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${application.name}_Resume.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const handleStatusUpdate = () => {
    onStatusUpdate(application.id, status);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-3xl my-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Application Details</h2>
            <p className="text-gray-400">
              {application.job_title} • {application.job_department}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Applicant Info */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users size={20} />
              Applicant Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Full Name</p>
                <p className="text-white font-medium">{application.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <a 
                  href={`mailto:${application.email}`}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {application.email}
                </a>
              </div>
              {application.phone && (
                <div>
                  <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                    <Phone size={14} />
                    Phone
                  </p>
                  <a 
                    href={`tel:${application.phone}`}
                    className="text-white font-medium"
                  >
                    {application.phone}
                  </a>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar size={14} />
                  Applied On
                </p>
                <p className="text-white font-medium">
                  {new Date(application.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Resume */}
          {(application.resume_file || application.resume_url) && (
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText size={20} />
                Resume
              </h3>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <FileText size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {application.resume_file || application.resume_url}
                    </p>
                    <p className="text-sm text-gray-400">Resume Document</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  <Download size={18} />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Cover Letter */}
          {application.cover_letter && (
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cover Letter</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {application.cover_letter}
                </p>
              </div>
            </div>
          )}

          {/* Status Update */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Application Status</h3>
            <div className="flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              >
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="interviewed">Interviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={status === application.status}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
