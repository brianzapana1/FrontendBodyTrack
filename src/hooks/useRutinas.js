import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as rutinasAPI from '../api/endpoints/rutinas'
import toast from 'react-hot-toast'

/**
 * Hook para obtener lista de rutinas con filtros
 * @param {Object} filtros - Filtros opcionales (entrenadorId)
 */
export const useRutinas = (filtros = {}) => {
  return useQuery({
    queryKey: ['rutinas', filtros],
    queryFn: async () => {
      const response = await rutinasAPI.obtenerRutinas(filtros)
      return response.data
    }
  })
}

/**
 * Hook para obtener la rutina activa del cliente
 */
export const useMiRutina = () => {
  return useQuery({
    queryKey: ['mi-rutina'],
    queryFn: async () => {
      const response = await rutinasAPI.obtenerMiRutina()
      return response.data
    },
    retry: false // No reintentar si el cliente no tiene rutina asignada
  })
}

/**
 * Hook para obtener detalle de una rutina
 * @param {string} id - ID de la rutina
 */
export const useRutina = (id) => {
  return useQuery({
    queryKey: ['rutina', id],
    queryFn: async () => {
      const response = await rutinasAPI.obtenerRutina(id)
      return response.data
    },
    enabled: !!id
  })
}

/**
 * Hook para crear una rutina
 */
export const useCrearRutina = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const response = await rutinasAPI.crearRutina(data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rutinas'])
      toast.success('Rutina creada exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al crear rutina'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para actualizar una rutina
 */
export const useActualizarRutina = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await rutinasAPI.actualizarRutina(id, data)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['rutinas'])
      queryClient.invalidateQueries(['rutina', variables.id])
      toast.success('Rutina actualizada exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al actualizar rutina'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para eliminar una rutina
 */
export const useEliminarRutina = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id) => {
      await rutinasAPI.eliminarRutina(id)
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rutinas'])
      toast.success('Rutina eliminada exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al eliminar rutina'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para agregar ejercicio a rutina
 */
export const useAgregarEjercicioARutina = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ rutinaId, ejercicioData }) => {
      const response = await rutinasAPI.agregarEjercicioARutina(rutinaId, ejercicioData)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['rutina', variables.rutinaId])
      queryClient.invalidateQueries(['rutinas'])
      toast.success('Ejercicio agregado a la rutina')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al agregar ejercicio'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para actualizar ejercicio en rutina
 */
export const useActualizarEjercicioEnRutina = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ejercicioRutinaId, data }) => {
      const response = await rutinasAPI.actualizarEjercicioEnRutina(ejercicioRutinaId, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rutinas'])
      queryClient.invalidateQueries(['rutina'])
      toast.success('Ejercicio actualizado')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al actualizar ejercicio'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para eliminar ejercicio de rutina
 */
export const useEliminarEjercicioDeRutina = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ejercicioRutinaId) => {
      await rutinasAPI.eliminarEjercicioDeRutina(ejercicioRutinaId)
      return ejercicioRutinaId
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rutinas'])
      queryClient.invalidateQueries(['rutina'])
      toast.success('Ejercicio eliminado de la rutina')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al eliminar ejercicio'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para asignar rutina a cliente
 */
export const useAsignarRutinaACliente = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ rutinaId, clienteId, entrenadorId }) => {
      const response = await rutinasAPI.asignarRutinaACliente(rutinaId, { clienteId, entrenadorId })
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['rutina', variables.rutinaId])
      queryClient.invalidateQueries(['rutinas'])
      queryClient.invalidateQueries(['mi-rutina'])
      toast.success('Rutina asignada al cliente exitosamente')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al asignar rutina'
      toast.error(mensaje)
    }
  })
}

/**
 * Hook para desactivar asignación de rutina
 */
export const useDesactivarAsignacion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (asignacionId) => {
      await rutinasAPI.desactivarAsignacion(asignacionId)
      return asignacionId
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['rutinas'])
      queryClient.invalidateQueries(['rutina'])
      queryClient.invalidateQueries(['mi-rutina'])
      toast.success('Asignación desactivada')
    },
    onError: (error) => {
      const mensaje = error.response?.data?.error || 'Error al desactivar asignación'
      toast.error(mensaje)
    }
  })
}
