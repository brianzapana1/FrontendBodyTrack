import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '../api/endpoints/auth'
import api from '../api/axios' // <-- tu instancia de axios

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estados persistentes
      user: null,
      token: null,
      isAuthenticated: false,

      // Estados temporales (NO se persisten)
      isLoading: false,
      error: null,
      preRegistro: null, // { email: "", password: "" }

      // ============================
      // 1. Guardar datos del paso 1
      // ============================
      setPreRegistro: (data) => {
        set({ preRegistro: data, error: null })
      },

      // =============================================
      // 2. Verificar si el email ya está registrado
      // =============================================
      verificarEmail: async (email) => {
        set({ isLoading: true, error: null })
        try {
          // Ajusta el endpoint según tu backend
          // Opción A: GET  /api/auth/verificar-email?email=xxx
          // Opción B: POST /api/auth/verificar-email con body { email }
          const response = await api.get(`/api/auth/verificar-email?email=${encodeURIComponent(email)}`)
          // Si el backend responde { existe: true } o { existe: false }
          const existe = response.data.existe === true
          set({ isLoading: false })
          return existe
        } catch (error) {
          const msg = error.response?.data?.message || 'Error al verificar el correo'
          set({ error: msg, isLoading: false })
          throw error
        }
      },

      // ===================================
      // 3. Registro final (paso 2)
      // ===================================
      registroCliente: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authAPI.registroCliente(userData)

          // Login automático tras registro exitoso
          localStorage.setItem('token', data.token)
          set({
            user: data.usuario,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            preRegistro: null, // limpiamos el temporal
          })
          return data
        } catch (error) {
          const msg = error.response?.data?.message || 'Error en el registro'
          set({ error: msg, isLoading: false })
          throw error
        }
      },

      // ===================================
      // 4. Login normal (ya lo tenías)
      // ===================================
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authAPI.login({ email, password })
          localStorage.setItem('token', data.token)
          set({
            user: data.usuario,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            preRegistro: null // por si acaso
          })
          return data
        } catch (error) {
          const msg = error.response?.data?.message || 'Error al iniciar sesión'
          set({ error: msg, isLoading: false })
          throw error
        }
      },

      // ===================================
      // 5. Registro entrenador (lo dejé igual)
      // ===================================
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
          const msg = error.response?.data?.message || 'Error en el registro'
          set({ error: msg, isLoading: false })
          throw error
        }
      },

      // ===================================
      // 6. Logout y utilidades
      // ===================================
      logout: () => {
        localStorage.removeItem('token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          preRegistro: null
        })
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }))
      },

      clearError: () => set({ error: null }),

      // Opcional: limpiar preRegistro manualmente (por si el usuario quiere volver atrás)
      limpiarPreRegistro: () => set({ preRegistro: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
      // preRegistro NO se guarda en localStorage → es temporal
    }
  )
)