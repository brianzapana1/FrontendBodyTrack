import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    // Si el token expiró → solo limpiar, NO redirigir
    if (status === 401) {
      localStorage.removeItem('token')
      // ❗ NO redirigimos a /login
      // ❗ NO recargamos la app
      // Los componentes (como LoginForm) se encargan de qué hacer.
    }

    return Promise.reject(error)
  }
)

export default api
