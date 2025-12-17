import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { suscripcionesAPI } from '../api/endpoints/suscripciones'
import toast from 'react-hot-toast'

/**
 * Hook para obtener todos los planes disponibles (público)
 */
export const usePlanes = () => {
  return useQuery({
    queryKey: ['planes'],
    queryFn: () => suscripcionesAPI.obtenerPlanes(),
    staleTime: 1000 * 60 * 60 // Los planes no cambian frecuentemente (1 hora)
  })
}

/**
 * Hook para obtener la suscripción actual del cliente autenticado
 */
export const useMiSuscripcion = () => {
  return useQuery({
    queryKey: ['mi-suscripcion'],
    queryFn: () => suscripcionesAPI.obtenerMiSuscripcion(),
    retry: false
  })
}

/**
 * Hook para contratar un plan premium
 */
export const useContratarPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (planData) => suscripcionesAPI.contratarPlan(planData),
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['mi-suscripcion'] })
      queryClient.invalidateQueries({ queryKey: ['perfil'] })
      queryClient.invalidateQueries({ queryKey: ['rutinas'] })
      
      toast.success(data.mensaje || '¡Suscripción activada exitosamente!')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al contratar el plan'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para cancelar la suscripción activa
 */
export const useCancelarSuscripcion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => suscripcionesAPI.cancelarSuscripcion(),
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['mi-suscripcion'] })
      queryClient.invalidateQueries({ queryKey: ['perfil'] })
      queryClient.invalidateQueries({ queryKey: ['rutinas'] })
      
      toast.success(data.mensaje || 'Suscripción cancelada')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al cancelar la suscripción'
      toast.error(mensaje)
    }
  })
}
