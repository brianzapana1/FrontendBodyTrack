import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '../api/endpoints/auth'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authAPI.login({ email, password })
          localStorage.setItem('token', data.token)
          set({ 
            user: data.usuario, 
            token: data.token, 
            isAuthenticated: true,
            isLoading: false 
          })
          return data
        } catch (error) {
          set({ error: error.response?.data?.message || 'Error al iniciar sesión', isLoading: false })
          throw error
        }
      },

      registroCliente: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authAPI.registroCliente(userData)
          localStorage.setItem('token', data.token)
          set({ 
            user: data.usuario, 
            token: data.token, 
            isAuthenticated: true,
            isLoading: false 
          })
          return data
        } catch (error) {
          set({ error: error.response?.data?.message || 'Error en el registro', isLoading: false })
          throw error
        }
      },

      registroEntrenador: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authAPI.registroEntrenador(userData)
          localStorage.setItem('token', data.token)
          set({ 
            user: data.usuario, 
            token: data.token, 
            isAuthenticated: true,
            isLoading: false 
          })
          return data
        } catch (error) {
          set({ error: error.response?.data?.message || 'Error en el registro', isLoading: false })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null 
        })
      },

      updateUser: (userData) => {
        set((state) => ({ 
          user: { ...state.user, ...userData } 
        }))
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
