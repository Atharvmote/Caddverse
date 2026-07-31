// Centralized API configuration to handle Local Development vs. Production Deployment
export const API_BASE_URL = 
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5001/api'
    : 'https://caddverse.in/api'; // Set this to your live backend domain (e.g., '/api' or a Render/Railway service URL)
