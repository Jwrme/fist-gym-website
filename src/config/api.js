// API Configuration for Frontend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://senjitsu-backend.onrender.com'
  : 'http://localhost:3001';

export { API_BASE_URL };
