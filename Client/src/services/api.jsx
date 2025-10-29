import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true
});

export const authService = {
  getCurrentUser: () => api.get('/auth/user'),
  logout: () => api.get('/auth/logout'),

  // ✅ OAuth Login (Redirect to backend)
  googleLogin: () => { window.location.href = `${API_BASE}/auth/google`; },
  facebookLogin: () => { window.location.href = `${API_BASE}/auth/facebook`; },
  githubLogin: () => { window.location.href = `${API_BASE}/auth/github`; }
};

export const searchService = {
  getTopSearches: () => api.get('/api/top-searches'),
  search: (term) => api.post('/api/search', { term }),
  getHistory: () => api.get('/api/history')
};

export default api;
