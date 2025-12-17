import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import progresoAPI from '../api/endpoints/progreso'
import { authAPI } from '../api/endpoints/auth'
import { useAuthStore } from '../store/authStore'
import { toast } from 'react-hot-toast'

/**
 * Hook para obtener el historial de progreso de un cliente
 */
export const useProgresoHistorial = (clienteId) => {
  return useQuery({
    queryKey: ['progreso', 'historial', clienteId],
    queryFn: () => progresoAPI.listarPorCliente(clienteId),
    enabled: !!clienteId
  })
}

/**
 * Hook para obtener estadísticas de progreso
 */
export const useProgresoEstadisticas = (clienteId) => {
  return useQuery({
    queryKey: ['progreso', 'estadisticas', clienteId],
    queryFn: () => progresoAPI.obtenerEstadisticas(clienteId),
    enabled: !!clienteId
  })
}

/**
 * Hook para obtener detalle de un registro específico
 */
export const useProgresoDetalle = (id) => {
  return useQuery({
    queryKey: ['progreso', id],
    queryFn: () => progresoAPI.obtenerDetalle(id),
    enabled: !!id
  })
}

/**
 * Hook para crear un nuevo registro de progreso
 */
export const useCrearProgreso = () => {
  const queryClient = useQueryClient()
  const { user, updateUser } = useAuthStore()

  return useMutation({
    mutationFn: progresoAPI.crear,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['progreso'] })
      // Invalidate profile cache to refresh weight/height in profile view
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] })
      
      // Refetch user profile to update authStore with latest weight/height
      try {
        const updatedProfile = await authAPI.getPerfil()
        updateUser(updatedProfile)
      } catch (error) {
        console.error('Error updating user profile:', error)
      }
      
      toast.success('Registro de progreso creado exitosamente')
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Error al crear registro de progreso'
      toast.error(message)
    }
  })
}

/**
 * Hook para actualizar un registro de progreso
 */
export const useActualizarProgreso = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, formData }) => progresoAPI.actualizar(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progreso'] })
      toast.success('Registro actualizado exitosamente')
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Error al actualizar registro'
      toast.error(message)
    }
  })
}

/**
 * Hook para eliminar un registro de progreso
 */
export const useEliminarProgreso = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: progresoAPI.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progreso'] })
      toast.success('Registro eliminado exitosamente')
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Error al eliminar registro'
      toast.error(message)
    }
  })
}

/**
 * Hook principal que combina todos los datos de progreso
 * Usa el ID del cliente autenticado
 */
export const useProgreso = () => {
  const { user } = useAuthStore()
  const clienteId = user?.cliente?.id

  const historial = useProgresoHistorial(clienteId)
  const estadisticas = useProgresoEstadisticas(clienteId)
  const crearMutation = useCrearProgreso()
  const actualizarMutation = useActualizarProgreso()
  const eliminarMutation = useEliminarProgreso()

  return {
    historial: historial.data || [],
    estadisticas: estadisticas.data || {},
    isLoading: historial.isLoading || estadisticas.isLoading,
    isError: historial.isError || estadisticas.isError,
    crear: crearMutation.mutate,
    actualizar: actualizarMutation.mutate,
    eliminar: eliminarMutation.mutate,
    isCreating: crearMutation.isPending,
    isUpdating: actualizarMutation.isPending,
    isDeleting: eliminarMutation.isPending
  }
}
