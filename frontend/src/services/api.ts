import axios from 'axios';
import keycloak from '../config/keycloak';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  async (config) => {
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
