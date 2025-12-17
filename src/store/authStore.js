import { create } from 'zustand'
import { authAPI } from '../api/endpoints/auth'

let refreshTimer = null

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,

  // Initialize auth state on app load
  initialize: async () => {
    if (get().isInitialized) return
    
    try {
      // Try to refresh using the HttpOnly cookie
      // authAPI.refresh() already extracts data from response
      const refreshData = await authAPI.refresh()
      
      if (refreshData && refreshData.token) {
        // Set token first
        set({ token: refreshData.token, isAuthenticated: true })
        
        // Get user profile, passing token directly
        const profile = await authAPI.getPerfil(refreshData.token)
        
        set({ 
          user: profile,
          token: refreshData.token,
          isAuthenticated: true,
          isInitialized: true
        })
        
        get().startRefreshTimer()
      } else {
        throw new Error('No token received')
      }
    } catch (error) {
      // No valid refresh token or error, silently fail and user needs to login
      // This is expected on first visit or after logout - don't log as error
      set({ 
        user: null,
        token: null,
        isAuthenticated: false,
        isInitialized: true
      })
    }
  },

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
      // authAPI.refresh() already extracts data
      const refreshData = await authAPI.refresh()
      
      if (refreshData && refreshData.token) {
        set({ token: refreshData.token })
        get().startRefreshTimer()
        return refreshData
      } else {
        throw new Error('No token in refresh response')
      }
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
      
      if (!data || !data.token) {
        throw new Error('No se recibió token de autenticación')
      }
      
      // Set token SYNCHRONOUSLY before making any other API calls
      set({ token: data.token, isAuthenticated: true })
      
      // Fetch profile, passing token directly to avoid race condition
      const profile = await authAPI.getPerfil(data.token)
      
      set({ 
        user: profile, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false,
        error: null
      })
      get().startRefreshTimer()
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Error al iniciar sesión'
      set({ 
        error: errorMessage, 
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null
      })
      // Don't throw - error is already set in state for UI to display
      return null
    }
  },

  registroCliente: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authAPI.registroCliente(userData)
      
      // Set token SYNCHRONOUSLY before making any other API calls
      set({ token: data.token, isAuthenticated: true })
      
      // Fetch profile, passing token directly to avoid race condition
      const profile = await authAPI.getPerfil(data.token)
      
      set({ 
        user: profile, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false,
        error: null
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
      
      // Set token SYNCHRONOUSLY before making any other API calls
      set({ token: data.token, isAuthenticated: true })
      
      // Fetch profile, passing token directly to avoid race condition
      const profile = await authAPI.getPerfil(data.token)
      
      set({ 
        user: profile, 
        token: data.token, 
        isAuthenticated: true,
        isLoading: false,
        error: null
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
      user: {
        ...state.user,
        ...userData,
        // Merge nested cliente/entrenador data properly
        cliente: userData.cliente ? { ...state.user?.cliente, ...userData.cliente } : state.user?.cliente,
        entrenador: userData.entrenador ? { ...state.user?.entrenador, ...userData.entrenador } : state.user?.entrenador
      }
    }))
  },

  clearError: () => {
    set({ error: null })
  }
}))
