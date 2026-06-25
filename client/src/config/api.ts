// API Configuration
const DEFAULT_API_BASE_URL = 'https://aexontech.com';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, '');

export const API_ENDPOINTS = {
  // Auth
  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_VERIFY: `${API_BASE_URL}/api/admin/verify`,
  
  // Contact
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact`,
  
  // Jobs
  JOBS_LIST: `${API_BASE_URL}/api/jobs`,
  JOBS_DETAIL: (id: string) => `${API_BASE_URL}/api/jobs/${id}`,
  JOBS_APPLY: (id: string) => `${API_BASE_URL}/api/jobs/${id}/apply`,
  
  // Admin
  ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
  ADMIN_CONTACTS: `${API_BASE_URL}/api/admin/contacts`,
  ADMIN_JOBS: `${API_BASE_URL}/api/admin/jobs`,
  ADMIN_APPLICATIONS: `${API_BASE_URL}/api/admin/applications`,
  
  // RAG Chat
  CHAT: `${API_BASE_URL}/api/chat`,
  CHAT_STREAM: `${API_BASE_URL}/api/chat/stream`,
  
  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
};
