import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Send cookies with requests
})

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    // Initialize headers if not present
    if (!config.headers) {
      config.headers = {}
    }
    
    // Skip if Authorization header is already set (e.g., passed directly)
    if (config.headers.Authorization) {
      return config
    }
    
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores y refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Don't retry if it's the refresh endpoint, login endpoint, or already retried
    const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh')
    const isLoginEndpoint = originalRequest.url?.includes('/auth/login')
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint && !isLoginEndpoint) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/auth/refresh`,
          {},
          { withCredentials: true }
        )
        
        useAuthStore.getState().setToken(data.token)
        originalRequest.headers.Authorization = `Bearer ${data.token}`
        
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        const { isInitialized } = useAuthStore.getState()
        useAuthStore.getState().logout()
        
        // Only redirect if app is already initialized (not during initial load)
        if (isInitialized && window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
