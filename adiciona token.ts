// src/api/axios.ts
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((cfg) => {
  // o token está em HttpOnly cookie; caso precise de header:
  // const token = localStorage.getItem('access_token');
  // if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
