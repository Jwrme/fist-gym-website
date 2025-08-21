// Global API Configuration
const API_BASE_URL = 'https://senjitsu-backend.onrender.com';

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
  // Replace any localhost:3001 URLs with production backend
  if (typeof url === 'string') {
    if (url.includes('localhost:3001')) {
      url = url.replace('http://localhost:3001', API_BASE_URL);
    } else if (url.startsWith('/api')) {
      url = `${API_BASE_URL}${url}`;
    }
  }
  return originalFetch.call(this, url, options);
};

export default API_BASE_URL;

