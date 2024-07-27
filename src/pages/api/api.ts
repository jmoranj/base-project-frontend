import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

api.interceptors.request.use((req) => {
  const token = Cookies.get('accessToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    console.log('Unauthorized - Redirecting to login');
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
  console.error('Response Error:', error);
  return Promise.reject(error);
});

export default api;
