import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as ejerciciosAPI from '../api/endpoints/ejercicios'
import toast from 'react-hot-toast'

/**
 * Hook para obtener lista de ejercicios con filtros
 * @param {Object} filtros - Filtros opcionales (grupoMuscular, equipamiento, busqueda)
 */
export const useEjercicios = (filtros = {}) => {
  return useQuery({
    queryKey: ['ejercicios', filtros],
    queryFn: async () => {
      const response = await ejerciciosAPI.obtenerEjercicios(filtros)
      return response.data
    }
  })
}

/**
 * Hook para obtener grupos musculares disponibles
 */
export const useGruposMusculares = () => {
  return useQuery({
    queryKey: ['gruposMusculares'],
    queryFn: async () => {
      const response = await ejerciciosAPI.obtenerGruposMusculares()
      return response.data
    },
    staleTime: 1000 * 60 * 30 // 30 minutos - los grupos musculares no cambian frecuentemente
  })
}

/**
 * Hook para obtener detalle de un ejercicio
 * @param {string} id - ID del ejercicio
 */
export const useEjercicio = (id) => {
  return useQuery({
    queryKey: ['ejercicio', id],
    queryFn: async () => {
      const response = await ejerciciosAPI.obtenerEjercicio(id)
      return response.data
    },
    enabled: !!id // Solo ejecutar si hay un ID
  })
}

/**
 * Hook para crear un ejercicio
 */
export const useCrearEjercicio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const response = await ejerciciosAPI.crearEjercicio(data)
      return response.data
    },
    onSuccess: () => {
      // Invalidar todas las queries de ejercicios para refrescar la lista
      queryClient.invalidateQueries(['ejercicios'])
      queryClient.invalidateQueries(['gruposMusculares'])
      toast.success('Ejercicio creado exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al crear ejercicio'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para actualizar un ejercicio
 */
export const useActualizarEjercicio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await ejerciciosAPI.actualizarEjercicio(id, data)
      return response.data
    },
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries(['ejercicios'])
      queryClient.invalidateQueries(['ejercicio', variables.id])
      queryClient.invalidateQueries(['gruposMusculares'])
      toast.success('Ejercicio actualizado exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al actualizar ejercicio'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para eliminar un ejercicio
 */
export const useEliminarEjercicio = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      await ejerciciosAPI.eliminarEjercicio(id)
      return id
    },
    onSuccess: () => {
      // Invalidar queries
      queryClient.invalidateQueries(['ejercicios'])
      queryClient.invalidateQueries(['gruposMusculares'])
      toast.success('Ejercicio eliminado exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al eliminar ejercicio'
      toast.error(mensaje)
    }
  })
}
