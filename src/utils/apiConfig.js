// Global API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://senjitsu-backend.onrender.com'
  : 'http://localhost:3001';

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// For backward compatibility, export the base URL
export { API_BASE_URL };

// Override fetch to automatically use the correct base URL
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // If URL starts with /api, prepend the base URL
  if (typeof url === 'string' && url.startsWith('/api')) {
    url = `${API_BASE_URL}${url}`;
  }
  return originalFetch.call(this, url, options);
};

export default API_BASE_URL;