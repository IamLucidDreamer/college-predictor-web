import axios from 'axios';
import { getAuthToken } from './auth';

const BASE_URL = "https://backend.in.ngrok.io/api";

export const server = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 600000,
  headers: {
    'Access-Control-Allow-Origin': "https://backend.in.ngrok.io/",
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

server.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (process.env.REACT_APP_API_WITH_CREDENTIALS === 'true') {
      config.withCredentials = true;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const serverUnauth = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 600000,
  headers: {
    'Access-Control-Allow-Origin': process.env.REACT_APP_RAILS_HOST,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});
