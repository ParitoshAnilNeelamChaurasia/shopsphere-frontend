import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9191/api',
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopsphere-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
