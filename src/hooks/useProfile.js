import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authAPI } from '../api/endpoints/auth'
import { clientesAPI } from '../api/endpoints/clientes'
import { entrenadoresAPI } from '../api/endpoints/entrenadores'
import { useAuthStore } from '../store/authStore'
import { toast } from 'react-hot-toast'

/**
 * Custom hook for profile management
 * Provides functions to get, update profile and change password
 */
export const useProfile = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  // Get profile data
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      // authAPI.getPerfil() uses token from store via interceptor
      return await authAPI.getPerfil()
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  })

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const { rol } = user

      // Route to appropriate endpoint based on role
      if (rol === 'ADMIN') {
        // Admin updates Usuario table directly
        return await authAPI.actualizarPerfil(data)
      } else if (rol === 'CLIENTE' && user.cliente?.id) {
        return await clientesAPI.update(user.cliente.id, data)
      } else if (rol === 'ENTRENADOR' && user.entrenador?.id) {
        return await entrenadoresAPI.update(user.entrenador.id, data)
      } else {
        throw new Error('No se pudo determinar el tipo de usuario')
      }
    },
    onSuccess: async (response) => {
      // Refetch profile to get updated data from backend
      const updatedProfile = await authAPI.getPerfil()
      
      // Update auth store with new user data
      useAuthStore.getState().updateUser(updatedProfile)
      
      // Invalidate and refetch queries
      queryClient.invalidateQueries(['profile', user?.id])
      
      toast.success('Perfil actualizado correctamente')
      return response
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Error al actualizar perfil'
      toast.error(message)
      throw error
    }
  })

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async ({ passwordActual, passwordNuevo }) => {
      return await authAPI.cambiarPassword({
        passwordActual,
        passwordNuevo
      })
    },
    onSuccess: () => {
      toast.success('Contraseña cambiada correctamente')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Error al cambiar contraseña'
      toast.error(message)
      throw error
    }
  })

  return {
    // Profile data
    profile,
    isLoading,
    isError,
    error,
    refetch,

    // Update profile
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isLoading,
    updateError: updateProfileMutation.error,

    // Change password
    changePassword: changePasswordMutation.mutate,
    changePasswordAsync: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isLoading,
    changePasswordError: changePasswordMutation.error,
  }
}
