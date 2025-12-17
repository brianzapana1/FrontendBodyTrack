import api from '../axios'

export const authAPI = {
  // Registro de cliente
  registroCliente: async (userData) => {
    const { data } = await api.post('/api/auth/registro/cliente', userData)
    return data
  },

  // Registro de entrenador
  registroEntrenador: async (userData) => {
    const { data } = await api.post('/api/auth/registro/entrenador', userData)
    return data
  },

  // Login
  login: async (credentials) => {
    const { data } = await api.post('/api/auth/login', credentials)
    return data
  },

  // Refresh access token
  refresh: async () => {
    const { data } = await api.post('/api/auth/refresh')
    return data
  },

  // Logout
  logout: async () => {
    const { data } = await api.post('/api/auth/logout')
    return data
  },

  // Obtener perfil del usuario autenticado
  getPerfil: async (token = null) => {
    const config = {}
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` }
    }
    const { data } = await api.get('/api/auth/perfil', config)
    return data
  },

  // Actualizar perfil del usuario
  actualizarPerfil: async (profileData) => {
    const { data } = await api.put('/api/auth/perfil', profileData)
    return data
  },

  // Cambiar contraseña
  cambiarPassword: async (passwords) => {
    const { data } = await api.post('/api/auth/cambiar-password', passwords)
    return data
  }
}
