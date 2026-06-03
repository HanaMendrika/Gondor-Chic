import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.includeAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`API ${config.method.toUpperCase()} Request:`, config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === false) {
      throw new Error(response.data.message || 'Une erreur est survenue');
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || `Erreur ${error.response.status}`;
      console.error('API Error:', message);
      throw new Error(message);
    } else if (error.request) {
      console.error('Network Error:', error.message);
      throw new Error('Impossible de contacter le serveur');
    } else {
      console.error('Request Error:', error.message);
      throw error;
    }
  }
);

const api = {
  get: async (endpoint, includeAuth = false) => {
    const response = await apiClient.get(endpoint, {
      includeAuth: includeAuth
    });
    return response;
  },
  
  post: async (endpoint, body, includeAuth = false) => {
    const response = await apiClient.post(endpoint, body, {
      includeAuth: includeAuth
    });
    return response;
  },
  
  put: async (endpoint, body, includeAuth = false) => {
    const response = await apiClient.put(endpoint, body, {
      includeAuth: includeAuth
    });
    return response;
  },
  
  delete: async (endpoint, includeAuth = false) => {
    const response = await apiClient.delete(endpoint, {
      includeAuth: includeAuth
    });
    return response;
  },
};

export default api;