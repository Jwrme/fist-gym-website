// API Configuration
const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://fist-gym-website.onrender.com' // Use production URL
    : 'http://localhost:3001', // Use localhost in development
  
  // WebSocket URL
  WS_URL: process.env.NODE_ENV === 'production'
    ? `wss://fist-gym-website.onrender.com` // Use production WebSocket URL
    : 'ws://localhost:3001' // Use localhost in development
};

export default config;
