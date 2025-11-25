import { create } from 'zustand'
import { authAPI } from '../api/endpoints/auth'

let refreshTimer = null

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  startRefreshTimer: () => {
    // Clear any existing timer
    if (refreshTimer) clearTimeout(refreshTimer)
    
    // Refresh token 1 minute before expiration (14 mins for 15 min token)
    refreshTimer = setTimeout(() => {
      get().refreshToken()
    }, 14 * 60 * 1000)
  },

  refreshToken: async () => {
    try {
      const data = await authAPI.refresh()
      set({ token: data.token })
      get().startRefreshTimer()
      return data
    } catch (error) {
      // Refresh failed, logout
      get().logout()
      throw error
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authAPI.login({ email, password })
      set({ 
        user: data.usuario, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false 
      })
      get().startRefreshTimer()
      return data
    } catch (error) {
      set({ error: error.response?.data?.error || 'Error al iniciar sesión', isLoading: false })
      throw error
    }
  },

  registroCliente: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authAPI.registroCliente(userData)
      set({ 
        user: data.usuario, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false 
      })
      get().startRefreshTimer()
      return data
    } catch (error) {
      set({ error: error.response?.data?.error || 'Error en el registro', isLoading: false })
      throw error
    }
  },

  registroEntrenador: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authAPI.registroEntrenador(userData)
      set({ 
        user: data.usuario, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false 
      })
      get().startRefreshTimer()
      return data
    } catch (error) {
      set({ error: error.response?.data?.error || 'Error en el registro', isLoading: false })
      throw error
    }
  },

  logout: async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      // Ignore logout errors
    } finally {
      if (refreshTimer) clearTimeout(refreshTimer)
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        error: null 
      })
    }
  },

  setToken: (token) => {
    set({ token })
  },

  updateUser: (userData) => {
    set((state) => ({ 
      user: { ...state.user, ...userData } 
    }))
  },

  clearError: () => {
    set({ error: null })
  }
}))
